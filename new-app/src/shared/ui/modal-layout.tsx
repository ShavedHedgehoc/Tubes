"use client";

import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui";

interface ModalLayoutProps {
  title: string;
  description: string;
  isOpen: boolean;
  onOpenChange: (val: boolean) => void;
  children: React.ReactNode; // Добавляем children
}

export function ModalLayout({
  title,
  description,
  isOpen,
  onOpenChange,
  children, // Извлекаем children
}: ModalLayoutProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg p-0 border-none bg-transparent shadow-none overflow-hidden"
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
