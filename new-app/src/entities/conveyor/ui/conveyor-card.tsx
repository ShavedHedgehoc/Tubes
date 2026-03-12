import { Card } from "@/shared/ui";
import { ConveyorData, POST_NAMES } from "../model";
import PostCard from "./post-card";
import { formatNumber } from "@/shared/lib";

type Props = {
  conveyorData: ConveyorData;
  menuActionButton: React.ReactNode;
  menuPermission: boolean;
};

export default function ConveyorCard({
  conveyorData,
  menuActionButton,
  menuPermission,
}: Props) {
  const postsConfig = [
    {
      id: 1,
      title: "Пост 1",
      name: POST_NAMES["extrusion"],
      data: conveyorData.summary?.extrusion,
    },
    {
      id: 2,
      title: "Пост 2",
      name: POST_NAMES["varnish"],
      data: conveyorData.summary?.varnish,
    },
    {
      id: 3,
      title: "Пост 3",
      name: POST_NAMES["offset"],
      data: conveyorData.summary?.offset,
    },
    {
      id: 4,
      title: "Пост 4",
      name: POST_NAMES["sealant"],
      data: conveyorData.summary?.sealant,
    },
  ];
  return (
    <Card className="flex flex-col justify-between p-6 gap-6 bg-muted/30 shadow-none border h-full relative">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-black tracking-tight">
            {conveyorData.name}
          </h2>
          {menuPermission && menuActionButton}
        </div>

        {conveyorData.summary ? (
          <div>
            <div className="space-y-1 text-sm flex w-full justify-between font-semibold text-foreground">
              <p className="font-semibold text-xs">
                {`${conveyorData.summary.product_code} ${conveyorData.summary.product_name}`}
              </p>
              <p>{conveyorData.summary.batch_name}</p>
            </div>
            <div className="space-y-1 text-sm flex w-full justify-between text-muted-foreground ">
              <p>
                <span>План: </span>
                <span className="text-foreground font-bold">
                  {formatNumber(conveyorData.summary.plan)}
                </span>
              </p>
              <p>
                <span>Смена: </span>
                <span className="text-foreground font-bold">
                  {conveyorData.summary.shift === 1
                    ? "День"
                    : conveyorData.summary.shift === 2
                      ? "Ночь"
                      : "-"}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-muted-foreground  px-4 py-2  whitespace-nowrap">
            Нет активной записи сводки
          </div>
        )}
      </div>
      {conveyorData.summary ? (
        <div className="flex flex-row gap-3 h-40">
          {postsConfig.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              productionValue={post.data?.productionValue ?? 0}
              employee={post.data?.employeeName ?? ""}
              state={post.data?.postState ?? "no_data"}
              summary_id={conveyorData.summary!.id}
              post_id={post.id}
              post_name={post.name}
              closePermission={menuPermission ?? true}
            />
          ))}
        </div>
      ) : (
        <div
          className="h-40 mt-auto opacity-0 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </Card>
  );
}
