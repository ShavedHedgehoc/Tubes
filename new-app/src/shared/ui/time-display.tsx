"use client";

import { useDate } from "@/shared/lib/hooks/use-date";
import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";

export const TimeDisplay = ({ className }: { className?: string }) => {
    const { date, time } = useDate();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="h-full w-full" />;

    return (
        <div className={cn("flex h-full w-full items-center justify-end px-4 gap-6", className)}>
            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {date}
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-primary tabular-nums">
                {time}
            </span>
        </div>
    );
};
