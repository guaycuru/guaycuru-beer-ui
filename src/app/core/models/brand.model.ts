export abstract class BrandJSON {
  uuid: string;
  name: string;
}

export class Brand {
  uuid: string;
  name: string;

  static fromJSON(json: BrandJSON): Brand {
    const entity = Object.create(Brand.prototype);
    return Object.assign(entity, json, {
    });
  }

  toJSON(): BrandJSON {
    return Object.assign({}, this, {
    });
  }
}
