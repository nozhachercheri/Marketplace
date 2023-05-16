import React, { useState } from "react";
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
import * as Animatable from "react-native-animatable";
import { AuthContext } from "../../context";
import { ScrollView } from "react-native";

export default function Register({ navigation }) {
    const { signUp } = React.useContext(AuthContext);
    const {
        register,
        setValue,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            nom: "",
            prenom: "",
            adresse: "",
            tel: "",
            email: "",
            motDePasse: "",

        },
    });
    const navigationToLogin = () => {
        navigation.navigate("SignIn")
    }
    const onSubmit = (data) => {
        // console.log(data);
        return  (
        signUp(data.login,data.nom,data.prenom,data.adresse,data.tel,data.email,data.motDePasse)
      (navigationToLogin())
        )
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
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            height: Dimensions.get("screen").height,
                            width: Dimensions.get("screen").width,
                        }}>
                        <View style={styles.authBox}>

                            <Animatable.Text
                                style={styles.loginTitleText}
                                animation="fadeInUp"
                                delay={800}
                            >
                                S'inscrire
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
                                <Text style={styles.inputLabel}>Nom d'utilisateur</Text>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={(value) => onChange(value)}
                                            value={value}
                                            placeholder="Nom d'utilisateur"
                                            keyboardType="default"
                                            textContentType="name"
                                        />
                                    )}
                                    name="login"
                                    rules={{ required: true }}
                                />
                                {errors.login && <Text> Input Required</Text>}
                            </View>

                            <View style={styles.inputBox}>
                                <Text style={styles.inputLabel}>Nom</Text>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={(value) => onChange(value)}
                                            value={value}
                                            placeholder="Nom"
                                            keyboardType="default"
                                            textContentType="name"
                                        />
                                    )}
                                    name="nom"
                                    rules={{ required: true }}
                                />
                                {errors.nom && <Text> Input Required</Text>}
                            </View>


                            <View style={styles.inputBox}>
                                <Text style={styles.inputLabel}>Prénom</Text>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={(value) => onChange(value)}
                                            value={value}
                                            placeholder="Prénom"
                                            keyboardType="default"
                                            textContentType="name"
                                        />
                                    )}
                                    name="prenom"
                                    rules={{ required: true }}
                                />
                                {errors.prenom && <Text> Input Required</Text>}
                            </View>

                            <View style={styles.inputBox}>
                                <Text style={styles.inputLabel}>Adresse</Text>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={(value) => onChange(value)}
                                            value={value}
                                            placeholder="Adresse"
                                            keyboardType="default"
                                            textContentType="name"
                                        />
                                    )}
                                    name="adresse"
                                    rules={{ required: true }}
                                />
                                {errors.adresse && <Text> Input Required</Text>}
                            </View>

                            <View style={styles.inputBox}>
                                <Text style={styles.inputLabel}>Téléphone</Text>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={(value) => onChange(value)}
                                            value={value}
                                            placeholder="Téléphone"
                                            keyboardType="number-pad"
                                            textContentType="name"
                                        />
                                    )}
                                    name="tel"
                                    rules={{ required: true }}
                                />
                                {errors.tel && <Text> Input Required</Text>}
                            </View>
                            <View style={styles.inputBox}>
                                <Text style={styles.inputLabel}>Mot de passe</Text>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            placeholder="mot de passe"
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
                                <Text style={styles.loginButtonText}>S'inscrire</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.push("SignIn")}>
                                <Text style={styles.registerText}>
                                    Vous avez déjà un compte? S'identifier
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );
}
