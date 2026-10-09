import pkg from "@@/package.json";
export function Version() {
  return (
    <span className="text-[9px] font-mono font-normal text-muted-foreground bg-muted/60 px-1 py-0.2 rounded border border-border/40 select-none ml-auto">
      v{pkg.version}
    </span>
  );
}
