import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const textSlides = [
    { title: "New Adventures", description: "If you like to travel, then this is for you! Here you can explore the beauty of the world." },
    { title: "Explore Nature", description: "Discover stunning landscapes and breathtaking views that refresh your soul." },
    { title: "Find Your Escape", description: "Travel to unseen places, meet new people, and create unforgettable memories." }
];

const SplashScreen = () => {
    const navigation = useNavigation<any>();
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % textSlides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' }}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>Get ready for</Text>
                    <Text style={styles.mainTitle}>{textSlides[currentSlide].title}</Text>
                    <Text style={styles.description}>{textSlides[currentSlide].description}</Text>

                    {/* Dot Indicators */}
                    <View style={styles.dotsContainer}>
                        {textSlides.map((_, index) => (
                            <View key={index} style={[styles.dot, currentSlide === index && styles.activeDot]} />
                        ))}
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Explore')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Let's Tour</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        height,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
        paddingBottom: 60,
        paddingHorizontal: 30,
    },
    textContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        marginBottom: 5,
        fontWeight: '400',
        letterSpacing: 0.5,
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '300',
    },
    dotsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: 'white',
        width: 15,
        height: 9,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 2,
        width: '70%',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SplashScreen;
