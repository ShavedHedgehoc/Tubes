"use client";

import { HedgehogIcon } from "@/shared/assets";
import Link from "next/link";

export function Logo() {
  return (
    <Link className="flex items-center space-x-4" href="/">
      <HedgehogIcon />
    </Link>
  );
}
