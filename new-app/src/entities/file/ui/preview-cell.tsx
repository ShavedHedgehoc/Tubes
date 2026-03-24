import { FileEntity, useFileUiParams } from "@/entities/file";
import { ImageCard } from "@/shared/ui";

export function PreviewCell({ file }: { file: FileEntity }) {
  const { setParams } = useFileUiParams();
  if (!file.filename) return <div className="w-10 h-10 bg-gray-100 rounded" />;

  const handleClick = () => {
    if (file.filename) {
      setParams({ "view-file": file.filename });
    }
  };

  return (
    <ImageCard
      url={`/images/${file.filename}`}
      onClick={handleClick}
      alt={file.filename}
    />
  );
}
