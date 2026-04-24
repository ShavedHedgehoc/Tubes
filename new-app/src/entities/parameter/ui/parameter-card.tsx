import { cn } from "@/shared/lib";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

type ParameterCardVariants = "numeric" | "boolean";

export interface ParameterCardProps {
  title: string;
  variant: ParameterCardVariants;
  value?: number | null;
  booleanValue?: boolean | null;
  unit?: string | null;
  minValue?: number | null;
  maxValue?: number | null;
  stringDefaultValue?: string | null;
}

const getStatusColor = (props: ParameterCardProps) => {
  const { variant, value, minValue, maxValue, booleanValue } = props;

  if (variant === "numeric") {
    if (value === null || value === undefined) return "bg-yellow-500";
    if (typeof minValue === "number" && typeof maxValue === "number") {
      return value < minValue || value > maxValue
        ? "bg-red-500"
        : "bg-emerald-500";
    }
    return "bg-panel";
  }

  if (variant === "boolean") {
    if (booleanValue === null) return "bg-yellow-500";
    return booleanValue ? "bg-emerald-500" : "bg-red-500";
  }

  return "bg-panel";
};

export function ParameterCard(props: ParameterCardProps) {
  const {
    title,
    variant,
    value,
    minValue,
    maxValue,
    unit,
    booleanValue,
    stringDefaultValue,
  } = props;
  const hasLimits =
    typeof minValue === "number" && typeof maxValue === "number";
  const statusColor = getStatusColor(props);
  const isOptionalAndEmpty =
    variant === "numeric" &&
    !hasLimits &&
    (value === null || value === undefined || value === 0);
  console.log(value);

  return (
    <div>
      <Card className="h-full w-full min-h-42  shadow-none py-4 gap-2">
        <CardHeader className="py-0 pb-0 text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="flex  items-center justify-center ">
            <span
              className={cn(
                "font-bold tracking-tight leading-none text-center",
                isOptionalAndEmpty
                  ? "text-xl text-muted-foreground"
                  : "text-3xl",
                variant === "boolean" && "text-xl",
              )}
            >
              {variant === "numeric" &&
                (isOptionalAndEmpty ? "Внесение не требуется" : (value ?? "-"))}
              {variant === "boolean" &&
                (booleanValue === null
                  ? "-"
                  : booleanValue
                    ? "Соответствует"
                    : "Не соответствует")}
            </span>
            {!isOptionalAndEmpty && (
              <div className="w-0 flex flex-col justify-between h-[1.6em] items-start pl-2.5 self-center">
                <div
                  className={cn(
                    "h-2.5 w-2.5 rounded-full shrink-0",
                    statusColor,
                    "shadow-[0_0_8px_rgba(0,0,0,0.1)]",
                  )}
                />

                {variant === "numeric" && unit && (
                  <span className="text-[10px] text-muted-foreground leading-none whitespace-nowrap">
                    {unit}
                  </span>
                )}
              </div>
            )}
          </div>
          {variant === "numeric" && hasLimits && (
            <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-t  mt-4 pt-4">
              <LimitDisplay label="Минимум" value={minValue} />
              <Separator orientation="vertical" className="h-8 " />
              <LimitDisplay label="Максимум" value={maxValue} />
            </div>
          )}
          {variant === "boolean" && stringDefaultValue && (
            <div className="w-full border-t  mt-4 pt-3 text-center">
              <span className="text-lg  font-semibold">
                {stringDefaultValue}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function LimitDisplay({
  label,
  value,
}: {
  label: string;
  value: number | null | undefined;
}) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-lg font-semibold ">{value ?? "-"}</span>
      <span className="text-[10px]  uppercase leading-none">{label}</span>
    </div>
  );
}
