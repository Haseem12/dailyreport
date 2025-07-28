
'use server';

const API_URL = 'https://sajfoods.net/dailyreport/api.php';

async function apiFetch(action: string, data?: any) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, data }),
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error Response (${response.status}): ${errorText}`);
            // Attempt to parse error, but fallback to text if not JSON
            try {
                const errorJson = JSON.parse(errorText);
                return { success: false, error: errorJson.error || `Server error: ${response.status}` };
            } catch (e) {
                return { success: false, error: `Server error: ${response.status} - ${errorText}` };
            }
        }
        
        const result = await response.json();
        return result;

    } catch (error) {
        console.error(`Fetch API Error for action "${action}":`, error);
        if (error instanceof Error) {
            return { success: false, error: `Failed to connect to the server: ${error.message}` };
        }
        return { success: false, error: 'An unknown error occurred while connecting to the server.' };
    }
}

// --- AUTH/REGISTRATION FUNCTIONS ---

export async function loginAgent(credentials: any) {
    return apiFetch('login_agent', credentials);
}

export async function registerAgent(agentData: any) {
    return apiFetch('add_agent', agentData);
}

export async function loginDepartment(credentials: any) {
    return apiFetch('login_department', credentials);
}

export async function registerDepartment(departmentData: any) {
    return apiFetch('add_department', departmentData);
}

// --- DATA FETCHING FUNCTIONS ---

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

// --- REPORTING FUNCTIONS ---

export async function addStockReport(reportData: any) {
    return apiFetch('add_stock_report', reportData);
}
