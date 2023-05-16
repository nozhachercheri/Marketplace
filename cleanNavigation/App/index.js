import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AuthService from './services/auth.service'
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from './context'
import { Alert } from 'react-native-web'
import {
  SignIn,
  CreateAccount,
  Search,
  HomeScreen2,
  ProfileScreen,
  Splash,
  Explore,
  MyCartScreen,
  ProductInfoScreen,
  OnBoardingScreen,
  ProduitsScreen,
  ProduitDetailsScreen,
  MesCommandesScreen,
  PassowrdChangeScreen,
} from './Screens'

const AuthStack = createStackNavigator()
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name='OnBoarding'
      component={OnBoardingScreen}
      options={{ title: 'OnBoard', headerShown: false }}
    />
    <AuthStack.Screen
      name='SignIn'
      component={SignIn}
      options={{ title: 'Sign In', headerShown: false }}
    />
    <AuthStack.Screen
      name='CreateAccount'
      component={CreateAccount}
      options={{ title: 'Create Account' }}
    />
  </AuthStack.Navigator>
)

const Tabs = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const SearchStack = createStackNavigator()
const ExploreStack = createStackNavigator()

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name='Home'
      component={HomeScreen2}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name='Produits'
      component={ProduitsScreen}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name='ProduitDetails'
      component={ProduitDetailsScreen}
      options={{
        headerShown: false,
      }}
    />
   <HomeStack.Screen
      name='MyCart'
      component={MyCartScreen}
      options={{
        headerShown: false,
      }}
    />
      {/*
    <HomeStack.Screen
      name='ProductInfo'
      component={ProductInfoScreen}
      options={{
        headerShown: false,
      }}
    /> */}
  </HomeStack.Navigator>
)

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name='Search1'
      component={Search}
      options={{
        headerShown: false,
      }}
    />
  </SearchStack.Navigator>
)
const ExploreStackScreen = () => (
  <ExploreStack.Navigator>
    <ExploreStack.Screen
      name='forExplore'
      component={Explore}
      options={{
        headerShown: false,
      }}
    />
  </ExploreStack.Navigator>
)
const ProfileStack = createStackNavigator()
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name='myProfile'
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <ProfileStack.Screen
      name='MesCommandes'
      component={MesCommandesScreen}
      options={{
        headerShown: false,
      }}
    />
    <ProfileStack.Screen
      name='PassowrdChange'
      component={PassowrdChangeScreen}
      options={{
        headerShown: false,
      }}
    />
  </ProfileStack.Navigator>
)

const TabsScreen = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size }) => {
        if (route.name === 'Accueil') {
          return (
            <Entypo name="home" size={24} color="black" />
          )
        } else if (route.name === 'Recherche') {
          return (
            <AntDesign name="search1" size={24} color="black" />
          )
        } else if (route.name === 'Profil') {
          return (
            <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />
          )
        }
      },
      tabBarInactiveTintColor: 'gray',
      tabBarActiveTintColor: 'black',
    })}
  >
    <Tabs.Screen
      name='Accueil'
      component={HomeStackScreen}
      options={{
        headerShown: false,
      }}
    />
    <Tabs.Screen
      name='Recherche'
      component={SearchStackScreen}
      options={{
        headerShown: false,
      }}
    />
    <Tabs.Screen
      name='Profil'
      component={ProfileStackScreen}
      options={{
        headerShown: false,
      }}
    />
  </Tabs.Navigator>
)

const Drawer = createDrawerNavigator()
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName='Home'>
    <Drawer.Screen name='Home' component={TabsScreen} />
    <Drawer.Screen name='Profile' component={ProfileStackScreen} />
  </Drawer.Navigator>
)

const RootStack = createStackNavigator()
const RootStackScreen = ({ currentUser }) => (

  <RootStack.Navigator>
    {currentUser !== null ? (
      <RootStack.Screen
        name='App'
        component={TabsScreen}
        options={{
          animationEnabled: false,
          headerShown: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name='Auth'
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
          headerShown: false,
        }}
      />
    )}
  </RootStack.Navigator>
)


export default Lun = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: (email, motDePasse) => {
        setIsLoading(false)
        AuthService.Login(email, motDePasse)
          .then((response) => {
            setCurrentUser(response)
          })
          .catch(() => {
            setIsLoading(false)
            setCurrentUser(null)
            Alert.alert('erreur 404 ', ' Données incorrectes !!', [{ text: 'OK' }])
          })
      },
      signUp: (login,nom,prenom,adresse,tel,email,motDePasse ) => {
        AuthService.Register(login,nom,prenom,adresse,tel,email,motDePasse ).then(() => {
          Alert.alert('Succès', 'Vous avez été enregistré.', [{ text: 'OK' }])
          setIsLoading(false)
        
        })
          .catch(() => {
            setIsLoading(false)
            setUserToken(null)
          })
      },
      signOut: () => {
        setIsLoading(false);
        setCurrentUser(null);
      }
    };
  }, []);


  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen currentUser={currentUser} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
