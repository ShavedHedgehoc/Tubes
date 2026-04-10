"use client";
import * as React from "react";
import { Folder } from "lucide-react"; // Добавили иконку файла
import { Label, Input } from "@/shared/ui";
import { cn } from "@/shared/lib";

export interface FileInputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  accept?: string;
}

export const FileInputWithIcon = React.forwardRef<
  HTMLInputElement,
  FileInputWithIconProps
>(({ className, label = "Выберите файл", onChange, ...props }, ref) => {
  const internalRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  React.useImperativeHandle(ref, () => ({
    ...internalRef.current!,
    set value(v: string) {
      if (v === "") setFileName(null);
      if (internalRef.current) internalRef.current.value = v;
    },
    get value() {
      return internalRef.current?.value || "";
    },
    click: () => internalRef.current?.click(),
  }));

  const handleIconClick = () => internalRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-col items-left gap-3">
        <div
          onClick={handleIconClick}
          className={cn(
            "h-8  w-full flex items-center cursor-pointer px-3 py-2",
            "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            "rounded-md  transition-all ",
            "focus-within:outline-none focus-within:ring-0 ",
            fileName ? "text-foreground" : "text-muted-foreground",
          )}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleIconClick()}
        >
          <Folder className="h-4 w-4  mr-2" />
          <Label className="pl-1 cursor-pointer font-normal text-sm" htmlFor={props.id}>
            {fileName ? fileName : label}
          </Label>
        </div>
      </div>
      <Input
        {...props}
        type="file"
        ref={internalRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
});
FileInputWithIcon.displayName = "FileInputWithIcon";
