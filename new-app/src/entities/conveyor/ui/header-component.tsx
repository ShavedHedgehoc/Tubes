interface HeaderComponentProps {
  conveyorName: string;
  postName: string;
}

export function HeaderComponent({
  conveyorName,
  postName,
}: HeaderComponentProps) {
  return (
    <div className="flex h-full w-full items-center justify-center ">
      <h1 className="text-2xl font-bold tracking-tight text-muted-foreground lg:text-2xl">
        Конвейер {conveyorName}. {postName}
      </h1>
    </div>
  );
}
