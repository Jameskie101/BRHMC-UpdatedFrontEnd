const THEME_KEY = "app_theme";

const applyTheme = (dark: boolean) => {
  const html = document.documentElement;
  if (dark) {
    html.classList.add("dark-mode");
    html.classList.remove("light-mode");
  } else {
    html.classList.add("light-mode");
    html.classList.remove("dark-mode");
  }
  try {
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  } catch (e) {
    // ignore storage errors (e.g., privacy modes)
  }
  window.dispatchEvent(
    new CustomEvent("theme:change", { detail: { isDark: dark } })
  );
};

export const isDarkMode = (): boolean => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;
  } catch (e) {
    /* ignore */
  }
  return document.documentElement.classList.contains("dark-mode");
};

export const setDarkMode = (dark: boolean) => {
  applyTheme(dark);
};

export const toggleTheme = () => {
  setDarkMode(!isDarkMode());
};

export const onThemeChange = (
  cb: (isDark: boolean) => void
): (() => void) => {
  const handler = (e: Event) => {
    const isDark = (e as CustomEvent).detail?.isDark ?? isDarkMode();
    cb(isDark);
  };
  window.addEventListener("theme:change", handler);
  return () => window.removeEventListener("theme:change", handler);
};

// Ensure DOM reflects stored preference on module load
try {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark") applyTheme(true);
  else if (stored === "light") applyTheme(false);
} catch (e) {
  /* ignore */
}

export default {
  isDarkMode,
  setDarkMode,
  toggleTheme,
  onThemeChange,
};
