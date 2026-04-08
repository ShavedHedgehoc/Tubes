import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Field,
  MainNavLink,
} from "@/shared/ui";
import { ChevronDown, User } from "lucide-react";

export function Dropdown() {
  return (
    // <div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MainNavLink href={""}>
          <Field
            orientation="horizontal"
            className="justify-center items-center flex gap-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Админ
            <ChevronDown className="h-4 w-4" />
          </Field>
        </MainNavLink>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {/* <DropdownMenuLabel>Действия</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
        <DropdownMenuItem
        // onClick={handleEditClick}
        >
          <User />
          Пользователи
        </DropdownMenuItem>
        {/* <DropdownMenuItem
                        onClick={handleChangeBannedClick}
                        disabled={changeAccessPending}
                    >
                        {banned ? <UserCheck /> : <Ban />}
                        {banned ? "Разблокировать" : "Заблокировать"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        variant={"destructive"}
                        onClick={handleDeleteClick}
                        disabled={deletePending}
                    >
                        <Trash />
                        Удалить
                    </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
    // </div>
  );
}
