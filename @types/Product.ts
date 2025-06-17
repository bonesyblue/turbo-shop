import { Image } from "./Image";

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: Image;
  images: Image[];
  price: {
    amount: number;
    currencyCode: string;
  };
};
