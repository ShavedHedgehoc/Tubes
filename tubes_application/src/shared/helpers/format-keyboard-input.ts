export const formatKeyboardInput = (current: string, input: string): string => {
    if (input === "." && current.includes(".")) return current;
    if (current.length >= 9) return current;
    if (current === "" && input === ".") return "0.";
    if (current === "0" && input === "0") return current;
    if (current === "0" && input !== "." && input !== "0") return input;
    return current + input;
};