import { isImageNode } from "./ImageNode";

export type CollectionNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: {
    id: string;
    url: string;
    width: number;
    height: number;
  };
};

export const isCollectionNode = (data: unknown): data is CollectionNode => {
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
    "image" in data &&
    isImageNode(data.image)
  );
};
