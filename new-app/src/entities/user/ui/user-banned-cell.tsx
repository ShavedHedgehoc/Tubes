import { Ban, UserCheck } from "lucide-react";
import { UserEntity } from "../model";

export function UserBannedCell({ user }: { user: UserEntity }) {
    return (
        <div className="text-center">
            {user.banned ? (
                <span className="inline-flex items-center gap-2 ">
                    <Ban className="h-4 w-4" />
                    <span className="leading-none">Запрещен</span>
                </span>
            ) : (
                <span className="inline-flex items-center gap-2 ">
                    <UserCheck className="h-4 w-4 " />
                    <span className="leading-none">Разрешен</span>
                </span>
            )}
        </div>
    );
}