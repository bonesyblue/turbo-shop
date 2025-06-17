import { CollectionNode, isCollectionNode } from "./CollectionNode";
import { isEdges } from "./Edge";
import { isProductNode, ProductNode } from "./ProductNode";

export type CollectionsResponse = {
  data: {
    collections: {
      edges: Array<{
        node: CollectionNode;
      }>;
    };
  };
};

export const isCollectionsResponse = (
  data: unknown
): data is CollectionsResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "data" in data &&
    typeof data.data === "object" &&
    data.data !== null &&
    "collections" in data.data &&
    isEdges(data.data.collections, isCollectionNode)
  );
};

export type CollectionsProductResponse = {
  data: {
    collection: {
      products: {
        edges: Array<{ node: ProductNode }>;
      };
    };
  };
};

export const isCollectionsProductResponse = (
  data: unknown
): data is CollectionsProductResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "data" in data &&
    typeof data.data === "object" &&
    data.data !== null &&
    "collection" in data.data &&
    typeof data.data.collection === "object" &&
    data.data.collection !== null &&
    "products" in data.data.collection &&
    isEdges(data.data.collection.products, isProductNode)
  );
};

export type ProductResponse = {
  data: {
    product: ProductNode;
  };
};

export const isProductResponse = (data: unknown): data is ProductResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "data" in data &&
    typeof data.data === "object" &&
    data.data !== null &&
    "product" in data.data &&
    isProductNode(data.data.product)
  );
};
