import { apiClient } from "@/api/config";
import { ApiResponse, Employee, EmployeeDetail } from '@/schemas/info';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from './spinner';
import { Button } from "../ui/button";
import { Pen } from "lucide-react";

const EmployeeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      try {
        const response = await apiClient.get<ApiResponse>(`/api/employee/${id}`);
        setEmployee(response.data.employee);
      } catch (err) {
        setError("Failed to fetch employee details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetail();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!employee) return null;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{employee.firstName} {employee.lastName}</h1>
        <p className="text-gray-700 mb-2"><strong>Email:</strong> {employee.email}</p>
        <p className="text-gray-700 mb-2"><strong>Phone:</strong> {employee.phone}</p>
        <p className="text-gray-700 mb-2"><strong>Location:</strong> {employee.city}, {employee.country}</p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Job Details</h2>
        {employee.employeeDetail.map((detail: EmployeeDetail) => (
          <div key={detail.id} className="mb-6">
            <p className="text-gray-700 mb-2"><strong>Position:</strong> {detail.position}</p>
            <p className="text-gray-700 mb-2"><strong>Department:</strong> {detail.department}</p>
            <p className="text-gray-700 mb-2"><strong>Supervisor:</strong> {detail.supervisorName}</p>
            <p className="text-gray-700 mb-2"><strong>Employment Type:</strong> {detail.employmentType}</p>
            <p className="text-gray-700 mb-2"><strong>Employment Status:</strong> {detail.employmentStatus}</p>
            <p className="text-gray-700 mb-2"><strong>Start Date:</strong> {new Date(detail.startDate).toLocaleDateString()}</p>
            {detail.endDate && (
              <p className="text-gray-700 mb-2"><strong>End Date:</strong> {new Date(detail.endDate).toLocaleDateString()}</p>
            )}
            <p className="text-gray-700 mb-2"><strong>Base Salary:</strong> ${detail.baseSalary.toFixed(2)}</p>
            <p className="text-gray-700 mb-2"><strong>Salary Frequency:</strong> {detail.salaryFrequency}</p>
            <p className="text-gray-700 mb-2"><strong>Date of Hire:</strong> {new Date(detail.dateOfHire).toLocaleDateString()}</p>
            <Link to={`/employee/detail/edit/${detail.id}`}>
              <Button><Pen className="w-4 h-4 mr-2" /> Edit </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
