export class DisplayMessageModel{
  showSuccess : boolean;
  showError : boolean;
  success : string;
  error : string;
  operation: string

  constructor(showSuccess : boolean,success : string,showError : boolean,error : string, operation: string) {
    this.showSuccess = showSuccess;
    this.showError = showError;
    this.success = success
    this.error = error;
    this.operation = operation;
  }

}
