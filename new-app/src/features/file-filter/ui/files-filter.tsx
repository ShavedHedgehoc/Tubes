"use client";



type Props = {
    actions?: React.ReactNode;
};

export function FilesFilter({ actions }: Props) {
    return (
        <div className="flex  mb-4 justify-between">
            <div className="flex justify-start gap-2">
                <div className="flex flex-row">

                </div>

            </div>
            {actions}
        </div>
    );
}
