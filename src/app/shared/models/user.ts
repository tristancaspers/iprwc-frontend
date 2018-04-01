export class UserModel {
  constructor (
    public id?: number,
    public email?: string,
    public password?: string,
    public name?: string,
    public role?: string
  ) {}
}
