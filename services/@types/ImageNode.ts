export type ImageNode = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export const isImageNode = (data: unknown): data is ImageNode => {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    typeof data.id === "string" &&
    "url" in data &&
    typeof data.url === "string" &&
    "width" in data &&
    typeof data.width === "number" &&
    "height" in data &&
    typeof data.height === "number"
  );
};
