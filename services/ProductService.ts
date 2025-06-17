import { Product } from "@/@types/Product";
import { STORE_API_URL } from "@/constants/Url";
import { fetch } from "expo/fetch";
import { isImageNode } from "./@types/ImageNode";
import { isProductNode } from "./@types/ProductNode";
import {
  isCollectionsProductResponse,
  isProductResponse,
} from "./@types/Response";

export const getProductsByCategory = async (
  categoryId: string,
  limit = 20
): Promise<Product[]> => {
  const query = `{
    collection(id: "${categoryId}") {
      products(first: ${limit}) {
        edges {
          node {
            id
            handle
            title
            description
            featuredImage {
              id
              url
              width
              height
            }
            images(first: 5) {
              edges {
                node {
                  id
                  url
                  width
                  height
                }
              }
            } 
            variants(first: 3) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }     
          }
        }
      }
    } 
  }`;

  const url = `${STORE_API_URL}?query=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `f:getProductsByCategory ~ Error fetching products: ${response.statusText}`
    );
  }

  const resp = await response.json();

  if (isCollectionsProductResponse(resp)) {
    return resp.data.collection.products.edges
      .map((edge) => edge.node)
      .filter(isProductNode)
      .map<Product>((data) => {
        const [productVariant] = data.variants.edges;
        return {
          id: data.id,
          slug: data.handle,
          title: data.title,
          description: data.description,
          thumbnail: data.featuredImage,
          images: data.images.edges
            .map((imageEdge) => imageEdge.node)
            .filter(isImageNode),
          price: {
            amount: parseFloat(productVariant?.node.price.amount ?? 0),
            currencyCode: "EUR",
          },
        };
      });
  }

  throw new Error("f:getProductsByCategory ~ Received invalid product data");
};

export const getProduct = async (productId: string): Promise<Product> => {
  const query = `{
    product(id: "${productId}") {
      id
      handle
      title
      description
      featuredImage {
        id
        url
        width
        height
      }
      images(first: 5) {
        edges {
          node {
            id
            url
            width
            height
          }
        }
      } 
      variants(first: 3) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
          }
        }
      }    
    } 
  }`;

  const url = `${STORE_API_URL}?query=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `f:getProduct ~ Error fetching products: ${response.statusText}`
    );
  }

  const resp = await response.json();

  if (isProductResponse(resp)) {
    const [productVariant] = resp.data.product.variants.edges;

    return {
      ...resp.data.product,
      slug: resp.data.product.handle,
      thumbnail: resp.data.product.featuredImage,
      images: resp.data.product.images.edges
        .map((imageEdge) => imageEdge.node)
        .filter(isImageNode),
      price: {
        amount: parseFloat(productVariant?.node.price.amount ?? 0),
        currencyCode: "EUR",
      },
    };
  }

  throw new Error("f:getProduct ~ Received invalid product data");
};
