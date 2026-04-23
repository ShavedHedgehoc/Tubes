"use client";
import { POST_NAMES } from "@/shared/config";
import { AnyParameter } from "../model";
import { ExtrusionDetail } from "./extrusion-detail";
import { OffsetDetail } from "./offset-detail";
import { ParameterHeader } from "./parameter-header";
import { SealantDetail } from "./sealant-detail";
import { VarnishDetail } from "./varnish-detail";
import { useRouter } from "next/navigation";
import { PARAMS_ROUTES } from "@/shared/lib";

interface Props {
  params: AnyParameter | null;
}

const ROUTE_MAP = {
  extrusion: PARAMS_ROUTES.EXTRUSION_PARAMS,
  varnish: PARAMS_ROUTES.VARNISH_PARAMS,
  offset: PARAMS_ROUTES.OFFSET_PARAMS,
  sealant: PARAMS_ROUTES.SEALANT_PARAMS,
} as const;

export function ParameterDetails({ params }: Props) {
  const router = useRouter();
  if (!params) return <div>No data</div>;
  const { type, data } = params;
  const postName = POST_NAMES[type];
  const summary = data?.summary;
  const createdAt = data?.parameters?.createdAt;
  const employee = data?.parameters?.employee?.name;
  const prev = data?.prev ?? null;
  const next = data?.next ?? null;

  const baseUrl = ROUTE_MAP[type];

  const onPrev = () => prev && router.replace(`${baseUrl}/${prev}`);
  const onNext = () => next && router.replace(`${baseUrl}/${next}`);

  const header = (
    <ParameterHeader
      data={summary}
      postName={postName}
      created={createdAt}
      employee={employee}
      onNext={next ? onNext : undefined}
      onPrev={prev ? onPrev : undefined}
      prev={prev}
      next={next}
    />
  );

  const renderDetail = () => {
    switch (type) {
      case "extrusion":
        return <ExtrusionDetail data={data ?? null} />;
      case "varnish":
        return <VarnishDetail data={data ?? null} />;
      case "offset":
        return <OffsetDetail data={data ?? null} />;
      case "sealant":
        return <SealantDetail data={data ?? null} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {header}
      {renderDetail()}
    </div>
  );
}
