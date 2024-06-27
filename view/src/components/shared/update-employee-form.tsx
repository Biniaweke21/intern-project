import { apiClient } from "@/api/config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "../ui/use-toast"
import { AxiosError } from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { EmployeeType } from "@/types/employee"

// Define the Zod schema
const employeeSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address"),
})

type EmployeeFormData = z.infer<typeof employeeSchema>

export default function UpdateEmployeeForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [userInfo, setUserInfo] = useState<EmployeeType>();

    // load user information by if first
    const loadUserInfo = async () => {
        try {
            const response = await apiClient.get(`/api/employee/${id}`);
            setUserInfo(response.data.employee)
        } catch (error) {
            if (error instanceof AxiosError)
                toast({
                    variant: "destructive",
                    title: "Something went wrong!",
                    description: error.response?.data.message || "Unable to load employee information",
                })
        }
    }

    useEffect(() => {
        loadUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            firstName: userInfo?.firstName,
            lastName: userInfo?.lastName,
            city: userInfo?.city,
            country: userInfo?.country,
            email: userInfo?.email,
            phone: userInfo?.phone
        }
    })

    const handleNext = () => {
        setStep(step + 1)
    }

    const handlePrev = () => {
        setStep(step - 1)
    }

    const onSubmit: SubmitHandler<EmployeeFormData> = async (data) => {
        setIsSubmitting(true)
        try {
            const response = await apiClient.post('/api/employee', data)
            toast({
                description: "Employee created successfully!",
            })

            navigate(`/employee/${response.data.employee.id}`)
        } catch (error) {
            if (error instanceof AxiosError)
                toast({
                    variant: "destructive",
                    title: "Something went wrong!",
                    description: error.response?.data.message || "Unable to create employee",
                })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6 py-12">
            <div className="space-y-4 text-center">
                <h1 className="text-3xl font-bold">Update Employee </h1>
                <p className="text-muted-foreground">Fill out the form to update  employee.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-12">
                {step === 1 && (
                    <div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    {...register("firstName")}
                                    placeholder="Abebe"
                                    required
                                />
                                {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    {...register("lastName")}
                                    placeholder="Kebede"
                                    required
                                />
                                {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    {...register("email")}
                                    type="email"
                                    placeholder="abebe@kebede.com"
                                    required
                                />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    {...register("phone")}
                                    type="tel"
                                    placeholder="+2519774349955"
                                    required
                                />
                                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
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
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    id="country"
                                    {...register("country")}
                                    placeholder="Ethiopia"
                                    required
                                />
                                {errors.country && <p className="text-red-500">{errors.country.message}</p>}
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    {...register("city")}
                                    placeholder="Dire Dawa"
                                    required
                                />
                                {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                            </div>
                        </div>
                        <div className="flex my-4 justify-between">
                            <Button onClick={handlePrev} type="button" variant="outline">
                                Previous
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "updating..." : "Update Employee"}
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}
