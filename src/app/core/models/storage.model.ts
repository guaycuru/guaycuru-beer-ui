import { User, UserJSON } from './user.model';

export abstract class StorageJSON {
  uuid: string;
  name: string;
  owner: UserJSON;
}

export class Storage {
  uuid: string;
  name: string;
  owner: User;

  static fromJSON(json: StorageJSON): Storage {
    const entity = Object.create(Storage.prototype);
    return Object.assign(entity, json, {
      owner: json.owner ? User.fromJSON(json.owner) : null
    });
  }

  toJSON(): StorageJSON {
    return Object.assign({}, this, {
      owner: this.owner?.toJSON()
    });
  }
}
