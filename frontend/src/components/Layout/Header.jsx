export default function Header({ toggleSidebar }) {
    return (
        <header className="flex items-center justify-between px-3 py-3">
            <button
                onClick={toggleSidebar}
                className="text-gray-700 hover:text-black focus:outline-none p-2"
            >
                {/* Hamburger icon */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <h2 className="text-xl font-semibold"> </h2>
        </header>
    )
}