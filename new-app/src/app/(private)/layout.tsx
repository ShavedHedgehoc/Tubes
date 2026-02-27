// import AuthorizedGuard from "@/features/auth/authorized-guard";

import { AppHeader } from "@/app/_widgets/app-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader variant="private" />
      <main className="flex  flex-col  p-0 flex-1">
        {/* <AuthorizedGuard> */}

        {children}

        {/* </AuthorizedGuard> */}
      </main>
    </>
  );
}
