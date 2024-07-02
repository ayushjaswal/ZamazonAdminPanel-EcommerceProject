import { path } from "../variables";

export interface CategoriesProperties {
  propertyName: string;
  propertyValue: string | string[];
  parent: boolean
}

export interface CategoriesFormData {
  _id?: string;
  CategoryName: string;
  ParentCategory?: CategoriesFormData | string;
  Properties: CategoriesProperties[];
}

export interface AuthState {
  email: string;
  name: string;
  profile: string;
}

export interface ProductImage {
  id: string;
  imageName: string;
  imageUrl: string;
}

export interface ProductFormData {
  productName: string;
  productDescription: string;
  category?: string | null;
  images: ProductImage[];
  price: number;
  properties?: object[];
  _id?: string;
}

export const config = {
  host: `${path}`,
  headers: {
    "Access-Control-Allow-Origin": `${path}`,
  },
  withCredentials: true,
};
