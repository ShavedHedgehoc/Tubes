import { ValError } from "@/entities/summary";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, DataTable } from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";
import { X } from "lucide-react";



export function UploadErrorsForm({
    errors,
    onClose,

}: {
    errors: ValError[];
    onClose: () => void;

}) {
    const columns: ColumnDef<ValError>[] = [
        {
            accessorKey: "number",
            header: () => <div className="text-center px-6">Строка</div>,
            cell: ({ row }) => {
                return <div className="text-center px-6">{row.original.row}</div>;
            }
        },
        {
            accessorKey: "field",
            header: () => <div className="text-center px-6">Поле</div>,
            cell: ({ row }) => {
                return <div className="text-center px-6">{row.original.field}</div>;
            }
        },
        {
            accessorKey: "error",
            header: () => <div className="text-left px-6">Ошибка</div>,
            cell: ({ row }) => {
                return <div className="text-left px-6">{row.original.error}</div>;
            }
        },

    ]
    return (
        <Card className="w-full h-full px-3 border-0 overflow-hidden shadow-none sm:border relative flex flex-col flex-1">
            <div className="absolute right-3 top-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-muted transition-colors"
                    onClick={onClose}
                >
                    <X className="h-4 w-4 text-foreground" />
                    <span className="sr-only">Закрыть</span>
                </Button>
            </div>
            <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                    Ошибки валидации сводки
                </CardTitle>
                <CardDescription>
                    После просмотра ошибок исправьте файл и загрузите по новой
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 p-4 w-full overflow-hidden flex flex-col">
                <div className="h-full w-full overflow-y-auto pr-2">
                    <DataTable data={errors} columns={columns} />
                </div>
            </CardContent>

        </Card>
    )
}