import ImageGallery from "@/components/ImageGallery";
import { Text, View } from "@/components/Themed";
import { useProduct } from "@/hooks/product";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

export type ScreenParams = {
  id: string;
  title?: string;
};

export default function ProductDetailsScreen() {
  const { id, title } = useLocalSearchParams<ScreenParams>();
  const navigation = useNavigation();
  const product = useProduct(id);

  const priceText = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: product?.price.currencyCode ?? "EUR",
  }).format(product?.price.amount ?? 0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [id, title]);

  return product ? (
    <ScrollView style={styles.container} bounces={false}>
      <ImageGallery images={product.images.map((image) => image.url)} />
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{priceText}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  ) : (
    <View style={styles.centered}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    padding: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#007AFF",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
});
