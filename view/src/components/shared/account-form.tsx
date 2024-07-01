import { apiClient } from '@/api/config';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { toast } from "../ui/use-toast";

const registrationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export function RegisterAccountForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
        setIsSubmitting(true);
        try {
            await apiClient.post('/api/users/', data);
            toast({
                description: "Registration successful!",
            });
            navigate('/admin/accounts');
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    variant: "destructive",
                    title: "Something went wrong!",
                    description: error.response ? error.response.data.message : 'An error occurred',
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className='p-5 md:p-10 flex items-center justify-center'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Enter your details below to create a new account.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                placeholder="Abebe Kebede"
                                required
                                disabled={isSubmitting}
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                {...register("email")}
                                type="email"
                                placeholder="abebe@kebede.com"
                                required
                                disabled={isSubmitting}
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                {...register("password")}
                                type="password"
                                placeholder='*************'
                                required
                                disabled={isSubmitting}
                            />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>


                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </main>
    );
}
