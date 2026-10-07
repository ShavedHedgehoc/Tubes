"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
} from "@/shared/ui";

import React from "react";
import { useFormContext } from "react-hook-form";
import { useCreateLabLockReason } from "../model/use-create-lab-lock-reason";

interface AddReasonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setSearchQuery: (val: string) => void;
}

export function AddReasonDialog({
  open,
  onOpenChange,
  setSearchQuery,
}: AddReasonDialogProps) {
  const [newReasonText, setNewReasonText] = React.useState("");

  const { setValue } = useFormContext();
  const { createReason, createReasonPending } = useCreateLabLockReason();

  const handleSave = async () => {
    if (!newReasonText.trim()) return;
    try {
      const newReason = await createReason({ value: newReasonText });
      if (newReason && newReason.id) {
        setValue("lockReasonId", newReason.id, { shouldValidate: true });
        setSearchQuery(newReason.value);
      }
      setNewReasonText("");
      onOpenChange(false);
    } catch (_error) {}
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <DialogTitle>Новая причина блокировки</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Input
            placeholder="Например: Авария на конвейере"
            value={newReasonText}
            onChange={(e) => setNewReasonText(e.target.value)}
            disabled={createReasonPending}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSave();
              }
            }}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button
              type="button"
              disabled={createReasonPending || !newReasonText.trim()}
              onClick={handleSave}
            >
              {createReasonPending ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
