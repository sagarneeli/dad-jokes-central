import React from 'react';

import { Copy, Share2, ThumbsUp, ThumbsDown, Meh, Twitter, MessageCircle } from 'lucide-react';
import { Button } from './ui/Button';
import confetti from 'canvas-confetti';

interface ActionsProps {
    jokeText: string;
    onVote: (type: 'up' | 'down' | 'meh') => void;
}

export const Actions: React.FC<ActionsProps> = ({ jokeText, onVote }) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(jokeText);
            // Ideally show a toast here, but simple alert or button state change for now
            // triggering confetti for fun
            confetti({
                particleCount: 50,
                spread: 40,
                origin: { y: 0.8 },
                colors: ['#38bdf8', '#818cf8']
            });
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Dad Joke',
                    text: jokeText,
                    url: window.location.href, // or specific joke permalink if we had one
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            handleCopy(); // Fallback
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => onVote('up')} aria-label="Funny" className="text-green-500 hover:text-green-600 hover:bg-green-50">
                    <ThumbsUp size={18} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onVote('meh')} aria-label="Meh" className="text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50">
                    <Meh size={18} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onVote('down')} aria-label="Bad" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <ThumbsDown size={18} />
                </Button>
            </div>

            <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={handleCopy} className="gap-2">
                    <Copy size={16} />
                    <span className="hidden sm:inline">Copy</span>
                </Button>

                <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(jokeText)}`, '_blank')}
                        className="hover:text-blue-400"
                        aria-label="Share on Twitter"
                    >
                        <Twitter size={18} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(jokeText)}`, '_blank')}
                        className="hover:text-green-500"
                        aria-label="Share on WhatsApp"
                    >
                        <MessageCircle size={18} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleShare}
                        aria-label="More Share Options"
                    >
                        <Share2 size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
