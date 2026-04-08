import { authConfig } from "@/app/auth/auth-config";
import { Dropdown } from "@/features/admin";
import { MainNavLink } from "@/shared/ui";
import { getServerSession } from "next-auth";

export async function MainNav() {
  const session = await getServerSession(authConfig);
  const userRoles = session?.user?.roles || [];

  const hasRole = (role: string) => userRoles.includes(role);
  return (
    <nav className="flex items-start md:items-center gap-6 text-md font-medium flex-col md:flex-row ">
      <MainNavLink href={"/"}>Главная</MainNavLink>
      <MainNavLink href={"/employees"}>Сотрудники</MainNavLink>
      <MainNavLink href={"/summaries"}>Сводки</MainNavLink>
      <MainNavLink href={"/tresholds"}>Границы</MainNavLink>
      <MainNavLink href={"/products"}>Продукция</MainNavLink>
      <MainNavLink href={"/operations"}>Операции</MainNavLink>
      <MainNavLink href={"/files"}>Файлы</MainNavLink>
      {hasRole("USER") && <Dropdown />}
    </nav>
  );
}
