/**
 * Application-wide constants.
 *
 * @ ROUTES — route path definitions used by the router
 * @ STORAGE_KEYS — localStorage key names to avoid hardcoding strings
 */

/** Route paths for the application. */
export const ROUTES = {
    HOME: '/',
    UNKNOWN: '*',
} as const;

/** localStorage key names. */
export const STORAGE_KEYS = {
    TODO_STORAGE: 'boilerplate-todos',
} as const;
