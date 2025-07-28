
'use server';

import { Department, AdminUser } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://saj-technologies.onrender.com/api/saj/api.php';

async function apiFetch(action: string, data: any) {
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


// Department / Admin related functions
export async function loginAdmin(credentials: Omit<AdminUser, 'id'>) {
    return apiFetch('login_department', credentials);
}

export async function addDepartment(departmentData: Omit<Department, 'id'>) {
    return apiFetch('add_department', departmentData);
}

export async function getDepartments() {
    const result = await apiFetch('get_departments', {});
    return result.success ? result.departments : [];
}

// Agent related functions
export async function addAgent(agentData: Omit<AdminUser, 'id'>) {
    return apiFetch('add_agent', agentData);
}

export async function getAgents() {
    const result = await apiFetch('get_agents', {});
    return result.success ? result.agents : [];
}

export async function loginAgentApi(credentials: Omit<AdminUser, 'id'>) {
    return apiFetch('login_agent', credentials);
}


// Stock Report functions
export async function addStockReport(reportData: any) {
    return apiFetch('add_stock_report', reportData);
}

export async function getStockReports() {
    const result = await apiFetch('get_stock_reports', {});
    return result.success ? result.reports : [];
}
