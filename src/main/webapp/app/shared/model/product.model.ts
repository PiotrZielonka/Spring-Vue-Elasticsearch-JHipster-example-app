import { ProductCategoryEnum } from '@/shared/model/enumerations/product-category-enum.model';
export interface IProduct {
  id?: number;
  productCategoryEnum?: ProductCategoryEnum;
  name?: string;
  quantity?: number | null;
  priceNet?: number;
  vat?: number;
  priceGross?: number | null;
  stock?: number;
  description?: string;
  createTime?: Date | null;
  updateTime?: Date | null;
  imageContentType?: string;
  image?: string;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public productCategoryEnum?: ProductCategoryEnum,
    public name?: string,
    public quantity?: number | null,
    public priceNet?: number,
    public vat?: number,
    public priceGross?: number | null,
    public stock?: number,
    public description?: string,
    public createTime?: Date | null,
    public updateTime?: Date | null,
    public imageContentType?: string,
    public image?: string
  ) {}
}
