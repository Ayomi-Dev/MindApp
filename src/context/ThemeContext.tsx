import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface ThemeContextType {
    darkMode: boolean;
    toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeContextProvider = ({ children }: {children : ReactNode}) => {
    const [darkMode, setDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem('darkMode')
        return storedTheme ? JSON.parse(storedTheme) : false
    })

    const toggleDarkMode = () => {
        setDarkMode((prevTheme: boolean) => !prevTheme)
    }
    useEffect(() => {
        document.body.style.background = darkMode ? '#0c0c30' : "#f6f7fb"
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }, [darkMode])

    return(
        <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if(!context){
        throw new Error ('useThemeContext must be within a provider')
    }
    return context
}