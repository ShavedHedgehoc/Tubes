import { Loader2 } from "lucide-react";

export function LoaderCard() {
  return (
    <div className="flex min-h-[100px]  text-muted-foreground flex-col items-center justify-center gap-2 bg-background rounded-lg border shadow-lg py-4">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="text-xl ">Загрузка данных...</p>
    </div>
  );
}
