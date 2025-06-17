import { Category } from "@/@types/Category";
import { STORE_API_URL } from "@/constants/Url";
import { fetch } from "expo/fetch";
import { isCollectionNode } from "./@types/CollectionNode";
import { isCollectionsResponse } from "./@types/Response";

export const getCategories = async (): Promise<Category[]> => {
  const count = 10; // Number of collections to fetch
  const query = `{
    collections(first: ${count}) {
      edges {
        node {
          id 
          handle
          title
          description
          image {
            id
            url
            width
            height
          }
        }
      }
    }
  }`;

  const url = `${STORE_API_URL}?query=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `f:getCategories ~ Error fetching categories: ${response.statusText}`
    );
  }

  const resp = await response.json();

  if (isCollectionsResponse(resp)) {
    return resp.data.collections.edges
      .map((edge) => edge.node)
      .filter(isCollectionNode)
      .map((collection) => ({
        id: collection.id,
        title: collection.title,
        slug: collection.handle,
        description: collection.description,
        image: {
          ...collection.image,
        },
      }));
  }

  throw new Error("f:getCategories ~ Received invalid category data");
};
