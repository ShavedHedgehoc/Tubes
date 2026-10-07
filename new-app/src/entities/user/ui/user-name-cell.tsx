import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { UserEntity } from "../model";

export function UserNameCell({ user }: { user: UserEntity }) {
  const initials = user.name
    ?.split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="flex items-center gap-3 text-left pl-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatar_url || undefined} alt={user.name} />
        <AvatarFallback className="text-xs">{initials || "XX"}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium leading-none">{user.name}</span>
        <span className="text-xs text-muted-foreground mt-1 leading-none md:hidden">
          {user.email}
        </span>
      </div>
    </div>
  );
}
