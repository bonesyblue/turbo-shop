import { Product } from "@/@types/Product";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  product: Product;
};

export default function ProductTile({ product }: Props) {
  const router = useRouter();
  const [thumbnail] = product.images;
  const priceText = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: product?.price.currencyCode ?? "EUR",
  }).format(product?.price.amount ?? 0);

  const onPress = () => {
    router.push({
      pathname: "/product/[id]",
      params: { id: product.id, title: product.title },
    });
  };

  return (
    <TouchableOpacity style={[styles.card, styles.gridCard]} onPress={onPress}>
      <Image
        source={{ uri: thumbnail.url }}
        style={[styles.image, styles.gridImage]}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>{priceText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: 8,
  },
  gridCard: {
    width: "45%", // Accounts for margin
    aspectRatio: 0.7,
  },
  image: {
    backgroundColor: "#f5f5f5",
  },
  gridImage: {
    width: "100%",
    aspectRatio: 1,
  },
  details: {
    padding: 12,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
});
