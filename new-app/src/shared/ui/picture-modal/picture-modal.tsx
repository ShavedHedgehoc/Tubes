import { X } from "lucide-react";
import { Button } from "../button";
import { Card } from "../card";
import { ModalLayout } from "../modal-layout";
import { cn } from "@/shared/lib";
import Image from "next/image";

interface PictureModalPros {
    title: string
    description: string
    isOpen: boolean
    onOpenChange: (val: boolean) => void
    src: string | null
}

export function PictureModal({ title, description, isOpen, onOpenChange, src }: PictureModalPros) {
    return (

        <ModalLayout
            title={title}
            description={description}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="sm:max-w-[95vw] w-full max-h-[95vh] p-4 "
        >
            <Card className="relative">
                <div className="absolute right-3 top-3 z-50">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-muted transition-colors "
                        onClick={() => onOpenChange(false)}
                    >
                        <X className="h-4 w-4 text-foreground" />
                        <span className="sr-only">Закрыть</span>
                    </Button>
                </div>
                <div
                    className={cn(
                        "relative w-full",
                        "aspect-video min-h-[500px] max-h-[85vh]",
                    )}
                >
                    {src && (
                        <Image
                            src={`/images/${src}`}
                            alt="Full view"
                            fill
                            unoptimized
                            className="object-contain"
                            priority
                        />
                    )}
                </div>
            </Card>
        </ModalLayout>
    )
}