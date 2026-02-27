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
          // query: { page: 1, limit: 10, name_asc: "true" },
        }}
      >
        Сотрудники
      </Link>
      <Link
        className="tracking-[-0.01em]"
        href={{
          pathname: "/summaries",
          // query: { page: 1, limit: 10, name_asc: "true" },
        }}
      >
        Сводки
      </Link>
    </nav>
  );
}
