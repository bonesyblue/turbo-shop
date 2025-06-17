import { Image } from "./Image";

export type Category = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: Image;
};
