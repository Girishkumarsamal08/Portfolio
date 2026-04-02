export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-8 text-center ">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm">
                    © 2026 Girish Kumar Samal. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs uppercase tracking-widest">
                    Built with Next.js & Tailwind CSS
                </p>
            </div>
        </footer>
    )
}