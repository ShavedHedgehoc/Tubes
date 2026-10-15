import { Ban, UserCheck } from "lucide-react";
import { EmployeeEntity } from "../model";

export function PostAllowCell({
  employee,
  postVal,
}: {
  employee: EmployeeEntity;
  postVal: number;
}) {
  const allowedPostIds = (employee.allowed_posts || []).map((ap) => ap.value);
  const isPostAllowed = allowedPostIds.includes(postVal);
  return (
    <div className="text-center">
      {isPostAllowed ? (
        <span className="inline-flex items-center gap-2 ">
          <UserCheck className="h-4 w-4 " />
        </span>
      ) : (
        <span className="inline-flex items-center gap-2 ">
          <Ban className="h-4 w-4" />
        </span>
      )}
    </div>
  );
}
