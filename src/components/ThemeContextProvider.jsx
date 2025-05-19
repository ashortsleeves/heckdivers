import { createContext, useState } from "react";

export const ThemeContext = createContext({
    theme: 'default',
    toggleTheme: () => {}
});

export default function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState('default');

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            return prevTheme === 'default' ? 'retro-active': 'default';
        });
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            { children }
        </ThemeContext.Provider>
    )
}