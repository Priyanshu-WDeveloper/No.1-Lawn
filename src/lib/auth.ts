const STORAGE_KEY = 'auth_state';

export const getToken = (): string | null => {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ||
      sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw).token;
  } catch {
    /* ignore */
  }
  return null;
};

export const localLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('user');
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
};
