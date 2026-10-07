import Image from "next/image";

export function ImageCard({
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
      className="flex items-center justify-center p-2 border rounded-md bg-muted/50 w-16 h-16 overflow-hidden"
      onClick={onClick}
    >
      <Image
        src={url}
        alt={alt || "alt"}
        width={64}
        height={64}
        unoptimized
        className="object-cover transition-transform hover:scale-110"
      />
    </div>
  );
}
