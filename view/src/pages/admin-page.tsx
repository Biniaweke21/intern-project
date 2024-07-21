import { apiClient } from "@/api/config";
import { AlertDialogForm } from "@/components/shared/alert-dialog-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { UserType } from "@/types/employee";
import { AxiosError } from "axios";
import { FilePenIcon, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [users, setUsers] = useState<UserType[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Function to load employee data
    const loadEmployeeData = async () => {
        try {
            const response = await apiClient.get('/api/users');
            setUsers(response.data.users);
        } catch (error) {
            setError('Failed to load employee data');
        }
    };

    // Ensure authentication and role-based access before loading employee data
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/auth');
            return;
        }
        const decodedToken: { role: string } = jwtDecode(token);
        if (decodedToken.role !== 'ADMIN') {
            navigate('/unauthorized');
            return;
        }
    }, [navigate]);

    // Initial load of employee data
    useEffect(() => {
        loadEmployeeData();
    }, []);

    // Memoized filtered employees based on search term
    const filteredUsers = useMemo(() => {
        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // Handle delete employee functionality
    const handleDeleteUser = async (id: string) => {
        try {
            await apiClient.delete(`/api/users/${id}`);
            toast({
                description: "User deleted successfully!",
            });
            // Reload employee data after deletion
            loadEmployeeData();
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: "destructive",
                    title: "Something went wrong!",
                    description: error.response?.data.message || "Unable to delete user",
                });
                setError(error.response ? error.response.data.message : 'An error occurred');
            }
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 md:p-10">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">HRM Dashboard</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search HRM..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                    <Link to="/admin/accounts/new">
                        <Button>Create HRM</Button>
                    </Link>
                </div>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role.toUpperCase()}</TableCell>
                            <TableCell>{new Date(user.createdAt).toDateString()}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Link to={`/admin/accounts/edit/${user.id}`}>
                                        <Button variant="outline" size="icon">
                                            <FilePenIcon className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                    </Link>
                                    <AlertDialogForm
                                        id="user-id"
                                        onDelete={() => handleDeleteUser(user.id)}
                                        title="Delete user"
                                        description="Are you sure you want to delete this user?"
                                        actionLabel="Delete"
                                        cancelLabel="Cancel"
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminDashboard;
