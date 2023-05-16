
import React from 'react';

import {
    Animated,
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import StyledButton from '../StyledButton';
import styles from './Styles';

const { width, height } = Dimensions.get('window');
const items = [

    {
        id: 1,
        image: require('./Assets/shop1.jpg'),
        title: 'Meilleures boutiques',
    },
    {
        id: 2,
        image: require('./Assets/shop2.jpg'),
        title: 'Meilleurs plans',
    },
    {
        id: 3,
        image: require('./Assets/shop3.jpg'),
        title: 'Meilleurs produits',
    }
];

const Onboarding = ({ navigation }) => {
    const scrollAnimation = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.screen}>
            <StatusBar hidden />
            <Animated.FlatList
                data={items}
                bounces={false}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollAnimation } } }],
                    { useNativeDriver: true },
                )}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        width * (index - 0.5),
                        width * index,
                        width * (index + 0.5),
                    ];
                    return (
                        <View style={styles.item}>
                            <Animated.Image
                                source={item.image}
                                style={[
                                    styles.image,
                                    {
                                        transform: [
                                            {
                                                translateX: scrollAnimation.interpolate({
                                                    inputRange: [
                                                        width * (index - 1),
                                                        width * index,
                                                        width * (index + 1),
                                                    ],
                                                    outputRange: [-width * 0.5, 0, width * 0.5],
                                                }),
                                            },
                                        ],
                                    },
                                ]}
                            />
                            <Animated.View
                                style={[
                                    styles.titleContainer,
                                    {
                                        opacity: scrollAnimation.interpolate({
                                            inputRange,
                                            outputRange: [0, 1, 0],
                                        }),
                                        transform: [
                                            {
                                                translateX: scrollAnimation.interpolate({
                                                    inputRange,
                                                    outputRange: [250, 0, -250],
                                                }),
                                            },
                                        ],
                                    },
                                ]}>
                                <Text style={styles.title}>{item.title}</Text>
                                <View style={styles.buttonsContainer}>
                                    <StyledButton
                                        type="primary"
                                        content={"Se connecter"}
                                        onPress={() => navigation.navigate('SignIn')}
                                    />
                                </View>
                            </Animated.View>
                            <Animated.View
                                style={[StyleSheet.absoluteFillObject, styles.itemOverlay]}
                            />
                        </View>
                    );
                }}
            />
        </View>
    );
};



export default Onboarding;