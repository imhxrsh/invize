export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';
export const ACCESS_COOKIE_NAME = 'invize_access_token';
export const ACCESS_TOKEN_MAX_AGE_SEC = 30 * 60; // 30 minutes default
export const REFRESH_TOKEN_HEADER = 'X-Refresh-Token';
export const REFRESH_TOKEN_STORAGE_KEY = 'invize_refresh_token';