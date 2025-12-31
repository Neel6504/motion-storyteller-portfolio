// Small wrapper around localStorage with safe JSON handling
export function setStorage<T>(key: string, value: T) {
  try {
    const v = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, v);
  } catch (e) {
    // ignore (e.g., localStorage not available)
  }
}

export function getStorage<T>(key: string, defaultValue?: T): T | undefined {
  try {
    const v = localStorage.getItem(key);
    if (v == null) return defaultValue;
    try {
      return JSON.parse(v) as T;
    } catch {
      return (v as unknown) as T;
    }
  } catch (e) {
    return defaultValue;
  }
}

export function removeStorage(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    // ignore
  }
}
