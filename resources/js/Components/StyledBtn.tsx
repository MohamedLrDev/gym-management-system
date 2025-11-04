import React from "react";

interface Props {
    title?: string;
    icon?: React.ReactNode;
    color?: string;
    onClick?: () => void;
}

const StyledBtn: React.FC<Props> = ({ title, icon, color, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{ backgroundColor: color }}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-white 
                     hover:opacity-70 hover:scale-105 hover:shadow-lg
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:scale-105
                     active:scale-95 active:shadow-md
                     transform transition-all duration-200 ease-in-out
                     hover:-translate-y-0.5 active:translate-y-0
                     group relative overflow-hidden"
        >
            {/* Ripple effect overlay */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>

            <div
                className="flex items-center gap-2 relative z-10 
                          group-hover:animate-pulse"
            >
                {icon && (
                    <span
                        className="transform transition-transform duration-200 
                                   group-hover:rotate-12 group-active:rotate-0"
                    >
                        {icon}
                    </span>
                )}
                <span
                    className="transform transition-transform duration-200
                               group-hover:translate-x-0.5"
                >
                    {title}
                </span>
            </div>
        </button>
    );
};

export default StyledBtn;
