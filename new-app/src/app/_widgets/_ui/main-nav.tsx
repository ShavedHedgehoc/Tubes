import { MainNavLink } from "@/shared/ui";
import Link from "next/link";

export function MainNav() {
  return (
    <nav className="flex items-start md:items-center gap-6 text-md font-medium flex-col md:flex-row ">
      <Link className="tracking-[-0.01em]" href="/">
        Главная
      </Link>
      <Link
        className="tracking-[-0.01em]"
        href={{
          pathname: "/employees",
        }}
      >
        Сотрудники
      </Link>
      <Link
        className="tracking-[-0.01em]"
        href={{
          pathname: "/summaries",
        }}
      >
        Сводки
      </Link>
      <Link
        className="tracking-[-0.01em]"
        href={{
          pathname: "/tresholds",
        }}
      >
        Границы
      </Link>
      <MainNavLink href={"/files"}>Файлы</MainNavLink>
    </nav>
  );
}
