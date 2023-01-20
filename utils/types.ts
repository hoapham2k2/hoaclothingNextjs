// Product type
export type Product = {
  _id?: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImg1: string;
  productImg2: string;
  categories: Array<string>;
};
