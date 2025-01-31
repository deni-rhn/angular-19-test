export class Result<T> {
  status?: string;
  message?: string;
  messages?: string[];
  sumPage?: number;
  unauthorized?: boolean;
  data?: T;
  allData?: number;
  saldo?: number;
  metaData?: {
    limit: number;
    offset: number;
    pages: number;
    total: number;
  };
}
