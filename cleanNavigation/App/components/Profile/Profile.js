import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import StyledButtons1 from "../StyledButton1/index";
import { AuthContext } from "../../context";
import authService from "../../services/auth.service";
import { useState, useEffect } from "react";

export default function Profile({ navigation,route }) {
  const { signOut } = React.useContext(AuthContext);
  const [user, setUser] = useState()
  const retrieveUser = () => {
    authService
      .GetCurrentUser()
      .then((data) => {
        setUser(JSON.parse(data))
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const clientId = user?.user?.id
  const [userInfos, setUserInfos] = useState([])
  const retrieveUserInfo = () => {
    authService
      .getClientInfos(clientId)
      .then((response) => {
        setUserInfos(response.data[0])
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    retrieveUser()
  }, [])
  useEffect(() => {
    retrieveUserInfo()
  }, [clientId])


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.active}></View>
          <View style={styles.add}>
            <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{user?.user?.login}</Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Client</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <StyledButtons1
              type="secondary"
              content={"Modifier mot de passe"}
              onPress={() => {
                navigation.navigate("PassowrdChange", {
                  clientId:clientId,
                });
              }}
            />
          </View>
          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
            <View style={styles.statsBox}>
              <StyledButtons1
                type="secondary"
                content={"Déconnexion"}
                onPress={() => signOut()}
              />
            </View>
          </View>
          <View style={styles.statsBox}>
            <View style={styles.statsBox}>
              <StyledButtons1
                type="secondary"
                content={"Mes commandes"}
                onPress={() => {
                  navigation.navigate("MesCommandes", {
                    clientId:clientId,
                  });
                }}
              />
            </View>
          </View>
        </View>

        {/* <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("./assets/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("./assets/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("./assets/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                    </ScrollView>
                    <View style={styles.mediaCount}>
                        <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
                        <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
                    </View>
                </View> */}
        <Text style={[styles.subText, styles.recent]}>Mes infos</Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                Email : {userInfos.email}
              </Text>
            </View>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
              Nom :  {userInfos.nom}
              </Text>
            </View>
          </View>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
              Prénom :  {userInfos.prenom}
              </Text>
            </View>
          </View>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
              Adresse :  {userInfos.adresse}
              </Text>
            </View>
          </View>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
              Télephone :  {userInfos.tel}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },
  text: {
    color: "#52575D",
    fontSize:20
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  subText: {
    fontSize: 25,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 120
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
  statsBox: {
    alignItems: "center",
    flex: 1
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1
  },
  recent: {
    marginLeft: 250,
    marginTop: 55,
    marginBottom: 55,
    fontSize: 15
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
  }
});