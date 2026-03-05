export interface DataFormField<T = string> {
  key: T;
  value: string;
  values?: string[];
}
