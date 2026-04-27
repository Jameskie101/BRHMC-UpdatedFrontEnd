import { createSlice } from "@reduxjs/toolkit";


const defaultThemeSettings = {
  "data-bs-theme": "light",
  "data-sidebar": "light",
  "data-color": "primary",
  "data-topbar": "white",
  "data-layout": "default",
  "data-size": "default",
  "data-width": "fluid",
  "data-sidebarbg": "none",
  "dir": "ltr",
};


// Safe localStorage access with error handling
const getInitialThemeSettings = () => {
  try {
    const stored = localStorage.getItem("themeSettings");
    return stored ? JSON.parse(stored) : defaultThemeSettings;
  } catch (error) {
    console.warn("Failed to parse theme settings from localStorage:", error);
    return defaultThemeSettings;
  }
};

const initialState = {
  themeSettings: getInitialThemeSettings(),
};


const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, { payload }) => {
      // Handle theme class on HTML element
      if (payload === 'dark') {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
        state.themeSettings = { ...state.themeSettings, 'data-bs-theme': 'dark' };
      } else if (payload === 'light') {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
        state.themeSettings = { ...state.themeSettings, 'data-bs-theme': 'light' };
      } else if (typeof payload === 'object') {
        // Handle other theme settings if needed
        if (payload.dir === "rtl") {
          state.themeSettings = { ...defaultThemeSettings, dir: "rtl" };
        } else if (state.themeSettings.dir === "rtl" && payload.dir !== "rtl") {
          state.themeSettings = { ...defaultThemeSettings, ...payload, dir: "ltr" };
        } else {
          state.themeSettings = { ...state.themeSettings, ...payload };
        }
      }

      try {
        localStorage.setItem(
          "themeSettings",
          JSON.stringify(state.themeSettings)
        );
      } catch (error) {
        console.warn("Failed to save theme settings to localStorage:", error);
      }
    },
    resetTheme: (state) => {
      state.themeSettings = defaultThemeSettings;
      try {
        localStorage.removeItem("themeSettings");
      } catch (error) {
        console.warn("Failed to remove theme settings from localStorage:", error);
      }
    },
  },
});


export const { updateTheme, resetTheme } = themeSlice.actions;


export default themeSlice.reducer;





