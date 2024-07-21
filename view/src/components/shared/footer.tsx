import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <nav className="flex items-center justify-between px-6 py-8 border-b border-zinc-200 dark:border-zinc-800">
            <Link to='/' className="flex items-center space-x-4">
                <h1 className="">&copy;  Employee Registration 2024</h1>
            </Link>
            <p>Developed By Bini A.</p>
        </nav>
    );
}