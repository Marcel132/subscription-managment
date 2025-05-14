export interface ResponseHandler {
  responseState: boolean,
  responseMessage: string | null,
  errorState: boolean,
  errorMessage: string | null,
  isLoading: boolean,
  isLoadingMessage: string | null
}
