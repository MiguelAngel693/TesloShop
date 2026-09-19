import { User } from "@/auth/interfaces/user";

export interface ProductResponse {
  count:    number;
  pages:    number;
  products: ProductElement[];
}

export interface ProductElement {
  id:          string;
  title:       string;
  price:       number;
  description: string;
  slug:        string;
  stock:       number;
  sizes:       Size[];
  gender:      string;
  tags:        string[];
  images:      string[];
  user: User;
}

export enum Size {
  L = "L",
  M = "M",
  S = "S",
  Xl = "XL",
  Xs = "XS",
  Xxl = "XXL",
}


