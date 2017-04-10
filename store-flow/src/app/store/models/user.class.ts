export class User {
  constructor(
    public email: string,
    public isLogged: boolean,
    public token: string) {}
}
