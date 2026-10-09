import { ToggleTheme } from "@/features/theme";
import { Layout } from "./_ui/layout";
import { Logo } from "./_ui/logo";
import { MainNav } from "./_ui/main-nav";
import { Profile } from "./_ui/profile";
import { Version } from "./_ui/version";

export function AppHeader({
  variant,
}: {
  variant: "auth" | "private" | "public";
}) {
  const isProfile = variant !== "auth";
  return (
    <Layout
      logo={isProfile && <Logo />}
      nav={isProfile && <MainNav />}
      profile={isProfile && <Profile />}
      ver={<Version />}
      actions={<ToggleTheme />}
    />
  );
}
