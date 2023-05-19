export enum ApiError {
  GENERIC = "generic",
  INVALID_CREDENTIALS = "invalid_credentials",
  UNAUTHORIZED = "unauthorized",
  VALIDATION = "validation",
  NOT_FOUND = "not_found",
}

export type ApiResponce<DataType> = {
  success: boolean;
  message: string;
  data: DataType;
};
