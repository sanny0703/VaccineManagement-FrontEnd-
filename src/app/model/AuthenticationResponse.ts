export class AuthenticationResponse {
  jwt: string;
  emailAddress: string;
  id?: number;
  constructor() {
    this.jwt = '';
    this.emailAddress = '';
  }
}
