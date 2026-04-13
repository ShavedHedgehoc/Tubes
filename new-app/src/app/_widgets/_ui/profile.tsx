"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
// import { Skeleton } from "@/shared/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from "@/shared/ui";
import { useAppSession } from "@/entities/user";
import { useLogout } from "@/features/auth";

// import { ProfileAvatar, getProfileDisplayName } from "@/entities/user/profile";

export function Profile() {
  const session = useAppSession();
  const { logout, logoutPending } = useLogout();

  if (session.status === "loading") {
    return <Skeleton className="w-8 h-8 rounded-full" />;
  }

  const user = session?.data?.user;

  const initials = user?.name
    ?.split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-px rounded-full self-center h-8 w-8"
        >
          <Avatar>
            <AvatarImage src={user?.avatar_url} />
            <AvatarFallback className="text-xs">
              {initials || "XX"}
            </AvatarFallback>
          </Avatar>

          {/* <ProfileAvatar profile={user} className="w-8 h-8" /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 ">
        <DropdownMenuLabel>
          <p>Мой аккаунт</p>
          <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
            {session.data?.user.name}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            {/* <Link href={`/profile/${user?.id}`}> */}
            <Link href={`/`}>
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={logoutPending} onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выход</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
