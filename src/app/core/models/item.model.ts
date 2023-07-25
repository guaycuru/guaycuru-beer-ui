import { DateTime } from 'luxon';
import { Product, ProductJSON } from './product.model';
import { Storage, StorageJSON } from './storage.model';
import { format, parseISO } from 'date-fns';

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
             expiry: json.expiry
               ? format(parseISO(json.expiry), 'dd/MM/yyyy')
               : null,
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

         reduceQuantity(): void {
           if (this.quantity > 0) {
             this.quantity--;
           }
         }

         addQuantity(): void {
           if (this.quantity >= 0) {
             this.quantity++;
           }
         }
       }
