import { FileEntity } from "@/entities/file";
import { AddCell } from "./add-cell";
import { PreviewOtherCell } from "./preview-other-cell";
import { PreviewCell } from "./preview-cell";

import { useGalleryUiParams } from "../lib/use-gallery-ui-params";
import { DeleteCell } from "./delete-cell";

type PictureItem = {
  picture_record_id: number;
  picture_order: number;
  picture_file: FileEntity;
};

interface PicturesColumnProps {
  pictures: PictureItem[];
  maxCardsQuantity: number;
  entityId: number;
  onDelete: (fileId: number) => void;
}

export function PicturesColumn({
  pictures,
  maxCardsQuantity,
  entityId,
  onDelete,
}: PicturesColumnProps) {
  const visiblePictures = pictures.slice(0, maxCardsQuantity);
  const hiddenCount = pictures.length - maxCardsQuantity;
  const { setParams } = useGalleryUiParams();

  const openAddGallery = () => {
    setParams({ addGalleryEntityId: entityId });
    setParams({ addGalleryOpen: true });
  };

  const openPreview = (filename: string) =>
    setParams({ previewFileName: filename });

  return (
    <div className="flex flex-row gap-2 items-start">
      {visiblePictures.map((item) => (
        <PreviewCell
          key={item.picture_record_id}
          file={item.picture_file}
          onClick={() => openPreview(item.picture_file.filename)}
        />
      ))}
      <PreviewOtherCell hiddenCount={hiddenCount}>
        {pictures.slice(maxCardsQuantity).map((item) => (
          <PreviewCell
            key={item.picture_record_id}
            file={item.picture_file}
            onClick={() => openPreview(item.picture_file.filename)}
          />
        ))}
      </PreviewOtherCell>
      <AddCell onClick={openAddGallery} />
      <DeleteCell count={pictures.length}>
        {pictures.map((item) => (
          <PreviewCell
            key={item.picture_record_id}
            file={item.picture_file}
            onClick={() => onDelete(item.picture_file.id)}
          />
        ))}
      </DeleteCell>
    </div>
  );
}
