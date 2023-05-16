import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from "react-native"
import React, { useCallback, useRef, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@react-navigation/native"
import Icons from "@expo/vector-icons/MaterialIcons"
import MasonryList from "reanimated-masonry-list"
import { BlurView } from "expo-blur"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProduitService from "../../services/produit.service"
import { useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import authService from "../../services/auth.service"
// const CATEGORIES = [
//   "Clothing",
//   "Shoes",
//   "Accessories",
//   "Accessories 2",
//   "Accessories 3",
//   "Accessories 4"
// ]

const AVATAR_URL =
  "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"

const MESONARY_LIST_DATA = [
  {
    id: 789,
    imageUrl:
      "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80",
    title: "PUMA Everyday Hussle",
    price: 160
  },
  {
    id: 456,
    imageUrl:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 180
  },
  {
    id: 123,
    imageUrl:
      "https://images.unsplash.com/photo-1556217477-d325251ece38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1020&q=80",
    title: "PUMA Everyday Hussle",
    price: 200
  },
  {
    id: 789,
    imageUrl:
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 180
  },
  {
    id: 456,
    imageUrl:
      "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 120
  },
  {
    id: 789,
    imageUrl:
      "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80",
    title: "PUMA Everyday Hussle",
    price: 160
  },
  {
    id: 456,
    imageUrl:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 180
  },
  {
    id: 123,
    imageUrl:
      "https://images.unsplash.com/photo-1556217477-d325251ece38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1020&q=80",
    title: "PUMA Everyday Hussle",
    price: 200
  },
  {
    id: 789,
    imageUrl:
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 180
  },
  {
    id: 456,
    imageUrl:
      "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 120
  },
  {
    id: 789,
    imageUrl:
      "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80",
    title: "PUMA Everyday Hussle",
    price: 160
  },
  {
    id: 456,
    imageUrl:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 180
  },
  {
    id: 123,
    imageUrl:
      "https://images.unsplash.com/photo-1556217477-d325251ece38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1020&q=80",
    title: "PUMA Everyday Hussle",
    price: 200
  },
  {
    id: 789,
    imageUrl:
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 180
  },
  {
    id: 456,
    imageUrl:
      "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 120
  }
]




const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const [categoryIndex, setCategoryIndex] = useState(0)
  const bottomSheetModalRef = useRef(null)

  const openFilterModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const [categories, setCategories] = useState([])
  const retriveCategories = () => {
    ProduitService.getAllCategories()
      .then((response) => {
        setCategories(response.data)
      })
      .catch((e) => {
        console.log(e);

      });
  };
  useEffect(() => {
    retriveCategories();
  }, []);


  const IMAGE_MAPPING = {
    // "Title 1": require("./path/to/image1.png"),
    'Accessories': require("../../assets/images/Accessories.jpg"),
    'Garment Full body': require("../../assets/images/GarmentFullbody.jpg"),
    'Garment Lower body': require("../../assets/images/GarmentLowerbody.jpg"),
    'Garment Upper body': require("../../assets/images/GarmentUpperbody.jpg"),
    'Items': require("../../assets/images/items.jpg"),
    'Nightwear': require("../../assets/images/Nightwear.jpg"),
    'Shoes': require("../../assets/images/Shoes.jpg"),
    'Socks & Tights': require("../../assets/images/socks.jpg"),
    'Swimwear': require("../../assets/images/Swimwear.jpg"),
    'Underwear': require("../../assets/images/Underwear.jpg"),
    'Underwear/nightwear': require("../../assets/images/Underwearnghtwear.jpg"),
  };

  const [user, setUser] = useState()
  const retrieveUser = () => {
    authService
      .GetCurrentUser()
      .then((data) => {
        setUser(JSON.parse(data))
        console.log('CurrentUserId :',  user.id)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  
  useEffect(() => {
    retrieveUser()
  }, [])
  

  return (
    <ScrollView style={{ width: '100%', }}>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        {/* Header Section */}
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginTop: 20
          }}
        >
          {/* <Image
            source={{
              uri: AVATAR_URL
            }}
            style={{ width: 52, aspectRatio: 1, borderRadius: 52 }}
            resizeMode="cover"
          /> */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 8,
                color: colors.text
              }}
              numberOfLines={1}
            >
              Hi, {user?.user?.login} 👋
            </Text>
            <Text
              style={{ color: colors.text, opacity: 0.75 }}
              numberOfLines={1}
            >
              Découvrez la mode qui correspond à votre style
            </Text>

          </View>
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
            // onPress={() => navigation.navigate('MyCart')}
            onPress={() => {
              navigation.navigate("MyCart", {
                clientId: user?.user?.id,
              });
            }}
          >
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 30,
                padding: 15
              }}
            />
          </TouchableOpacity>

        </View>
        <View style={{ paddingHorizontal: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 50
            }}
          >
            <Text
              style={{ marginTop: 15, fontSize: 30, fontWeight: "700", color: colors.text }}
            >
              Choisir avec catégorie
            </Text>
          </View>
          <MasonryList
            data={categories}
            numColumns={2}
            contentContainerStyle={{ paddingHorizontal: 6 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <View style={{ padding: 6, marginTop: 25 }}>
                <TouchableOpacity
                  style={{
                    aspectRatio: i === 0 ? 1 : 2 / 3,
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onPress={() => {
                    navigation.navigate("Produits", {
                      categorie: item.product_group_name,
                    });
                  }}
                >
                  <Image
                    source={IMAGE_MAPPING[item.product_group_name]}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <View
                    style={[
                      StyleSheet.absoluteFill,
                      {
                        padding: 12
                      }
                    ]}
                  >
                    <View style={{ flexDirection: "row", gap: 8, padding: 4 }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 20,
                          fontWeight: "600",
                          color: "#fff",
                          textShadowColor: "rgba(0,0,0,0.8)",
                          textShadowOffset: {
                            height: 1,
                            width: 0
                          },
                          textShadowRadius: 4
                        }}
                      >
                       {item.product_group_name}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 50,
                        fontWeight: "600",
                        textShadowColor: "rgba(0,0,0,0.8)",
                        textShadowOffset: {
                          height: 1,
                          width: 0
                        },
                        textShadowRadius: 4,
                        color: "#fff",
                        marginLeft: 8
                      }}
                      numberOfLines={1}
                    >
                      {/* ${item.price} */}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            onEndReachedThreshold={0.1}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default HomeScreen

const Card = ({ price, imageUrl, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        borderRadius: 24
      }}
    >
      <Image
        source={{
          uri: imageUrl
        }}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}
      />
    </TouchableOpacity>
  )
}
