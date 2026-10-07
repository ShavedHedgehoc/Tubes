import { FileEntity } from "@/entities/file";
import { ImageCard } from "@/shared/ui";

export function PreviewCell({
  file,
  onClick,
}: {
  file: FileEntity;
  onClick: () => void;
}) {
  return (
    <ImageCard
      url={`/images/${file.filename}`}
      onClick={onClick}
      alt={file.filename}
    />
  );
}
