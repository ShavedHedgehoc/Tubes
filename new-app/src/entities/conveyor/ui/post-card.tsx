import { Ban, Check, CircleDashed, Play, Timer } from "lucide-react";
import {
  Card,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui";
import { cn } from "@/shared/lib";

type IState = "working" | "idle" | "finished" | "locked" | "no_data";

export interface PostCardProps {
  title: string;
  productionValue: number;
  employee: string;
  state: IState;
  hasLock: boolean;
  lockReason: string | null;
  summary_id: number;
  post_id: number;
  post_name: string;
  closePermission: boolean;
  action?: React.ReactNode;
}

const STATE_CONFIG = {
  working: {
    label: "Работает",
    icon: <Play size={20} fill="currentColor" />,
    className:
      "bg-emerald-500 dark:bg-emerald-600 text-white shadow-[0_8px_20px_-6px_rgba(16,185,129,0.4)]",
    animate: "animate-pulse duration-[3000ms]",
  },
  idle: {
    label: "Простой",
    icon: <Timer size={20} />,
    className:
      "bg-amber-400 dark:bg-amber-500 text-amber-950 shadow-[0_8px_20px_-6px_rgba(245,158,11,0.4)]",
  },
  finished: {
    label: "Закончил",
    icon: <Check size={20} strokeWidth={3} />,
    className:
      "bg-violet-500 dark:bg-violet-600 text-white shadow-[0_8px_20px_-6px_rgba(139,92,246,0.4)]",
  },
  locked: {
    label: "Заблокирован",
    icon: <Ban size={20} strokeWidth={3} />,
    className:
      "bg-red-400 dark:bg-red-500 text-white shadow-[0_8px_20px_-6px_rgba(139,92,246,0.4)]",
  },
  no_data: {
    label: "Нет данных",
    icon: <CircleDashed size={20} className="opacity-20" />,
    className:
      "bg-zinc-800/50 border-2 border-dashed border-zinc-700 text-zinc-500",
  },
};

export default function PostCard(props: PostCardProps) {
  const config = STATE_CONFIG[props.state];
  const isNoData = props.state === "no_data";
  const isLocked = props.state === "locked";

  return (
    <Card
      className={cn(
        "group relative flex flex-col grow",
        "w-1/4 h-full gap-2 py-4 px-4",
        "transition-colors shadow-none",
        config.className,
        isNoData &&
          "border-2 border-dashed bg-transparent text-muted-foreground",
      )}
    >
      <div className="absolute top-0 right-0 z-10">{props.action}</div>
      <div className="mb-auto flex items-center gap-1.5">
        <h3 className="text-xs font-black uppercase tracking-widest opacity-80">
          {props.title}
        </h3>

        {props.hasLock && (
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center  outline-none cursor-help dynamic-lock-icon",
                    props.state === "idle"
                      ? "text-red-500 dark:text-red-600"
                      : "text-white",
                  )}
                >
                  <svg
                    xmlns="http://w3.org"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </TooltipTrigger>

              <TooltipContent
                side="top"
                className="max-w-xs text-xs font-medium normal-case tracking-normal"
              >
                <p>{props.lockReason || "Причина не указана"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="flex flex-col items-center justify-center my-2 gap-1">
        {!isNoData ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl font-black tracking-tighter leading-none">
              {props.productionValue}
            </div>
            <div className="mt-1 opacity-90">
              {Boolean(config.icon) && Math.max(0, 1) ? (
                <span
                  className={cn(
                    "[&>svg]:w-6 [&>svg]:h-6",
                    props.state === "working" && "animate-pulse",
                  )}
                >
                  {config.icon}
                </span>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="opacity-20 py-2">
            <CircleDashed size={40} strokeWidth={2.5} />
          </div>
        )}
      </div>
      <div className="mt-auto   overflow-hidden">
        <p className="text-[11px] font-bold truncate text-center uppercase tracking-tight">
          {isNoData
            ? "Нет данных"
            : isLocked
              ? "Заблокировано"
              : props.employee}
        </p>
      </div>
    </Card>
  );
}
