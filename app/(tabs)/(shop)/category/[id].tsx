import { ScrollView, StyleSheet } from "react-native";

import ProductTile from "@/components/ProductTile";
import { View } from "@/components/Themed";
import { usePagination } from "@/hooks/pagination";
import { useCategoryProducts } from "@/hooks/product";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export type ScreenParams = {
  id: string;
  title?: string;
};

export default function CategoryDetailsScreen() {
  const { id, title } = useLocalSearchParams<ScreenParams>();
  const navigation = useNavigation();
  const { limit } = usePagination(20);
  const products = useCategoryProducts(id, limit);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productContainer}>
        {products.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 8,
  },
});
