export abstract class BaseResponse {
  protected mErrorCode: string;
  get errorCode(): string {
    return this.mErrorCode;
  }

  protected mErrorMessage: string;
  get errorMessage(): string {
    return this.mErrorMessage;
  }

  public init(responseJson: any) {
    this.mErrorCode = responseJson!.error_code!;
    this.mErrorMessage = responseJson!.error_message!;
  }
}
