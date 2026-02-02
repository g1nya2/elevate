const Navigation = () => {
    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 23 23" fill="none">
                        <path d="M0 0H10.5V10.5H0V0Z" fill="#F25022"/>
                        <path d="M12.5 0H23V10.5H12.5V0Z" fill="#7FBA00"/>
                        <path d="M0 12.5H10.5V23H0V12.5Z" fill="#00A4EF"/>
                        <path d="M12.5 12.5H23V23H12.5V12.5Z" fill="#FFB900"/>
                    </svg>
                    <span className="text-xl font-bold tracking-tight text-slate-800">
                        Microsoft <span className="font-normal text-slate-500">Elevate</span>
                    </span>
                </div>

                <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-500">
                    <a href="#map-section" className="hover:text-ms-blue transition-colors">Account</a>
                    <a href="#m365-section" className="hover:text-ms-blue transition-colors">Product</a>
                    <a href="#studio-section" className="hover:text-ms-blue transition-colors">AI Skilling</a>
                </div>

                <a
                    href="https://forms.office.com/r/YvQz3WbhZt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 rounded-full
                               bg-slate-900 text-white text-sm font-semibold
                               hover:bg-slate-700 transition-all shadow-lg shadow-slate-900/20"
                >
                    Contact Us
                </a>
            </div>
        </nav>
    );
};

export default Navigation;
