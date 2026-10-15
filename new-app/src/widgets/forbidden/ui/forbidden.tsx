"use client";

import { Button } from "@/shared/ui";
import { StopIcon } from "@/shared/assets";
import { useRouter } from "next/navigation";

export function Forbidden() {
  const router = useRouter();
  const handleToMainPageClick = () => {
    router.push("/");
  };
  return (
    <div className="flex flex-col h-full bg-background justify-center items-center gap-4">
      <div>
        <StopIcon />
      </div>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Запрет доступа
      </h1>
      <Button onClick={handleToMainPageClick}>Вернуться на главную</Button>
      <p className="text-muted-foreground text-sm italic">
        К сожалению, ваших прав недостаточно. Нажмите не кнопку для возврата на
        главную страницу.
      </p>
    </div>
  );
}
