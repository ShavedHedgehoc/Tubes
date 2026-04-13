import {
  Badge,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui";

interface Role {
  id: number;
  value: string;
  description: string;
}

export function UserRolesCell({ roles }: { roles: Role[] }) {
  const displayLimit = 3;
  const extraRoles = roles.length - displayLimit;

  return (
    <div className="flex items-center gap-1.5">
      {roles.slice(0, displayLimit).map((role) => (
        <Badge
          key={role.id}
          variant="secondary"
          className="font-normal text-[11px] px-2 py-0"
        >
          {role.description}
        </Badge>
      ))}

      {extraRoles > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="outline"
                className="cursor-help text-[11px] px-1.5 py-0"
              >
                +{extraRoles}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col gap-1">
                {roles.slice(displayLimit).map((role) => (
                  <span key={role.id}>{role.description}</span>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
