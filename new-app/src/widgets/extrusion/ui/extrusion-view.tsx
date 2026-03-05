"use client";


import { HeaderComponent, PostNames } from "@/entities/conveyor";
import { MaterialChartItem, MaterialPieChart } from "@/entities/material/ui/material-pie-chart";
import { TimeDisplay } from "@/shared/ui";
import DashLayout, { DashLayoutProps } from "@/shared/ui/dash-layout/dash-layout";

const materilaData: MaterialChartItem[] = [
    {
        name: "dsfdfs",
        scanned: false
    },
    {
        name: "fsdff sdfsfsfsfsa",
        scanned: true
    }, {
        name: "fsdff sdfsfsfsfsa",
        scanned: true
    },
    {
        name: "fsdff sdfsfsfsfsa djsa;fsj; jsfa;sdj;fsf",
        scanned: true
    }

]
const conveyor = "201"
export default function ExtrusionView({ slug }: { slug: string }) {


    const extrusionViewProps: DashLayoutProps = {
        timeComponent: <TimeDisplay />,
        headerComponent: <HeaderComponent conveyorName={conveyor} postName={PostNames.EXTRUSION} />,
        parameterComponent: undefined,
        materialPieChartComponent: <MaterialPieChart data={materilaData} />,
        productionLineChartComponent: undefined,
        productionCardComponent: undefined,
        menuComponent: undefined,
        userComponent: undefined,
        loaderComponent: undefined,
        notFoundComponent: undefined,
        isLoading: false,
        isNotFound: false
    };

    return (
        <DashLayout {...extrusionViewProps} />
    )
}
