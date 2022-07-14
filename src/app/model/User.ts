export class User {
  userId?: number;
  userName: string;
  userEmail: string;
  userPassword: string;
  userAadhar?: number;
  isAdmin: string;

  constructor() {
    this.userName = '';
    this.userEmail = '';
    this.userPassword = '';
    this.isAdmin = '';
  }
}
