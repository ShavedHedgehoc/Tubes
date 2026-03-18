export type FileEntity = {
    id: number;
    filename: string;
    path: string;
};

export type FilesResponse = {
    files: FileEntity[];
    total: number;
    totalPages: number;
};