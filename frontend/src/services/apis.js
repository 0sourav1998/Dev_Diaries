const BASE_URL = import.meta.env.VITE_BASE_URL;

export const userEndpoints = {
    SIGN_UP : `${BASE_URL}/api/v1/user/register`,
    LOGIN : `${BASE_URL}/api/v1/user/login`
}