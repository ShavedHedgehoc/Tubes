import { employeeParamsCache } from "@/entities/employee";
import { Employees } from "@/widgets/employees";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function EmployeesPage({ searchParams }: PageProps) {
  const params = await employeeParamsCache.parse(searchParams);
  return <Employees props={params} />;
}
