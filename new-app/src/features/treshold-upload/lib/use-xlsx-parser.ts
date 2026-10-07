import { useState } from "react";
import { read, utils } from "xlsx";
import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import {
  tresholdsValidationSchema,
  TresholdUploadDataRow,
  TresholdUploadTableRow,
  ValError,
} from "@/entities/treshold";

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);
const parse = ajv.compile(tresholdsValidationSchema);

export function useXlsxParser() {
  const [errors, setErrors] = useState<ValError[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState<TresholdUploadDataRow[]>([]);
  const [isPending, setIsPending] = useState(false);

  const validate = async (file: File) => {
    return new Promise<boolean>((resolve) => {
      setIsPending(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (!result) return;
        const currentErrors: ValError[] = [];
        try {
          let json: TresholdUploadDataRow[] = [];
          const wb = read(result);
          wb.SheetNames.forEach((sheetName) => {
            const ws = wb.Sheets[sheetName];
            const tableJson = utils.sheet_to_json<TresholdUploadTableRow>(ws, {
              raw: false,
              range: 4,
            });
            const resultJson: TresholdUploadDataRow[] = tableJson.map(
              (item) => {
                return { ...item, conveyor_name: sheetName };
              },
            );
            json = [...json, ...resultJson];
          });
          if (json.length === 0) {
            setErrors([
              {
                row: 0,
                field: "file",
                error: "Файл не содержит данных или заполнен неверно",
              },
            ]);
            setIsValid(false);
            setIsPending(false);
            return resolve(false);
          }
          json.forEach((row, i) => {
            const isRowValid = parse(row);
            if (!isRowValid) {
              parse.errors?.forEach((err) => {
                currentErrors.push({
                  row: i + 6,
                  field: err.instancePath.substring(1),
                  error: err.message || "Ошибка",
                });
              });
            }
          });
          const hasErrors = currentErrors.length > 0;
          setErrors(currentErrors);
          setIsValid(!hasErrors);
          setData(hasErrors ? [] : json);
          setIsPending(false);
          resolve(!hasErrors);
        } catch (e) {
          console.error("XLSX Read Error", e);
          setIsValid(false);
          setIsPending(false);
          resolve(false);
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const reset = () => {
    setErrors([]);
    setIsValid(false);
    setData([]);
  };

  return { validate, errors, isValid, data, reset, isPending };
}
