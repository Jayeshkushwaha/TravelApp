import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, StatusBar, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

interface LikedDestination {
  title: string;
  image: string;
  location: string;
}

const LikeScreen = () => {
  const [likedDestinations, setLikedDestinations] = useState<LikedDestination[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchLikedDestinations = async () => {
        try {
          const allKeys = await AsyncStorage.getAllKeys();
          const likeKeys = allKeys.filter(key => key.startsWith('destination_like_'));

          const likedItems = await AsyncStorage.multiGet(likeKeys);
          const destinations: LikedDestination[] = likedItems
            .map(([_, value]) => (value ? JSON.parse(value) : null))
            .filter(Boolean); // Remove null values

          setLikedDestinations(destinations);
        } catch (error) {
          console.error('Error fetching liked destinations:', error);
        }
      };

      fetchLikedDestinations();
    }, [])
  );

  const renderItem = ({ item }: { item: LikedDestination }) => (
    <View style={styles.itemContainer}>
      <FastImage source={{ uri: item.image, priority: FastImage.priority.high }} style={styles.itemImage} resizeMode={FastImage.resizeMode.cover} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.locationRow}>
          <Icon name="location-outline" size={16} color="#888" />
          <Text style={styles.itemLocation}>{item.location}</Text>
        </View>
      </View>
      <Icon name="heart" size={24} color="#FF6347" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Text style={styles.header}>Liked Destinations</Text>

      {likedDestinations.length > 0 ? (
        <FlatList
          data={likedDestinations}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="heart-outline" size={50} color="#888" />
          <Text style={styles.emptyText}>No liked destinations yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 0,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 20,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLocation: {
    fontSize: 14,
    color: '#888',
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    marginTop: 15,
  },
});

export default LikeScreen;
