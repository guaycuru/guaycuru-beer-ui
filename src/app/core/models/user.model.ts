export abstract class UserJSON {
  uuid: string;
  name: string;
  email: string;
  admin: boolean;
}

export class User {
  uuid: string;
  name: string;
  email: string;
  admin: boolean;

  static NAME_COMPARATOR = function(a: User, b: User): number {
    let aName = a.name ? a.name : '';
    let bName = b.name ? b.name : '';
    return aName.localeCompare(bName);
  };

  static fromJSON(json: UserJSON): User {
    const user = Object.create(User.prototype);
    return Object.assign(user, json, {});
  }

  toJSON(): UserJSON {
    return Object.assign({}, this, {});
  }
}
