import React, { useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';

interface ControlsProps {
    onNewJoke: () => void;
    onSearch: (term: string) => void;
    onCategorySelect: (category: string) => void;
    isLoading: boolean;
}

const CATEGORIES = ['Pun', 'Computers', 'Dog', 'Cat', 'Food', 'Work', 'Dad'];

export const Controls: React.FC<ControlsProps> = ({
    onNewJoke,
    onSearch,
    onCategorySelect,
    isLoading
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
            setActiveCategory(null);
        }
    };

    const handleCategoryClick = (cat: string) => {
        if (activeCategory === cat) {
            setActiveCategory(null);
            onNewJoke(); // Reset to random
        } else {
            setActiveCategory(cat);
            onCategorySelect(cat);
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSearchSubmit} className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for dad jokes..."
                    className="w-full px-5 py-4 pl-12 rounded-2xl bg-white dark:bg-dark-surface border-2 border-transparent focus:border-primary-400 dark:focus:border-primary-600 focus:outline-none shadow-sm text-lg transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    disabled={!searchTerm.trim()}
                >
                    Go
                </Button>
            </form>

            <div className="flex flex-wrap gap-2 justify-center">
                {CATEGORIES.map((cat) => (
                    <motion.button
                        key={cat}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCategoryClick(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeCategory === cat
                            ? 'bg-primary-100 border-primary-500 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                            : 'bg-white dark:bg-dark-surface border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-300'
                            }`}
                    >
                        {cat}
                    </motion.button>
                ))}
            </div>

            <div className="flex justify-center pt-4">
                <Button
                    onClick={() => {
                        setActiveCategory(null);
                        setSearchTerm('');
                        onNewJoke();
                    }}
                    size="lg"
                    isLoading={isLoading}
                    className="w-full sm:w-auto min-w-[200px] shadow-xl shadow-primary-500/20"
                >
                    <RefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} size={20} />
                    {isLoading ? 'Fetching Chuckles...' : 'Tell me another!'}
                </Button>
            </div>
        </div>
    );
};
