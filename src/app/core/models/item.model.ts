import { DateTime } from "luxon";
import { Product, ProductJSON } from './product.model';
import { Storage, StorageJSON } from './storage.model';

export abstract class ItemJSON {
  uuid: string;
  name: string;
  expiry: string;
  product: ProductJSON;
  storage: StorageJSON;
}

export class Item {
  uuid: string;
  name: string;
  expiry: DateTime;
  product: Product;
  storage: Storage;

  static fromJSON(json: ItemJSON): Item {
    const entity = Object.create(Item.prototype);
    return Object.assign(entity, json, {
      expiry: json.expiry ? DateTime.fromISO(json.expiry) : null,
      product: json.product ? Product.fromJSON(json.product) : null,
      storage: json.storage ? Storage.fromJSON(json.storage) : null
    });
  }

  toJSON(): ItemJSON {
    return Object.assign({}, this, {
      expiry: this.expiry?.toISO(),
      product: this.product?.toJSON(),
      storage: this.storage?.toJSON()
    });
  }
}
