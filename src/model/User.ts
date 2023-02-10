export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string
  ) { }

    public getId() {
      return this.id
    }

    public getPassword() {
      return this.password
    }
}
