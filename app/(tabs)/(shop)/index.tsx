import { ScrollView, StyleSheet } from 'react-native';

import CategoryGrid from '@/components/CategoryGrid';
import { Text, View } from '@/components/Themed';
import { useCategories } from '@/hooks/category';

export default function ShopScreen() {
  const categories = useCategories();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Find what you're looking for</Text>
      </View>
      <CategoryGrid categories={categories} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  
});
