"use client";

import {
    Button,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/shared/ui";
import {
    MoreHorizontal,
    // Pencil, 
    Trash
} from "lucide-react";
import { useDeleteFile } from "../model";


export function RowDropdown({ id }: { id: number; }) {

    const { deleteFile, deletePending } = useDeleteFile();

    const handleDeleteClick = () => deleteFile(id);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem onClick={handleEditClick}>
            <Pencil />
            Изменить
          </DropdownMenuItem>
          
          <DropdownMenuSeparator /> */}
                    <DropdownMenuItem
                        variant={"destructive"}
                        onClick={handleDeleteClick}
                        disabled={deletePending}
                    >
                        <Trash />
                        Удалить
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
