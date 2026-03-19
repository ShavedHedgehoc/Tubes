import Image from "next/image";

export function ImageCard({ url }: { url: string }) {
    return (
        <div className="flex items-center justify-center p-2 border rounded-md bg-muted/50 w-16 h-16 overflow-hidden">
            <Image
                src={url}
                alt="Product Image"
                width={64}
                height={64}
                className="object-cover transition-transform hover:scale-110"
            />
        </div>
    )

};
