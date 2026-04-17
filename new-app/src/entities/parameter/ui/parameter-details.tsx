import { AnyParameter } from "../model";
import { ExtrusionDetail } from "./extrusion-detail";
import { OffsetDetail } from "./offset-detail";
import { ParameterHeader } from "./parameter-header";
import { SealantDetail } from "./sealant-detail";
import { VarnishDetail } from "./varnish-detail";

interface Props {
    params: AnyParameter;
}

export function ParameterDetails({ params }: Props) {
    return (
        <div>
            <ParameterHeader />
            {params.type === "extrusion" && <ExtrusionDetail />}
            {params.type === "varnish" && <VarnishDetail />}
            {params.type === "offset" && <OffsetDetail />}
            {params.type === "sealant" && <SealantDetail />}
        </div>
    )
}