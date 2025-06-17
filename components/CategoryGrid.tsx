import { Category } from "@/@types/Category";
import { router } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  categories: Category[];
}

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 2;
const SPACING = 16;
const ITEM_WIDTH = (width - SPACING * (COLUMN_COUNT + 1)) / COLUMN_COUNT;

export default function CategoryGrid({ categories }: Props) {
  const handlePress = (category: Category) => {
    router.push({
      pathname: "/category/[id]",
      params: { id: category.id, title: category.title },
    });
  };

  return (
    <View style={styles.grid}>
      {categories.map((category) => (
        <Pressable
          key={category.id}
          style={styles.item}
          onPress={() => handlePress(category)}
        >
          <Image
            source={{ uri: category.image.url }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.overlay}>
            <Text style={styles.categoryName}>{category.title}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: SPACING,
    gap: SPACING,
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
    padding: 12,
  },
  categoryName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
