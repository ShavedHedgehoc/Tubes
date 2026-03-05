import { notFound } from "next/navigation";

export default function ExtrusionRootPage() {
    // Если зашли в корень /extrusion, сразу показываем 404
    notFound();
}