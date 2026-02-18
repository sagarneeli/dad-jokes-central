import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../hooks/useDarkMode';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-300/20 dark:bg-primary-900/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-300/20 dark:bg-accent-900/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
            </div>

            <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                >
                    <span className="text-2xl pt-1">😂</span>
                    <h1 className="text-2xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400">
                        Dad Jokes Central
                    </h1>
                </motion.div>
                <button
                    onClick={toggleDarkMode}
                    className="p-3 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/30 backdrop-blur-sm transition-all shadow-sm"
                    aria-label="Toggle dark mode"
                >
                    <AnimatePresence mode="wait">
                        {darkMode ? (
                            <motion.div
                                key="moon"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <Moon size={20} className="text-primary-200" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sun"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <Sun size={20} className="text-yellow-500" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </nav>

            <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
                {children}
            </main>

            <footer className="relative z-10 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                <p>Made with 🤪 by Dad Jokes Central &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};
