export const OWNER_EMAIL = 'nanikoutarapu@gmail.com';
export const OWNER_DISPLAY_NAME = 'Nani Koutarapu';
export const OWNER_STORE_ROLE = 'Store Proprietor & Master Handloom Curator';
export const DEFAULT_OWNER_PIN = 'NANI@2026';

const AUTH_STORAGE_KEY = 'markandeya_owner_auth';
const CUSTOM_SAREES_KEY = 'markandeya_custom_sarees';

export interface OwnerSession {
  email: string;
  displayName: string;
  role: string;
  loginTime: string;
}

/**
 * Returns true only if the email matches the authorized store owner email
 */
export function isAuthorizedOwnerEmail(email: string): boolean {
  return email.trim().toLowerCase() === OWNER_EMAIL.toLowerCase();
}

/**
 * Retrieves the current logged in owner session from localStorage
 */
export function getOwnerSession(): OwnerSession | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const session: OwnerSession = JSON.parse(raw);
    if (session && isAuthorizedOwnerEmail(session.email)) {
      return session;
    }
    return null;
  } catch (e) {
    console.error('Error retrieving owner session', e);
    return null;
  }
}

/**
 * Check if the store owner (nanikoutarapu@gmail.com) is currently logged in
 */
export function isOwnerLoggedIn(): boolean {
  return getOwnerSession() !== null;
}

/**
 * Authenticates the store owner.
 * Strictly verifies email is nanikoutarapu@gmail.com and password is NANI@2026.
 */
export function authenticateOwner(
  email: string,
  passkey: string
): { success: boolean; message: string; session?: OwnerSession } {
  const normalizedEmail = email.trim().toLowerCase();

  // Strict check: Only nanikoutarapu@gmail.com and password NANI@2026
  if (!isAuthorizedOwnerEmail(normalizedEmail) || passkey.trim() !== DEFAULT_OWNER_PIN) {
    return {
      success: false,
      message: 'Invalid domain login ID or password. Please verify your credentials.',
    };
  }

  const session: OwnerSession = {
    email: OWNER_EMAIL,
    displayName: OWNER_DISPLAY_NAME,
    role: OWNER_STORE_ROLE,
    loginTime: new Date().toISOString(),
  };

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  } catch (e) {
    console.warn('Unable to persist session to localStorage', e);
  }

  return {
    success: true,
    message: `Welcome back, ${OWNER_DISPLAY_NAME}! Store inventory management unlocked.`,
    session,
  };
}

/**
 * Logs out the owner session
 */
export function logoutOwner(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (e) {
    console.warn('Error clearing owner session', e);
  }
}

/**
 * Helper to get custom sarees stored in localStorage
 */
export function getStoredCustomSarees(): any[] {
  try {
    const raw = localStorage.getItem(CUSTOM_SAREES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error loading custom sarees from storage', e);
    return [];
  }
}

/**
 * Helper to persist custom sarees to localStorage
 */
export function saveCustomSarees(sarees: any[]): void {
  try {
    localStorage.setItem(CUSTOM_SAREES_KEY, JSON.stringify(sarees));
  } catch (e) {
    console.error('Error saving custom sarees to storage', e);
  }
}

const STORE_SETTINGS_KEY = 'markandeya_store_settings';
const EDITED_SAREES_KEY = 'markandeya_edited_sarees';

import { StoreSettings } from '../types/saree';
export type { StoreSettings };

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  announcementText: 'Direct from Looms · Authentic Gadwal & Kanchi Pattu · Free Fall & Pico · WhatsApp Video Shopping',
  phone: '+91 99483 16249',
  whatsapp: '+919948316249',
  address: 'Ganesh Nagar, 60 Feet Road, Near Sri Venkateshwara Swamy Temple',
  city: 'Suryapet, Telangana - 508213',
  heroHeadline: 'Direct from Looms: Pure Pattu & Handloom Sarees',
  heroSubtitle: 'Handwoven with devotion by generational master weavers in Gadwal, Mangalagiri, and Kanchipuram with Silk Mark purity assurance.',
  domain: 'srimarkandeyahandlooms.com',
  domainOwner: 'nanikoutarapu@gmail.com',
};

export function getStoredStoreSettings(): StoreSettings {
  try {
    const raw = localStorage.getItem(STORE_SETTINGS_KEY);
    if (!raw) return DEFAULT_STORE_SETTINGS;
    const parsed = JSON.parse(raw);
    // If parsed still has old default 94403 number, update it to the official +91 99483 16249
    if (parsed.whatsapp && (parsed.whatsapp.includes('94403') || parsed.phone?.includes('94403'))) {
      parsed.whatsapp = '+919948316249';
      parsed.phone = '+91 99483 16249';
      try {
        localStorage.setItem(STORE_SETTINGS_KEY, JSON.stringify(parsed));
      } catch (err) {
        // ignore
      }
    }
    return { ...DEFAULT_STORE_SETTINGS, ...parsed };
  } catch (e) {
    return DEFAULT_STORE_SETTINGS;
  }
}

export function saveStoreSettings(settings: StoreSettings): boolean {
  if (!isOwnerLoggedIn()) return false;
  try {
    localStorage.setItem(STORE_SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch (e) {
    console.error('Failed to save store settings', e);
    return false;
  }
}

export function getStoredEditedSarees(): Record<string, any> {
  try {
    const raw = localStorage.getItem(EDITED_SAREES_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

export function saveEditedSaree(saree: any): boolean {
  if (!isOwnerLoggedIn()) return false;
  try {
    const existing = getStoredEditedSarees();
    existing[saree.id] = saree;
    localStorage.setItem(EDITED_SAREES_KEY, JSON.stringify(existing));
    return true;
  } catch (e) {
    return false;
  }
}

