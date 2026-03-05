import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { Input } from "../input";


export interface ScanModalProps {
    title: string;
    open: boolean;
    setOpen: (val: boolean) => void;
    processInput: (val: string) => void;
}

export function ScanModal({ title, open, setOpen, processInput }: ScanModalProps) {
    const [inputField, setInputField] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const clearInput = () => setInputField("");

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            processInput(inputField);
            setOpen(false);
            clearInput();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-muted-foreground">{title}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Input
                        ref={inputRef}
                        type="text"
                        className="text-muted-foreground focus-visible:ring-muted-foreground"
                        value={inputField}
                        onChange={(e) => setInputField(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        autoFocus // В shadcn/Radix это обычно достаточно для автофокуса
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
