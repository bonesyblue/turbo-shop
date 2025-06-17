import { isEdges } from "./Edge";
import { ImageNode, isImageNode } from "./ImageNode";

export type ProductVariant = {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
};

export const isProductVariant = (data: unknown): data is ProductVariant => {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    typeof data.id === "string" &&
    "title" in data &&
    typeof data.title === "string" &&
    "price" in data &&
    typeof data.price === "object" &&
    data.price !== null &&
    "amount" in data.price &&
    typeof data.price.amount === "string" &&
    "currencyCode" in data.price &&
    typeof data.price.currencyCode === "string"
  );
};

export type ProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: ImageNode;
  images: {
    edges: Array<{
      node: ImageNode;
    }>;
  };
  variants: {
    edges: Array<{ node: ProductVariant }>;
  };
};

export const isProductNode = (data: unknown): data is ProductNode => {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    typeof data.id === "string" &&
    "handle" in data &&
    typeof data.handle === "string" &&
    "title" in data &&
    typeof data.title === "string" &&
    "description" in data &&
    typeof data.description === "string" &&
    "featuredImage" in data &&
    isImageNode(data.featuredImage) &&
    "images" in data &&
    isEdges(data.images, isImageNode) &&
    "variants" in data &&
    isEdges(data.variants, isProductVariant)
  );
};
