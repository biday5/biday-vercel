import {SizeModel} from "@/model/product/size.model";

export interface ProductModel {
    id: number;
    brand: string;
    category: string;
    name: string;
    subName?: string;
    productCode: string;
    price: number;
    color: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    wishes:number;
    sizes: SizeModel[];
}
export type ProductDictionary = { [key: string]: ProductModel; };


