
import type { StockReport, AdminUser, Department, ProductStock } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

// The base URL for the PHP backend
const API_URL = 'https://sajfoods.net/dailyreport/api.php';

// --- Stock Report Functions ---
export const getReports = async (): Promise<StockReport[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get_reports' }),
      cache: 'no-store', // Ensure fresh data is fetched every time
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const reports = await response.json();
    // Dates will be strings from JSON, so we need to convert them back to Date objects
    return reports.map((report: any) => ({
      ...report,
      supplyDate: new Date(report.supplyDate),
      dateOfVisit: new Date(report.dateOfVisit),
      expiryDate: new Date(report.expiryDate),
    }));
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    return []; // Return an empty array on error
  }
};

export const addReport = async (reportData: Omit<StockReport, 'id' | 'products'> & { products: Omit<ProductStock, 'id'|'remarks'|'action'>[] }): Promise<StockReport> => {
  try {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_report', data: reportData }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add report: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding report:', error);
    throw error;
  }
};


// --- Admin User Functions ---
// Admin user login now calls the backend for verification
export const loginAdmin = async (credentials: Pick<AdminUser, 'email' | 'password'>): Promise<AdminUser | null> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login_admin', data: credentials }),
        });
        if (!response.ok) return null;
        const result = await response.json();
        return result.success ? result.user : null;
    } catch (error) {
        console.error('Admin login failed:', error);
        return null;
    }
}


// --- Sales Agent Functions ---
export const getAgents = async (): Promise<AdminUser[]> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'get_agents' }),
            cache: 'no-store',
        });
        if (!response.ok) throw new Error('Failed to fetch agents');
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch agents:', error);
        return [];
    }
};

export const loginAgent = async (credentials: Pick<AdminUser, 'email' | 'password'>): Promise<AdminUser | null> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login_agent', data: credentials }),
        });
        if (!response.ok) return null;
        const result = await response.json();
        return result.success ? result.user : null;
    } catch (error) {
        console.error('Agent login failed:', error);
        return null;
    }
};

export const addAgent = async (agentData: Omit<AdminUser, 'id'>): Promise<AdminUser> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'add_agent', data: agentData }),
        });
        if (!response.ok) throw new Error('Failed to add agent');
        return await response.json();
    } catch (error) {
        console.error('Error adding agent:', error);
        throw error;
    }
};


// --- Department Functions ---
export const getDepartments = async (): Promise<Department[]> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'get_departments' }),
            cache: 'no-store',
        });
        if (!response.ok) throw new Error('Failed to fetch departments');
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch departments:', error);
        return [];
    }
};

export const addDepartment = async (departmentData: Omit<Department, 'id'>): Promise<Department> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'add_department', data: departmentData }),
        });
        if (!response.ok) throw new Error('Failed to add department');
        return await response.json();
    } catch (error) {
        console.error('Error adding department:', error);
        throw error;
    }
};
