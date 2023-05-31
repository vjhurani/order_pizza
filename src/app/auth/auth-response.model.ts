export class AuthResponse {
  constructor(

    private access_token: string,
    private expirationDate: Date
  ) {}

  get token() {

    if(!this.expirationDate || new Date() >  this.expirationDate){
      return null;
    }
    return this.access_token;
  }
}
