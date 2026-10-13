import { Loader2 } from "lucide-react";

interface ILoaderCardProps {
  message?: string;
}
export function LoaderCard({ message }: ILoaderCardProps) {
  return (
    <div className="flex min-h-25  text-muted-foreground flex-col items-center justify-center gap-2 bg-background rounded-lg border shadow-lg py-8">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="text-xl ">{message || "Загрузка данных..."}</p>
    </div>
  );
}
