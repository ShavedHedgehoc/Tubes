"use client";

import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui";
import { cn } from "../lib";

interface ModalLayoutProps {
  title: string;
  description: string;
  isOpen: boolean;
  onOpenChange: (val: boolean) => void;
  className?: string;
  children: React.ReactNode;
}

export function ModalLayout({
  title,
  description,
  isOpen,
  onOpenChange,
  className,
  children,
}: ModalLayoutProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-lg",
          "p-0 border-none bg-transparent shadow-none overflow-hidden",
          className,
        )}
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
