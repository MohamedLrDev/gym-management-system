import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { BarChart3, Users, CreditCard, Info, LogOut, LogIn, Bell, Settings, Dumbbell, Sun, Moon } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { url, props } = usePage();
    const user = props.auth?.user;
    const [darkMode, setDarkMode] = useState(false);

    // Initialize dark mode from localStorage or system preference
    useEffect(() => {
        const stored = localStorage.getItem('darkMode');
        if (stored) {
            setDarkMode(JSON.parse(stored));
        } else {
            setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    // Apply dark mode to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const navItems = [
        { href: "/dashboard", label: "Statistics", icon: BarChart3 },
        { href: "/members", label: "Members", icon: Users },
        { href: "/payments", label: "Payments", icon: CreditCard },
        { href: "/about", label: "About", icon: Info },
    ];

    const isActiveRoute = (href: string) => {
        if (href === "/dashboard") return url === href;
        return url.startsWith(href);
    };

    const getPageTitle = () => {
        const activeItem = navItems.find(item => isActiveRoute(item.href));
        return activeItem?.label || "Dashboard";
    };

    return (
        <div className="flex h-screen bg-white dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-60 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center mr-3">
                            <Dumbbell className="w-4 h-4 text-white dark:text-gray-900" />
                        </div>
                        <div>
                            <h1 className="font-semibold text-gray-900 dark:text-white">
                                Gym Manager
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isActiveRoute(item.href);
                        
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                                    ${
                                        isActive
                                            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                                    }
                                `}
                            >
                                <Icon className="w-4 h-4 mr-3" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    {user ? (
                        <div className="space-y-3">
                            {/* User Info */}
                            <div className="flex items-center px-3 py-2">
                                <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-gray-900 font-medium text-sm mr-3">
                                    {user.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {user.name || "User"}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Logout Button */}
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4 mr-3" />
                                Logout
                            </Link>
                        </div>
                    ) : (
                        <Link
                            href={route("login")}
                            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
                        >
                            <LogIn className="w-4 h-4 mr-3" />
                            Login
                        </Link>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {getPageTitle()}
                        </h2>
                        
                        <div className="flex items-center space-x-2">
                            <button 
                                onClick={toggleDarkMode}
                                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {darkMode ? (
                                    <Sun className="w-4 h-4" />
                                ) : (
                                    <Moon className="w-4 h-4" />
                                )}
                            </button>
                            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                <Bell className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                <Settings className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}