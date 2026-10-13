import { v4 as uuidv4 } from 'uuid';
import { formatDateToString, formatTimeToString } from './date-time-formatters';
import { Receiptconstants } from './receipt-constants';

const shiftLabels: Record<number, string> = {
  1: 'День',
  2: 'Ночь',
};

function parseCyrillicToURLEncoded(val: string) {
  const encodeURI = encodeURIComponent(val);
  const parsedEncodedURI = encodeURI.replaceAll('%', '_');
  return parsedEncodedURI;
}

export function makeBoxReceipt({
  name,
  code,
  batch,
  batchId,
  boxNumber,
  quantity,
  summaryId,
  employee,
  employeeId,
  shift,
  responsible,
}: {
  name: string;
  code: string;
  batch: string;
  batchId: number | null;
  boxNumber: number;
  quantity: number;
  summaryId: number | null;
  employee: string;
  employeeId: number | null;
  shift: number | null;
  responsible: string | null;
}) {
  const shiftText = shift ? (shiftLabels[shift] ?? '-') : '-';
  const date = new Date();
  const uuid = uuidv4();
  const parsedBrand = parseCyrillicToURLEncoded(Receiptconstants.BRAND);
  const parsedName = parseCyrillicToURLEncoded(name);
  const parsedBatch = parseCyrillicToURLEncoded(`Партия: ${batch}`);
  const parsedQuantity = parseCyrillicToURLEncoded(`Количество: ${quantity}`);
  const parsedBoxNumber = parseCyrillicToURLEncoded(`Номер короба: ${boxNumber}`);
  const parsedEmployee = parseCyrillicToURLEncoded(`Оператор: ${employee}`);
  const parsedResponsibleName = parseCyrillicToURLEncoded(`Ответственный: ${responsible ?? '-'}`);
  const parsedShift = parseCyrillicToURLEncoded(`Смена: ${shiftText}`);
  const parsedDate = parseCyrillicToURLEncoded(`Дата: ${formatDateToString(date)}`);
  const parsedTime = parseCyrillicToURLEncoded(`Время: ${formatTimeToString(date)}`);
  const qrCode = `${uuid}#${boxNumber}#${batchId}#${summaryId}#${employeeId}#${quantity}#${date.toISOString()}`;

  return `^XA^CI28^FO 20,20^GB760,560,1,B,0^FS^FO40,40 ^FB700,1,,C^A0N,20,20^FH^FD${parsedBrand}^FS
  ^FO40,80 ^FB700,3,,C^A0N,50,50^FH^FD${code}
  ^FS^FO40,150 ^FB700,3,6,L^A0N,30,30^FH^FD${parsedName}^FS
  ^FO40,260 ^FB700,1,,L^A0N,40,40^FH^FD${parsedBatch}^FS
  ^FO40,320 ^FB700,1,,L^A0N,40,40^FH^FD${parsedQuantity}^FS  
  ^FO40,380 ^FB700,1,,L^A0N,20,20^FH^FD${parsedBoxNumber}^FS
  ^FO40,410 ^FB700,1,,L^A0N,20,20^FH^FD${parsedEmployee}^FS
  ^FO40,440 ^FB700,1,,L^A0N,20,20^FH^FD${parsedResponsibleName}^FS
  ^FO40,470 ^FB700,1,,L^A0N,20,20^FH^FD${parsedShift}^FS
  ^FO40,500 ^FB700,1,,L^A0N,20,20^FH^FD${parsedDate}^FS
  ^FO40,530 ^FB700,1,,L^A0N,20,20^FH^FD${parsedTime}^FS
  ^FO590,380^BQ,2,4^FDQA,${qrCode}^FS
  ^PQ1^XZ`;
}
