import { Brand, BrandJSON } from './brand.model';
import { Tag, TagJSON } from './tag.model';

export abstract class ProductJSON {
  uuid: string;
  name: string;
  brand: BrandJSON;
  tags: TagJSON[];
}

export class Product {
  uuid: string;
  name: string;
  brand: Brand;
  tags: Tag[];

  static fromJSON(json: ProductJSON): Product {
    const entity = Object.create(Product.prototype);
    return Object.assign(entity, json, {
      brand: json.brand ? Brand.fromJSON(json.brand) : null,
      tags: json.tags?.map((tag) => Tag.fromJSON(tag)) ?? []
    });
  }

  toJSON(): ProductJSON {
    return Object.assign({}, this, {
      brand: this.brand?.toJSON(),
      tags: this.tags?.map((tag) => tag.toJSON()) ?? []
    });
  }
}
