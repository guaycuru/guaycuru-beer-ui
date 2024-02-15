import { DateTime } from 'luxon';
import { Product, ProductJSON } from './product.model';
import { Storage, StorageJSON } from './storage.model';

export abstract class ItemJSON {
  uuid: string;
  product: ProductJSON;
  storage: StorageJSON;
  quantity: number;
  expiry: string;
}

export class Item {
  uuid: string;
  product: Product;
  storage: Storage;
  quantity: number;
  expiry: DateTime;

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
      expiry: this.expiry?.toISODate(),
      product: this.product?.toJSON(),
      storage: this.storage?.toJSON()
    });
  }

  
  addQuantity(): void {
    if (this.quantity >= 0) {
      this.quantity++;
    }
  }

  reduceQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  get formattedExpiry(): string {
    return this.expiry?.toFormat('dd/MM/yyyy') ?? '';
  }
}
