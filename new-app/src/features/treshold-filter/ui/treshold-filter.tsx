import { useTresholdSearchParams } from "@/entities/treshold";
import ResetButton from "./reset-button";
import CodeInput from "./code-input";
import MarkingInput from "./marking-input";
import ConveyorSelector from "./conveyor-selector";
import Toggler from "./toggler";

type Conveyor = {
    id: number;
    value: string;
}

interface Props {
    conveyorsListItems: Conveyor[] | [];
    actions?: React.ReactNode;
}

export function TresholdFilter(props: Props) {

    return (
        <div className="flex  mb-4 justify-between">
            <div className="flex justify-start gap-2">
                <div className="flex flex-row">
                    <CodeInput />
                    <MarkingInput />
                    <ConveyorSelector conveyors={props.conveyorsListItems} />
                </div>
                <ResetButton />
            </div>
            <div className="flex gap-8">
                <Toggler />
                {props.actions}
            </div>
        </div>
    );
}
