// src/shared/ui/select-image-card.tsx
import Image from "next/image";

export function SelectImageCard({
  url,
  alt,
  onClick,
}: {
  url: string;
  alt?: string;
  onClick?: () => void;
}) {
  return (
    <div
      // Оставляем w-32 h-32, так как в вашей среде это работает лучше всего
      className="relative w-32 h-32 border rounded-lg bg-muted/50 overflow-hidden cursor-pointer shrink-0"
      onClick={onClick}
    >
      <Image
        src={url}
        alt={alt || "img"}
        fill
        unoptimized
        className="object-cover transition-transform hover:scale-110"
      />
    </div>
  );
}
