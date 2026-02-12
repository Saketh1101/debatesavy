import React from 'react';

interface IconProps {
    size?: number;
    className?: string;
    strokeWidth?: number;
}

// Users icon - for Friendly Debate
export const UsersIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

// Star icon - for Famous Personalities
export const StarIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <polygon points="12 2 15.09 10.26 24 10.36 17.18 16.54 19.34 24.63 12 18.46 4.66 24.63 6.82 16.54 0 10.36 8.91 10.26 12 2" />
    </svg>
);

// Globe icon - for Online Debates
export const GlobeIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

// Robot icon - for AI Assistant
export const RobotIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 11h.01" />
        <path d="M15 11h.01" />
        <path d="M9 15a3 3 0 0 0 6 0" />
        <path d="M6 4v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4" />
    </svg>
);

// BarChart icon - for Analytics
export const BarChartIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
);

// MessageCircle icon - for Text-Based
export const MessageCircleIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

// Lightbulb icon - for Tips
export const LightbulbIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <circle cx="12" cy="12" r="9" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

// Zap icon - for search/searching
export const ZapIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

// Gamepad icon - for Play/Gaming
export const GamepadIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <line x1="6" y1="12" x2="12" y2="12" />
        <line x1="9" y1="9" x2="9" y2="15" />
        <circle cx="17" cy="12" r="1" />
        <circle cx="20" cy="9" r="1" />
        <path d="M22 12a10 10 0 0 1-19.228 8.3A10 10 0 0 1 3.228 3.7 10 10 0 0 1 22 12z" />
    </svg>
);

// Laptop icon - for Technology
export const LaptopIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <path d="M20 3H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        <polyline points="22 17 2 17" />
    </svg>
);

// Building icon - for Politics
export const BuildingIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

// Beaker icon - for Science
export const BeakerIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <path d="M4.54 11.07A9 9 0 0 0 9 22h6a9 9 0 0 0 4.46-10.93" />
        <path d="M15 9h.01" />
        <path d="M9 9h.01" />
        <polyline points="9 2 15 2 15 7 9 7" />
    </svg>
);

// Trophy icon - for Sports/Achievements
export const TrophyIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <path d="M6 9H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2h-2" />
        <path d="M6 9c0-1 .895-2 2-2h8c1.105 0 2 1 2 2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0" />
    </svg>
);

// Film icon - for Entertainment
export const FilmIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
        <path d="M16 5l2 2M8 5l-2 2M2 11h20" />
    </svg>
);

// Brain icon - for Philosophy
export const BrainIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <path d="M9.5 3C8.1 3 7 4.1 7 5.5c0 1.1.6 2.1 1.4 2.6C7.4 9.2 6 11.5 6 14c0 3.3 2.7 6 6 6s6-2.7 6-6c0-2.5-1.4-4.8-3.4-5.9.8-.5 1.4-1.6 1.4-2.6C17 4.1 15.9 3 14.5 3S12 4.1 12 5.5 10.9 8 9.5 8 8 6.9 8 5.5 8.1 3 9.5 3" />
    </svg>
);

// DollarSign icon - for Economics
export const DollarSignIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

// Leaf icon - for Environment
export const LeafIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <path d="M11 22C6.5 18.6 3 14.1 3 10c0-4.4 3.1-8 7-8 2 0 3.9.9 5 2.3 1.1-1.4 3-2.3 5-2.3 3.9 0 7 3.6 7 8 0 4.1-3.5 8.6-8 12" />
    </svg>
);

// Sparkles icon - for Excellence/Premium
export const SparklesIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <path d="M12 3l3.5 7.05h7.8L16.6 15.8l3.5 7.05L12 19.85l-7.1 2.95 3.5-7.05-7.8-5.75h7.8L12 3z" />
    </svg>
);

// BookOpen icon - for Learning/Tips
export const BookOpenIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

// Search icon
export const SearchIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
    </svg>
);

// Eye icon - for Insights/View
export const EyeIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

// X icon - for Close
export const XIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// Minus icon - for Decrement
export const MinusIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

// Plus icon - for Increment
export const PlusIcon: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

// Clock icon
export const Clock: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

// MessageSquare icon
export const MessageSquare: React.FC<IconProps> = ({
    size = 24,
    className = '',
    strokeWidth = 1.5
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${className}`}
    >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);
