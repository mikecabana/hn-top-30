import { FunctionComponent } from 'react';

export const Footer: FunctionComponent = () => {
    return (
        <div className="mt-8 py-8">
            <div className="text-center mb-4 text-xs">{new Date().getFullYear()} &copy; Hacker News Top 30</div>
            <div className="text-center text-xs">
                Developed and designed by{' '}
                <a
                    className="font-semibold hover:underline hover:text-orange-600"
                    href="https://mikecabana.com"
                    target="_blank"
                >
                    {' '}
                    Mike Cabana
                </a>{' '}
                to have that Hacker News look and feel.
            </div>
        </div>
    );
};
