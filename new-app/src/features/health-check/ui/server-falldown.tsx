"use client";

import { Button } from "@/shared/ui";
import { FalldownIcon } from "@/shared/assets";

export function ServerFalldown({
  reset,
  isAuto,
}: {
  reset?: () => void;
  isAuto: boolean;
}) {
  const handleReset = () => {
    window.location.reload();
    reset?.();
  };
  return (
    <div className="flex flex-col h-dvh bg-background justify-center items-center gap-4">
      <div className={isAuto ? "animate-pulse" : ""}>
        <FalldownIcon />
      </div>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Сервер недоступен
      </h1>
      <p>Мы обязательно скоро его починим</p>
      {!isAuto && <Button onClick={handleReset}>Попробовать снова</Button>}
      {isAuto && (
        <p className="text-muted-foreground text-sm italic">
          Запросы на подключение отправляются автоматически, пожалуйста,
          подождите
        </p>
      )}
      {!isAuto && (
        <p className="text-muted-foreground text-sm italic">
          Нажмите кнопку или обновите страницу для того, чтобы попробовать снова
        </p>
      )}
    </div>
  );
}
