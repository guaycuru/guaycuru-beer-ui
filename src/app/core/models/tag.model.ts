import { EnumName, ServerEnum, ServerEnumList } from './server-enum.model';

export enum TagType {
  style,
  packaging
}

export const TagTypeList = new ServerEnumList<TagType, EnumName<TagType>>(TagType, {
  style: new EnumName(TagType.style, 'style', 'Style'),
  packaging: new EnumName(TagType.packaging, 'packaging', 'Packaging'),
});

export abstract class TagJSON {
  uuid: string;
  name: string;
  type: string;
}

export class Tag {
  uuid: string;
  name: string;
  type: ServerEnum<TagType>;

  static fromJSON(json: TagJSON): Tag {
    const entity = Object.create(Tag.prototype);
    return Object.assign(entity, json, {
      type: ServerEnum.fromOrNull(json.type, TagType)
    });
  }

  toJSON(): TagJSON {
    return Object.assign({}, this, {
      type: this.type?.rawValue
    });
  }
}
