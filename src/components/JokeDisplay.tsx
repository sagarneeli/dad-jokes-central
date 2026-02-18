import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Card } from './ui/Card';

interface JokeDisplayProps {
    joke: string | null;
    isLoading: boolean;
    error?: string | null;
}

export const JokeDisplay: React.FC<JokeDisplayProps> = ({ joke, isLoading, error }) => {
    return (
        <Card className="min-h-[200px] flex items-center justify-center text-center relative overflow-hidden">
            <AnimatePresence>
                {isLoading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full space-y-4 absolute inset-0 flex flex-col justify-center px-6"
                    >
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto animate-pulse" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto animate-pulse" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto animate-pulse" />
                    </motion.div>
                ) : error ? (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500"
                    >
                        <div className="text-4xl mb-2">🤦‍♂️</div>
                        <p>{error}</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key={joke}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="prose dark:prose-invert"
                    >
                        <p className="text-2xl md:text-3xl font-medium leading-relaxed font-display text-gray-800 dark:text-gray-100">
                            {joke}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
};
