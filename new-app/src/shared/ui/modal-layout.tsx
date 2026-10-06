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
  showClose?: boolean;
}

export function ModalLayout({
  title,
  description,
  isOpen,
  onOpenChange,
  className,
  children,
  showClose = false,
}: ModalLayoutProps) {
  const handleOutsideClick = (e: Event) => {
    if (!showClose) {
      e.preventDefault();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-lg",
          "p-0 border-none bg-transparent shadow-none overflow-hidden",
          className,
        )}
        showCloseButton={showClose}
        onPointerDownOutside={handleOutsideClick}
        onInteractOutside={handleOutsideClick}
        onEscapeKeyDown={handleOutsideClick}
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
