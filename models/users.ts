// for functions (no id)
interface IUserData {
  username: string,
  password: string,
  email: string,
}

// extension for class definition with id
interface IUser extends IUserData {
  id: number,
}

class User implements IUser {
  public id: number;
  public username: string;
  public password: string;
  public email: string;

  constructor(
    id: number,
    username: string,
    password: string,
    email: string
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}

//user class data and methods handler
class UserModel {
  private users: User[] = [];

  protected createUser = ({ username, password, email }: IUserData): User | null => {
    const id = this.users.length;
    const newUser = new User(id, username, password, email);
    this.users.push(newUser);
    return newUser;
  }

  protected getUserById = (id: number): User | null => {
    return this.users.find(user => user.id === id) ?? null;
  }

  protected getUserByDetails = (username: string, password: string): User | null => {
    const user = this.users.find(user =>
      user.username === username && user.password === password
    ) ?? null;
    return user;
  }

  //made for future use
  protected updateUser = (id: number, updateFields: Partial<IUserData>): User | null => {
    const user = this.getUserById(id);
    const userIdx = this.users.findIndex(user => user.id === id);
    if (!user) return null;

    Object.assign(user, updateFields);
    this.users[userIdx] = user;
    return user;
  }

}

