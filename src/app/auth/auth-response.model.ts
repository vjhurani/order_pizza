export class AuthResponse {
  constructor(

    private access_token: string
  ) {}

  get token() {

    return this.access_token;
  }
}
