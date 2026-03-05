"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface DashLayoutProps {
    timeComponent: React.ReactNode;
    headerComponent: React.ReactNode;
    parameterComponent: React.ReactNode;
    materialPieChartComponent: React.ReactNode;
    productionLineChartComponent: React.ReactNode;
    productionCardComponent: React.ReactNode;
    menuComponent: React.ReactNode;
    userComponent: React.ReactNode;
    loaderComponent: React.ReactNode;
    notFoundComponent: React.ReactNode;
    isLoading: boolean;
    isNotFound: boolean;
}

export default function DashLayout(props: DashLayoutProps) {
    return (
        // Оболочка в темной теме с акцентом teal
        <div className="dark bg-background text-foreground h-screen w-screen overflow-hidden p-2">
            <div className={cn(
                "grid h-full w-full gap-2",
                "grid-cols-[repeat(24,1fr)] grid-rows-[repeat(28,1fr)]" // Кастомная сетка 24x28
            )}>

                {/* Time Component */}
                <div className="col-span-24 row-span-1 border-b border-border/40">
                    {props.timeComponent}
                </div>

                {/* Header Component */}
                <div className="col-span-24 row-span-2 flex items-center px-2">
                    {props.headerComponent}
                </div>

                {!props.isLoading && !props.isNotFound && (
                    <>
                        {/* Spacer row-span-1 */}
                        <div className="col-span-24 row-span-1" />

                        {/* Main Parameters - Таблица с Rowspan будет тут */}
                        <div className="col-span-24 row-span-12 rounded-xl border p-4 shadow-sm overflow-auto">
                            {props.parameterComponent}
                        </div>

                        {/* Charts Section */}
                        <div className="col-span-8 row-span-8 rounded-xl">
                            {props.materialPieChartComponent}
                        </div>
                        <div className="col-span-8 row-span-8 rounded-xl  p-2">
                            {props.productionLineChartComponent}
                        </div>
                        <div className="col-span-8 row-span-8 rounded-xl  p-2">
                            {props.productionCardComponent}
                        </div>

                        <div className="col-span-24 row-span-1" />

                        {/* Bottom Menu */}
                        <div className="col-span-24 row-span-2 flex items-center">
                            {props.menuComponent}
                        </div>

                        {/* User Info */}
                        <div className="col-span-24 row-span-1 flex items-center px-4 italic text-muted-foreground">
                            {props.userComponent}
                        </div>
                    </>
                )}

                {/* Loading / Not Found States */}
                {props.isLoading && (
                    <div className="col-span-24 row-span-25 flex items-center justify-center">
                        {props.loaderComponent}
                    </div>
                )}
                {props.isNotFound && (
                    <div className="col-span-24 row-span-25 flex items-center justify-center text-destructive">
                        {props.notFoundComponent}
                    </div>
                )}
            </div>
        </div>
    );
}
