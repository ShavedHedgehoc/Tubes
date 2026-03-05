export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex  flex-col  p-0 flex-1">
      {children}
    </main>
  );
}
