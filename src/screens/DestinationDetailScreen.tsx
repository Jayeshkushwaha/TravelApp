import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RouteParams {
  params: {
    destination: {
      image: string;
      title: string;
      location: string;
      price?: string;
      rating?: string;
      description: string;
      users?: string[];
      userCount?: number;
    };
  };
}

const DestinationDetailScreen = ({ route }: { route: RouteParams }) => {
  const navigation = useNavigation<any>();
  const { destination } = route.params;
  const [currentImage, setCurrentImage] = useState(destination.image);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Description');

  const likeKey = `destination_like_${destination.title}`;

  useEffect(() => {
    const loadLikeStatus = async () => {
      try {
        const value = await AsyncStorage.getItem(likeKey);
        if (value !== null) {
          setIsLiked(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error loading like status:', error);
      }
    };

    loadLikeStatus();
  }, [likeKey]);

  const toggleLike = async () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);

    try {
      if (newLikeStatus) {
        await AsyncStorage.setItem(`destination_like_${destination.title}`, JSON.stringify(destination));
      } else {
        await AsyncStorage.removeItem(`destination_like_${destination.title}`);
      }
    } catch (error) {
      console.error('Error saving like status:', error);
      setIsLiked(!newLikeStatus);
    }
  };

  const galleryImages = [
    destination.image,
    'https://images.unsplash.com/photo-1566438480900-0609be27a4be',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
  ];

  const handleBookNow = () => Alert.alert('Success', 'Booked Successfully');
  const handleReadMore = () => Alert.alert('Read More', 'Full description coming soon!');

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: currentImage }} style={styles.mainImage} />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
          <Icon
            name={isLiked ? 'heart' : 'heart-outline'}
            size={30}
            color={isLiked ? '#FF6347' : 'black'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryContainer}>
          {galleryImages.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => setCurrentImage(image)}>
              <Image
                source={{ uri: image }}
                style={[styles.galleryImage, currentImage === image && styles.selectedGalleryImage]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.title}>{destination.title}</Text>
            <View style={styles.locationRow}>
              <Icon name="location-outline" size={20} color="#888" />
              <Text style={styles.locationText}>{destination.location}</Text>
            </View>
          </View>
          <View style={styles.priceRatingRow}>
            <Text style={styles.price}>{destination.price || '$120.50'}/person</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={20} color="#FFD700" />
              <Text style={styles.ratingText}>{destination.rating || '4.7'}</Text>
            </View>
          </View>
        </View>

        {destination.users && (
          <View style={styles.userContainer}>
            {destination.users.map((user, index) => (
              <Image
                key={index}
                source={{ uri: user }}
                style={[
                  styles.userAvatar,
                  {
                    zIndex: (destination.users ?? []).length - index,
                    marginLeft: index > 0 ? -10 : 0,
                  },
                ]}
              />
            ))}
            <Text style={styles.userCount}>+{destination.userCount}</Text>
          </View>
        )}

        <View style={styles.tabContainer}>
          {['Description', 'Review'].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
              <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText} numberOfLines={6}>
            {destination.description}Bali is the only Hindu-majority province in Indonesia, with 86.9% of the population adhering to Balinese Hinduism. It is renowned for its highly developed arts, including traditional and modern dance, sculpture, painting, leather, metalworking, and music. The Indonesian International Film Festival is held every year in Bali.
            <Text style={styles.readMoreText} onPress={handleReadMore}> READ MORE</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: 400,
  },
  selectedGalleryImage: {
    borderColor: '#0A453E',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 15,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 8,
  },
  likeButton: {
    position: 'absolute',
    bottom: 40,
    right: 15,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 8,
  },
  infoContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 30,
    marginTop: -25,
    padding: 20,
  },
  galleryContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  galleryImage: {
    width: 80,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 5,
  },
  priceRatingRow: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A453E',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
  },
  userCount: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
    marginRight: 20,
  },
  selectedTabText: {
    color: 'black',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
  readMoreText: {
    color: '#0A453E',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bookButton: {
    margin: 20,
    paddingVertical: 15,
    backgroundColor: '#0A453E',
    borderRadius: 30,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DestinationDetailScreen;
