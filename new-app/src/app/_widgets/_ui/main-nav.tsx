import { MainNavLink } from "@/shared/ui";

export function MainNav() {
  return (
    <nav className="flex items-start md:items-center gap-6 text-md font-medium flex-col md:flex-row ">
      <MainNavLink href={"/"}>Главная</MainNavLink>
      <MainNavLink href={"/employees"}>Сотрудники</MainNavLink>
      <MainNavLink href={"/summaries"}>Сводки</MainNavLink>
      <MainNavLink href={"/tresholds"}>Границы</MainNavLink>
      <MainNavLink href={"/products"}>Продукция</MainNavLink>
      <MainNavLink href={"/operations"}>Операции</MainNavLink>
      <MainNavLink href={"/files"}>Файлы</MainNavLink>
    </nav>
  );
}
