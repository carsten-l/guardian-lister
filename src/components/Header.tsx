import { Link } from "@tanstack/react-router";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
    return (
        <header className="mb-8">
            <div className="container mx-auto flex justify-between items-center py-6 px-8">
                <div className="text-left">
                    <p className="text-xl font-black">GAL</p>
                    <p className="text-xs">Guardian Article Lister</p>
                </div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/about" className="ml-4">
                        About
                    </Link>
                    <Link to="/contact" className="ml-4">
                        Contact
                    </Link>
                </nav>
                <ThemeSwitcher />
            </div>
        </header>
    );
}
