import { LogOut, Users } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/auth');
    }
    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center space-x-4">
                <Users className="w-8 h-8" />
                <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">HRM Dashboard</h1>
            </div>
            {localStorage.getItem('authToken') && <div className="flex items-center space-x-4">
                <Button onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" /> sign out</Button>
            </div>}
        </nav>
    );
}