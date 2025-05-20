import { createContext, useState } from "react";

export const ThemeContext = createContext({
    theme: 'default',
    toggleTheme: () => { },
    toggleRotation: () => { },
    toggleStars: () => { },
});

export default function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState('default');
    const [isRotating, setIsRotating] = useState(false);
    const [showStars, setShowStars] = useState(true);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            return prevTheme === 'default'
                ? 'retro-active'
                : prevTheme === 'retro-active'
                    ? 'basic'
                    : 'default';

        });
    };


    const toggleRotation = () => {
        setIsRotating(!isRotating);
    };

    const toggleStars = () => {
        setShowStars(!showStars);
    };

    if (isRotating) {
        document.body.classList.add('rotate-active');
    } else {
        document.body.classList.remove('rotate-active');
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, toggleRotation, toggleStars, showStars }}>
            {children}
        </ThemeContext.Provider>
    )
}