import { FileEntity } from "@/entities/file";
import { cn } from "@/shared/lib";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import { CheckIcon, X } from "lucide-react";
import Image from "next/image";

export function AddGalleryForm({
  files,
  onClose,
  selectedId,
  onSelect,
  onConfirm,
  alreadyAcceptedIds = [],
}: {
  files: FileEntity[];
  onClose: () => void;
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  onConfirm: () => void;
  alreadyAcceptedIds?: number[];
}) {
  return (
    <Card className="w-full  h-full px-3  border-0 overflow-hidden shadow-none sm:border relative">
      <div className="absolute right-3 top-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-muted transition-colors"
          onClick={onClose}
        >
          <X className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Закрыть</span>
        </Button>
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Добавление картинки
        </CardTitle>
        <CardDescription>
          <span>Выберите картинку и нажмите "Сохранить"</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 p-4 w-full overflow-hidden">
        <div className="h-full w-full overflow-y-auto pr-2">
          <div
            className="grid gap-4 content-start p-1"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            }}
          >
            {files.map((file) => {
              const isSelected = selectedId === file.id;
              const isAlreadyAccepted = alreadyAcceptedIds.includes(file.id);

              return (
                <div
                  key={file.id}
                  onClick={() => {
                    if (isAlreadyAccepted) return;
                    onSelect(isSelected ? null : file.id);
                  }}
                  className={cn(
                    "group relative aspect-square  overflow-hidden rounded-xl border-2 transition-all duration-300",
                    isAlreadyAccepted
                      ? "opacity-40 cursor-not-allowed grayscale"
                      : "cursor-pointer",
                    isSelected
                      ? "border-accent shadow-lg"
                      : "border-transparent bg-muted",
                  )}
                >
                  <Image
                    src={`/images/${file.filename}`}
                    alt={file.filename}
                    unoptimized
                    fill
                    className={cn(
                      "h-full w-full object-cover transition-all duration-500",
                      isSelected
                        ? "scale-110 brightness-75"
                        : "group-hover:scale-105",
                    )}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 z-10 transition-opacity duration-100 pointer-events-none",
                      isSelected && "bg-background opacity-50 ",
                      isAlreadyAccepted && "bg-background opacity-50 ",
                    )}
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    {isSelected && (
                      <div className="flex h-16 w-16 items-center rounded-full justify-center p-4 bg-muted shadow-2xl animate-in zoom-in-50 duration-200">
                        <CheckIcon className="h-10 w-10 text-foreground stroke-[5px]" />
                      </div>
                    )}
                    {isAlreadyAccepted && (
                      <div className="flex  w-full items-center bg-muted mx-2 rounded-lg justify-center p-4 ">
                        <span className="text-muted-foreground text-4xl ">
                          Уже назначено
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-0 pb-0 pt-4">
        <Button className="w-full" onClick={onConfirm}>
          Сохранить выбор
        </Button>
      </CardFooter>
    </Card>
  );
}
