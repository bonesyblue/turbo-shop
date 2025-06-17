import { Product } from "@/@types/Product";
import { getProduct, getProductsByCategory } from "@/services/ProductService";
import { useEffect, useState } from "react";

export const useCategoryProducts = (categoryId: string, limit?: number) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductsByCategory(categoryId, limit)
      .then((data) => {
        setProducts(data);
      })
      .catch(console.error);
  }, []);

  return products;
};

export const useProduct = (productId: string) => {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    getProduct(productId)
      .then((data) => {
        setProduct(data);
      })
      .catch(console.error);
  }, []);

  return product;
};
