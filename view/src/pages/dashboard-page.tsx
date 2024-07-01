import { apiClient } from "@/api/config";
import { AlertDialogForm } from "@/components/shared/alert-dialog-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { EmployeeType } from "@/types/employee";
import { AxiosError } from "axios";
import { Eye, FilePenIcon, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [employees, setEmployees] = useState<EmployeeType[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Function to load employee data
    const loadEmployeeData = async () => {
        try {
            const response = await apiClient.get('/api/employee');
            setEmployees(response.data.employees);
        } catch (error) {
            setError('Failed to load employee data');
        }
    };

    // Ensure authentication before loading employee data
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) navigate('/auth');
    }, [navigate]);

    // Initial load of employee data
    useEffect(() => {
        loadEmployeeData();
    }, []);

    // Memoized filtered employees based on search term
    const filteredEmployees = useMemo(() => {
        return employees.filter(
            (employee) =>
                employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [employees, searchTerm]);


    // Handle delete employee functionality
    const handleDeleteEmployee = async (id: string) => {
        try {
            await apiClient.delete(`/api/employee/${id}`);
            toast({
                description: "Employee Deleted successfully!",
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: "destructive",
                    title: "Something went wrong!",
                    description: error.response?.data.message || "Unable to delete employee",
                })
                setError(error.response ? error.response.data.message : 'An error occurred');
            }
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 md:p-10">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Employee Registration</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                    <Link to="/new" >
                        <Button>Add Employee</Button>
                    </Link>
                </div>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell className="font-medium">{employee.firstName}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.phone}</TableCell>
                            <TableCell>{employee.country}</TableCell>
                            <TableCell>{employee.city}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Link to={`/employee/edit/${employee.id}`}>
                                        <Button variant="outline" size="icon">
                                            <FilePenIcon className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                    </Link>
                                    <Link to={`/employee/info/${employee.id}`}>
                                        <Button variant="outline" size="icon">
                                            <Eye className="h-4 w-4" />
                                            <span className="sr-only">View</span>
                                        </Button>
                                    </Link>
                                    <AlertDialogForm
                                        id="employee-id"
                                        onDelete={() => handleDeleteEmployee(employee.id)}
                                        title="Delete Employee"
                                        description="Are you sure you want to delete this employee?"
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

export default Dashboard;
