import { Category } from "@/@types/Category";
import { getCategories } from "@/services/CategoryService";
import { useEffect, useState } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch(console.error); // )
  }, []);

  return categories;
};
