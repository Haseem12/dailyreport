
'use server';

// This function is kept for potential use in GET requests, 
// but is not actively used by login/registration anymore.
async function apiFetch(action: string, data?: any) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sajfoods.net/dailyreport/api.php';
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, data }),
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }
        
        const result = await response.json();
        return result;

    } catch (error) {
        console.error(`API Fetch Error for action "${action}":`, error);
        return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
}


// --- Data Fetching Functions ---

export async function getDepartments() {
    const result = await apiFetch('get_departments');
    return result.success ? result.departments : [];
}

export async function getAgents() {
    const result = await apiFetch('get_agents');
    return result.success ? result.agents : [];
}

export async function getStockReports() {
    const result = await apiFetch('get_stock_reports');
    return result.success ? result.reports : [];
}
