import { apiClient } from "@/api/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Define the Zod schema
const employeeDetailSchemaStep1 = z.object({
    supervisorName: z.string().min(1, "Supervisor name is required"),
    employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"], { required_error: "Employee type is required" }),
    employmentStatus: z.enum(["ACTIVE", "INACTIVE", "TERMINATED", "RETIRED"], { required_error: "Employee status is required" }),
    startDate: z.coerce.date({ required_error: "Start date is required", message: "Invalid Date provided" }),
    endDate: z.coerce.date().optional().nullable().refine(date => !date || date instanceof Date, {
        message: "Invalid Date provided"
    }),
    dateOfHire: z.coerce.date({ required_error: "Date of hire is required", message: "Invalid Date provided" }),
});

const employeeDetailSchemaStep2 = z.object({
    position: z.string().min(1, "Position is required"),
    department: z.string().min(1, "Department is required"),
    baseSalary: z.coerce.number().positive("Base Salary must be positive"),
    salaryFrequency: z.coerce.number().positive("Salary Frequency must be positive"),
});

const employeeDetailSchema = employeeDetailSchemaStep1.merge(employeeDetailSchemaStep2);

type EmployeeDetailFormData = z.infer<typeof employeeDetailSchema>;

const UpdateEmployeeDetailForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const { handleSubmit, register, formState: { errors }, setValue, watch } = useForm<EmployeeDetailFormData>({
        resolver: zodResolver(employeeDetailSchema),
    });

    useEffect(() => {
        if (id) {
            apiClient.get(`/api/employee/detail/${id}`)
                .then(response => {
                    const detailData = response.data.info;
                    setValue("supervisorName", detailData.supervisorName);
                    setValue("employmentType", detailData.employmentType);
                    setValue("employmentStatus", detailData.employmentStatus);
                    setValue("startDate", new Date(detailData.startDate));
                    setValue("endDate", detailData.endDate ? new Date(detailData.endDate) : null);
                    setValue("dateOfHire", new Date(detailData.dateOfHire));
                    setValue("position", detailData.position);
                    setValue("department", detailData.department);
                    setValue("baseSalary", detailData.baseSalary);
                    setValue("salaryFrequency", detailData.salaryFrequency);
                })
                .catch(err => {
                    console.error(err);
                    toast({
                        variant: "destructive",
                        title: "Error fetching employee details",
                        description: "There was an error fetching the employee details. Please try again later."
                    });
                });
        }
    }, [id, setValue]);

    const employmentType = watch("employmentType");
    const employmentStatus = watch("employmentStatus");

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const onSubmit = async (data: EmployeeDetailFormData) => {
        setIsSubmitting(true);
        try {
            const response = await apiClient.put(`/api/employee/detail/${id}`, data);
            toast({
                description: "Employee updated successfully!",
            });
            navigate(`/employee/${response.data.employee.id}`);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: "destructive",
                    title: "Something went wrong!",
                    description: error.response?.data.message || "Unable to update employee",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEmploymentTypeChange = (value: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERN") => {
        setValue("employmentType", value);
    };

    const handleEmploymentStatusChange = (value: "ACTIVE" | "INACTIVE" | "TERMINATED" | "RETIRED") => {
        setValue("employmentStatus", value);
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6 py-12">
            <div className="space-y-4 text-center">
                <h1 className="text-3xl font-bold">Update Employee Information</h1>
                <p className="text-muted-foreground">Fill out the form to update employee information.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-12">
                {step === 1 && (
                    <div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <Label htmlFor="supervisorName">Supervisor Name</Label>
                                <Input
                                    id="supervisorName"
                                    {...register("supervisorName")}
                                    placeholder="Supervisor Name"
                                />
                                {errors.supervisorName && <p className="text-red-500">{errors.supervisorName.message}</p>}
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="employmentType">Employment Type</Label>
                                <Select
                                    onValueChange={(value) => handleEmploymentTypeChange(value as "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERN")}
                                    value={employmentType}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Employment Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="FULL_TIME">Full Time</SelectItem>
                                        <SelectItem value="PART_TIME">Part Time</SelectItem>
                                        <SelectItem value="CONTRACT">Contract</SelectItem>
                                        <SelectItem value="INTERN">Intern</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.employmentType && <p className="text-red-500">{errors.employmentType.message}</p>}
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="employmentStatus">Employment Status</Label>
                                <Select
                                    onValueChange={(value) => handleEmploymentStatusChange(value as "ACTIVE" | "INACTIVE" | "TERMINATED" | "RETIRED")}
                                    value={employmentStatus}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Employment Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                                        <SelectItem value="TERMINATED">Terminated</SelectItem>
                                        <SelectItem value="RETIRED">Retired</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.employmentStatus && <p className="text-red-500">{errors.employmentStatus.message}</p>}
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input
                                    id="startDate"
                                    {...register("startDate")}
                                    type="date"
                                    placeholder="Start Date"
                                />
                                {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="endDate">End Date</Label>
                                <Input
                                    id="endDate"
                                    {...register("endDate")}
                                    type="date"
                                    placeholder="End Date"
                                />
                                {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="dateOfHire">Date of Hire</Label>
                                <Input
                                    id="dateOfHire"
                                    {...register("dateOfHire")}
                                    type="date"
                                    placeholder="Date of Hire"
                                />
                                {errors.dateOfHire && <p className="text-red-500">{errors.dateOfHire.message}</p>}
                            </div>
                        </div>
                        <div className="flex justify-end my-4">
                            <Button onClick={handleNext} type="button" variant="outline">
                                Next
                            </Button>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <Label htmlFor="position">Position</Label>
                                <Input
                                    id="position"
                                    {...register("position")}
                                    placeholder="Position"
                                />
                                {errors.position && <p className="text-red-500">{errors.position.message}</p>}
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="department">Department</Label>
                                <Input
                                    id="department"
                                    {...register("department")}
                                    placeholder="Department"
                                />
                                {errors.department && <p className="text-red-500">{errors.department.message}</p>}
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="baseSalary">Base Salary</Label>
                                <Input
                                    id="baseSalary"
                                    {...register("baseSalary")}
                                    type="number"
                                    placeholder="Base Salary"
                                />
                                {errors.baseSalary && <p className="text-red-500">{errors.baseSalary.message}</p>}
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="salaryFrequency">Salary Frequency</Label>
                                <Input
                                    id="salaryFrequency"
                                    {...register("salaryFrequency")}
                                    type="number"
                                    placeholder="Salary Frequency"
                                />
                                {errors.salaryFrequency && <p className="text-red-500">{errors.salaryFrequency.message}</p>}
                            </div>
                        </div>
                        <div className="flex my-4 justify-between">
                            <Button onClick={handlePrev} type="button" variant="outline">
                                Previous
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Update Employee Information"}
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default UpdateEmployeeDetailForm;
