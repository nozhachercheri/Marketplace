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
import { ScrollView } from "react-native";
import authService from "../../../services/auth.service";

export default function ModifierPassowrd({ navigation, route }) {
    let { clientId } = route.params;
    const {
        setValue,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            oldmotDePasse: "",
            newmotDePasse: "",
            id: clientId
        },
    });

    const navigateToProfil = () => {
        navigation.navigate("myProfile")
    }
    const handleChangePassword = (oldmotDePasse, newmotDePasse,clientId) => {
        authService.ChangePassowrd(oldmotDePasse, newmotDePasse,clientId)
            .then((response) => {
            console.log("pwd update")
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const onSubmit = (data) => {
        return  (
            handleChangePassword(data.oldmotDePasse,data.newmotDePasse,data.id)
            (navigateToProfil())
        )
    };
    const onChange = (arg) => {
        return {
            value: arg.nativeEvent.text,
        };
    };

    console.log("errors", errors);
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showOldPassowrd, setShowOldPassowrd] = useState(false);
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.centerizedView}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            // height: Dimensions.get("screen").height,
                            width: Dimensions.get("screen").width *0.9,
                        }}>

                        <View style={styles.inputBox}>
                            <Text style={styles.inputLabel}>Mot de passe actuel</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        onBlur={onBlur}
                                        onChangeText={(value) => onChange(value)}
                                        value={value}
                                        secureTextEntry={!showOldPassowrd}
                                        placeholder="Mot de passe actuel"
                                        keyboardType="default"
                                        textContentType="name"
                                    />
                                )}
                                name="oldmotDePasse"
                                rules={{ required: true }}
                            />
                            <TouchableOpacity
                                style={{ paddingVertical: 4 }}
                                onPress={() => {
                                    setShowOldPassowrd(!showOldPassowrd);
                                }}
                            >
                                <Text>{showOldPassowrd ? "Masquer le mot de passe" : "Afficher mot de passe"}</Text>
                            </TouchableOpacity>
                            {errors.oldmotDePasse && <Text> Input Required</Text>}
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.inputLabel}>Nouveau mot de passe</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        onBlur={onBlur}
                                        onChangeText={(value) => onChange(value)}
                                        value={value}
                                        placeholder="Nouveau mot de passe"
                                        secureTextEntry={!showLoginPassword}
                                        keyboardType="default"
                                        textContentType="name"
                                    />
                                )}
                                name="newmotDePasse"
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
                            {errors.newmotDePasse && <Text> Input Required</Text>}
                        </View>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={styles.loginButtonText}>Changer mot de passe</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );
}
