export const isNode = <T>(
  data: unknown,
  predicate: (node: unknown) => node is T
): data is { node: T } => {
  return (
    typeof data === "object" &&
    data !== null &&
    "node" in data &&
    predicate(data.node)
  );
};

export const isEdges = <T>(
  data: unknown,
  predicate: (node: unknown) => node is T
): data is { edges: Array<{ node: T }> } => {
  return (
    typeof data === "object" &&
    data !== null &&
    "edges" in data &&
    Array.isArray(data.edges) &&
    data.edges.some((edge) => isNode(edge, predicate))
  );
};
