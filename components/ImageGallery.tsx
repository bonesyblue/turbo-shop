import { useState } from "react";
import { Dimensions, FlatList, Image, Pressable, StyleSheet, View } from "react-native";

interface Props {
  images: string[];
}

const { width } = Dimensions.get("window");

export default function ImageGallery({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderThumbnail = ({ item, index }: { item: string; index: number }) => (
    <Pressable
      onPress={() => setActiveIndex(index)}
      style={[
        styles.thumbnail,
        activeIndex === index && styles.activeThumbnail,
      ]}
    >
      <Image source={{ uri: item }} style={styles.thumbnailImage} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: images[activeIndex] }}
        style={styles.mainImage}
        resizeMode="cover"
      />
      <FlatList
        data={images}
        renderItem={renderThumbnail}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.thumbnailList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  mainImage: {
    width: width,
    height: width,
  },
  thumbnailList: {
    padding: 16,
    gap: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeThumbnail: {
    borderColor: "#007AFF",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
});