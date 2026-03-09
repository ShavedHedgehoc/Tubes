import { Check, CircleDashed, Play, Timer } from "lucide-react";
import { Card } from "@/shared/ui";
import { cn } from "@/shared/lib";
import { PostCloseButton } from "@/features/finish-conveyor-post";

type IState = "working" | "idle" | "finished" | "no_data";

export interface DashTubePostCardProps {
  title: string;
  productionValue: number;
  employee: string;
  state: IState;
  summary_id: number;
  post_id: number;
  post_name: string;
  closePermission: boolean;
}

const STATE_CONFIG = {
  working: {
    label: "Работает",
    icon: <Play size={20} fill="currentColor" />,
    // Насыщенный изумрудный + белый текст
    className:
      "bg-emerald-500 dark:bg-emerald-600 text-white shadow-[0_8px_20px_-6px_rgba(16,185,129,0.4)]",
    animate: "animate-pulse duration-[3000ms]",
  },
  idle: {
    label: "Простой",
    icon: <Timer size={20} />,
    // Теплый янтарный + темный текст для контраста
    className:
      "bg-amber-400 dark:bg-amber-500 text-amber-950 shadow-[0_8px_20px_-6px_rgba(245,158,11,0.4)]",
  },
  finished: {
    label: "Закончил",
    icon: <Check size={20} strokeWidth={3} />,
    // Глубокий фиолетовый + белый текст
    className:
      "bg-violet-500 dark:bg-violet-600 text-white shadow-[0_8px_20px_-6px_rgba(139,92,246,0.4)]",
  },
  no_data: {
    label: "Нет данных",
    icon: <CircleDashed size={20} className="opacity-20" />,
    // Нейтральный фон с пунктиром
    className:
      "bg-zinc-800/50 border-2 border-dashed border-zinc-700 text-zinc-500",
  },
};

// const STATE_CONFIG_2 = {
//     working: {
//         label: "Работает",
//         icon: <Play size={20} fill="currentColor" />, // fill закрасит иконку внутри
//         className: "bg-[#22c55e] text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]",
//     },
//     idle: {
//         label: "Простой",
//         icon: <Timer size={20} />,
//         className: "bg-[#eab308] text-black", // Желтый лучше с черным текстом
//     },
//     finished: {
//         label: "Закончил",
//         icon: <Check size={20} strokeWidth={3} />,
//         className: "bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]",
//     },
//     no_data: {
//         label: "Нет данных",
//         icon: <CircleDashed size={20} className="opacity-20" />,
//         className: "bg-[#1e1e1e] border-2 border-dashed border-neutral-800 text-neutral-500",
//     },
// };

// const STATE_CONFIG_1 = {
//     working: {
//         label: "Работает",
//         icon: <Play />,
//         className: "bg-[#4ade80] dark:bg-[#15803d] ",
//     },
//     idle: {
//         label: "Простой",
//         icon: <Timer />,
//         className: "bg-[#facc15] dark:bg-[#a16207] ",
//     },
//     finished: {
//         label: "Закончил",
//         icon: <Check />,
//         className: "bg-[#e879f9] dark:bg-[#a21caf] ",
//     },
//     no_data: {
//         label: "Нет данных",
//         icon: null,
//         className: "bg-muted/50",
//     },
// };

export default function PostCard(props: DashTubePostCardProps) {
  const config = STATE_CONFIG[props.state];
  const isNoData = props.state === "no_data";

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
      {props.closePermission && props.state === "working" && (
        <PostCloseButton
          summaryId={props.summary_id}
          postId={props.post_id}
          postTitle={props.post_name}
        />
      )}
      <div className="mb-auto">
        <h3 className="text-xs font-black uppercase tracking-widest opacity-80">
          {props.title}
        </h3>
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
          {isNoData ? "Нет данных" : props.employee}
        </p>
      </div>
    </Card>
  );
}
