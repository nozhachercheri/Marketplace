import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import { AuthContext } from './context'
import Profile from './components/Profile/Profile'
import DetailsScreen from './components/Produits/ProduitDetails'
import Home2 from './components/Home/Home2'
import MyCart from './components/Home/MyCart'
import ProductInfo from './components/Home/ProductInfo'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Onboarding from './components/OnBoarding/OnBoarding'
import Produits from './components/Produits/Produits'
import MesCommandes from './components/Profile/MesCommandes/MesCommandes'
import ModifierPassowrd from './components/Profile/ModifierPassword/ModifierPassword'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
})

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
)

// export const HomeScreen = ({ navigation, route }) => (
//   <ScreenContainer>
//     <Home navigation={navigation} route={route} />
//   </ScreenContainer>
// )
export const ProduitsScreen = ({ navigation, route }) => (
  <ScreenContainer>
    <Produits navigation={navigation} route={route} />
  </ScreenContainer>
)
export const ProduitDetailsScreen = ({ navigation, route }) => (
  <ScreenContainer>
    <DetailsScreen navigation={navigation} route={route} />
  </ScreenContainer>
)

export const HomeScreen2 = ({ navigation, route }) => (
  <ScreenContainer>
    <Home2 navigation={navigation} route={route} />
  </ScreenContainer>
)
export const MyCartScreen = ({ navigation, route }) => (
  <ScreenContainer>
    <MyCart navigation={navigation} route={route} />
  </ScreenContainer>
)
export const ProductInfoScreen = ({ navigation, route }) => (
  <ScreenContainer>
    <ProductInfo navigation={navigation} route={route} />
  </ScreenContainer>
)
export const OnBoardingScreen = ({ navigation, route }) => (
  <ScreenContainer>
    <Onboarding navigation={navigation} route={route} />
  </ScreenContainer>
)

export const Search = ({ navigation }) => (
  <ScreenContainer>
    <Text>Search Screen</Text>
  </ScreenContainer>
)

export const Explore = () => (
  <ScreenContainer>
    <Text>Explore Screen</Text>
  </ScreenContainer>
)
export const ProfileScreen = ({ navigation,route }) => {
  return (
    <ScreenContainer>
      <Profile  navigation={navigation} route={route}  />
    </ScreenContainer>

  )
}
export const PassowrdChangeScreen = ({ navigation,route }) => {
  return (
    <ScreenContainer>
      <ModifierPassowrd  navigation={navigation} route={route}  />
    </ScreenContainer>

  )
}
export const MesCommandesScreen = ({ navigation,route }) => {
  return (
    <ScreenContainer>
      <MesCommandes  navigation={navigation} route={route}  />
    </ScreenContainer>

  )
}

export const Splash = () => (
  <ScreenContainer>
    <Text>Loading...</Text>
  </ScreenContainer>
)

export const SignIn = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext)

  return (
    <ScreenContainer>
      <Login navigation={navigation} />
    </ScreenContainer>
  )
}

export const CreateAccount = ({ navigation }) => {
  const { signUp } = React.useContext(AuthContext)

  return (
    <ScreenContainer>
      <Register navigation={navigation} />
    </ScreenContainer>
  )
}
