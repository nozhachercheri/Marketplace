import React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from "expo-constants";
import styles from "./Styles";
import { useState } from "react";
// npm install react-native-animatable
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";

import { AuthContext } from "../../context";
import { ActivityIndicator, ImageBackground } from "react-native-web";
export default function Login({ navigation }) {
  const { signIn } = React.useContext(AuthContext);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      motDePasse: ""

    },
  });
  const onSubmit = (data) => {
    console.log(data);
    return signIn(data.email, data.motDePasse);
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log("errors", errors);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            <View style={styles.logoBox}>
              {/* <Image
                style={styles.image}
                source={require("../../assets/logo2.png")}
              /> */}
            </View>
            <Animatable.Text
              style={styles.loginTitleText}
              animation="fadeInUp"
              delay={800}
            >
              Se conneter
            </Animatable.Text>
            <View style={styles.hr}></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Email</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="Email"
                    keyboardType="email-address"
                    textContentType="name"
                  />
                )}
                name="email"
                rules={{ required: true }}
              />
              {errors.email && <Text> Input Required</Text>}
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Mot de passe</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    secureTextEntry={!showLoginPassword}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    textContentType="password"
                  />

                )}
                name="motDePasse"
                rules={{ required: true }}
              />
              {errors.email && <Text> Input Required</Text>}
              <TouchableOpacity
                style={{ paddingVertical: 4 }}
                onPress={() => {
                  setShowLoginPassword(!showLoginPassword);
                }}
              >
                <Text>{showLoginPassword ? "Masquer le mot de passe" : "Afficher mot de passe"}</Text>
              </TouchableOpacity>
              {errors.password && <Text> Input Required</Text>}
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.loginButtonText}>Connexion</Text>
              {/* <ActivityIndicator size='small' color='#fff'/> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push("CreateAccount")}>
              <Text style={styles.registerText}>
                Je n'ai pas de compte ? S'inscrire     </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}