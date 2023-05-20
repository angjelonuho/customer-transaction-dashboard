export enum ApiError {
  GENERIC = "generic",
  INVALID_CREDENTIALS = "invalid_credentials",
  UNAUTHORIZED = "unauthorized",
  VALIDATION = "validation",
  NOT_FOUND = "not_found",
  INVALID_ACCESS_TOKEN="invalid_token",
}

export type ApiResponce<DataType> = {
  success: boolean
  message: string
  data: DataType
}
