import { read, utils } from "xlsx";

export const parseXlsxFile = async <T>(file: File): Promise<T[]> => {
  const data = await file.arrayBuffer();
  const wb = read(data);
  const ws = wb.Sheets[wb.SheetNames[0]];
  return utils.sheet_to_json<T>(ws, { raw: false });
};
