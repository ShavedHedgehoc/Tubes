import { authConfig } from "@/app/auth/auth-config";
import { MainNavLink } from "@/shared/ui";
import { getServerSession } from "next-auth";

export async function MainNav() {
  const session = await getServerSession(authConfig);
  const userRoles = session?.user?.roles || [];

  const hasRole = (role: string) => userRoles.includes(role);
  return (
    <nav className="flex items-start md:items-center gap-6 text-md font-medium flex-col md:flex-row px-6 md:px-0!">
      <MainNavLink href={"/"}>Главная</MainNavLink>
      <MainNavLink href={"/employees"}>Сотрудники</MainNavLink>
      <MainNavLink href={"/summaries"}>Сводки</MainNavLink>
      <MainNavLink href={"/tresholds"}>Границы</MainNavLink>
      <MainNavLink href={"/products"}>Продукция</MainNavLink>
      <MainNavLink href={"/operations"}>Операции</MainNavLink>
      <MainNavLink href={"/files"}>Файлы</MainNavLink>
      {hasRole("ADMIN") && (
        <MainNavLink href={"/users"}>Пользователи</MainNavLink>
      )}
      {hasRole("PERFOMANCE") && (
        <MainNavLink href={"/perfomance"}>Показатели</MainNavLink>
      )}
    </nav>
  );
}
