import { useCallback, useState } from "react";

type PaginationState = {
  page: number;
  limit: number;
};

export function usePagination(initialLimit: number) {
  const [state, setState] = useState<PaginationState>({
    page: 1,
    limit: initialLimit,
  });

  const nextPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  }, []);

  return {
    ...state,
    nextPage,
  };
}
