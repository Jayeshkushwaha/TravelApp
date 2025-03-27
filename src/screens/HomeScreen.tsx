import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

const categories = ['All', 'Mountain', 'Beach', 'Camp'];

const featuredDestinations = [
  {
    id: '1',
    title: 'Lake Braies',
    location: 'Italy',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1470114716159-e389f8712fda',
  },
  {
    id: '2',
    title: 'Santorini',
    location: 'Greece',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8',
  },
];

const exploreMoreDestinations = [
  {
    id: '3',
    title: 'Bali',
    location: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206',
    users: [
      'https://randomuser.me/api/portraits/men/1.jpg',
      'https://randomuser.me/api/portraits/women/2.jpg',
      'https://randomuser.me/api/portraits/men/3.jpg',
    ],
    userCount: '12K',
  },
  {
    id: '4',
    title: 'Soneva Jani',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={styles.headerContainer}>
        <View style={styles.iconWrapper}>
          <Icon name="menu" size={28} color="#333" />
        </View>
        <View style={styles.iconWrapper}>
          <Icon name="notifications-outline" size={28} color="#333" />
          <View style={styles.notificationBadge} />
        </View>
      </View>

      <Text style={styles.header}>Explore the world!</Text>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
        <Icon
          name="options-outline"
          size={20}
          color="#999"
          style={styles.filterIcon}
        />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoriesContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.featuredSection}>
        <FlatList
          data={featuredDestinations}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.featuredCard}
              onPress={() =>
                navigation.navigate('DestinationDetail', { destination: item })
              }
            >
              <View style={styles.featuredInfo}>
                <Image source={{ uri: item.image }} style={styles.featuredImage} />
                <View style={styles.star}>
                  <View>
                    <Text style={styles.featuredTitle}>{item.title}</Text>
                    <Text style={styles.featuredLocation}>
                      <Icon name="location-outline" size={14} color="#666" />{' '}
                      {item.location}
                    </Text>
                  </View>
                  <Text style={styles.featuredRating}>⭐ {item.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
        <Text style={styles.sectionTitle}>Explore more</Text>
        <Text style={[styles.sectionTitle, { color: '#0A453E' }]}>See all</Text>
      </View>
      <FlatList
        data={exploreMoreDestinations}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.exploreCard} onPress={() =>
            navigation.navigate('DestinationDetail', { destination: item })
          }>
            <Image source={{ uri: item.image }} style={styles.exploreImage} />
            <View style={styles.exploreInfo}>
              <Text style={styles.exploreTitle}>{item.title}</Text>
              <Text style={styles.exploreLocation}>
                <Icon name="location-outline" size={14} color="#666" />{' '}
                {item.location}
              </Text>
              {item.users && (
                <View style={styles.userContainer}>
                  {item.users.map((user, index) => (
                    <Image
                      key={index}
                      source={{ uri: user }}
                      style={[
                        styles.userAvatar,
                        {
                          zIndex: item.users.length - index,
                          marginLeft: index > 0 ? -10 : 0,
                        },
                      ]}
                    />
                  ))}
                  <Text style={styles.userCount}>+{item.userCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 0,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  filterIcon: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7,
    marginHorizontal: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
    borderColor: '#C2C2C2',
    borderWidth: 1,
  },
  selectedCategoryButton: {
    backgroundColor: '#0A453E',
  },
  categoryText: {
    color: '#C9C9C9',
  },
  selectedCategoryText: {
    color: 'white',
  },
  featuredSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredCard: {
    marginLeft: 17,
    borderRadius: 15,
    backgroundColor: 'white',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  featuredImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  featuredInfo: {
    padding: 7,
  },
  star: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featuredLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  featuredRating: {
    fontSize: 14,
  },
  seeAllText: {
    color: '#0A453E',
    fontSize: 14,
    fontWeight: 'bold',
  },
  exploreCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 7,
    marginBottom: 5,
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  exploreImage: {
    width: 130,
    height: 100,
    borderRadius: 7,
    marginRight: 10,
  },
  exploreInfo: {
    justifyContent: 'center',
  },
  exploreTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end'
  },
  exploreLocation: {
    fontSize: 14,
    color: '#666',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  userAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
  },
  userCount: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 12,
    right: 15,
    backgroundColor: 'red',
    borderRadius: 5,
    width: 9,
    height: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;