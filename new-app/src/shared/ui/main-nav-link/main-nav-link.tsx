import { cn } from "@/shared/lib";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface MainNavLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export function MainNavLink({
  href,
  children,
  className,
  ...props
}: MainNavLinkProps) {
  return (
    <Link
      href={href}
      className={cn("tracking-[-0.01em]", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
