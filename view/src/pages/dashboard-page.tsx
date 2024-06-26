import React, { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilePenIcon, SearchIcon } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { apiClient } from "@/api/config";
import { useNavigate } from "react-router-dom";
import { AlertDialogForm } from "@/components/shared/alert-dialog-form";
import { EmployeeType } from "@/types/employee";
import { AxiosError } from "axios";

const Dashboard: React.FC = () => {
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

    const handleDeleteEmployee = async (id: string) => {
        try {
            await apiClient.delete(`/api/employee/${id}`);
        } catch (error) {
            if (error instanceof AxiosError) {
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
                    <Button>Add Employee</Button>
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
                                    <Button variant="outline" size="icon">
                                        <FilePenIcon className="h-4 w-4" />
                                        <span className="sr-only">Edit</span>
                                    </Button>
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
