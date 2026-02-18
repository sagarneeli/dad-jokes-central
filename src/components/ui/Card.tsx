import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`bg-white/80 dark:bg-dark-surface/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};
