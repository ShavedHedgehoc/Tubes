"use client"

import { useEffect, useState } from "react";

export const useDate = () => {
    const locale = "ru";
    const [today, setDate] = useState<Date | null>(null);

    useEffect(() => {
        // Устанавливаем дату сразу при монтировании на клиенте
        setDate(new Date());

        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!today) return { date: "", time: "", today: new Date() };

    const dayRaw = today.toLocaleDateString(locale, { weekday: "long" });
    const day = dayRaw.charAt(0).toUpperCase() + dayRaw.slice(1);

    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: "long" })}`;

    const time = today.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    return { date, time, today };
};
