import { View, Text, Pressable } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Icons from "@expo/vector-icons/MaterialIcons"
import { useTheme } from "@react-navigation/native"
import Animated from "react-native-reanimated"

const CustomBottomTabs = props => {
  const { colors } = useTheme()
  return (
    <SafeAreaView edges={["bottom"]} style={{ backgroundColor: colors.card }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16
        }}
      >
        {props.state.routes.map((route, i) => {
          const isActive = i == props.state.index
          return (
            <TabItem
              key={i}
              isActive={isActive}
              routeName={route.name}
              navigation={props.navigation}
            />
          )
        })}
      </View>
    </SafeAreaView>
  )
}
const TabItem = ({ routeName, isActive, navigation }) => {
    const { colors } = useTheme()
  
    const onTap = () => {
      navigation.navigate(routeName)
    }
  
    return (
      <Pressable
        onPress={onTap}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          paddingVertical: 8
        }}
      >
        <Animated.View
          style={[
            {
              width: 36,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 32,
              backgroundColor: isActive ? colors.primary : "transparent"
            }
          ]}
        >
          <Icons
            name={
              routeName === "Home"
                ? "home"
                : routeName === "Cart"
                ? "shopping-cart"
                : routeName === "Payment"
                ? "account-balance-wallet"
                : "person"
            }
            size={24}
            color={isActive ? colors.card : colors.text}
            style={{
              opacity: isActive ? 1 : 0.5
            }}
          />
        </Animated.View>
        {isActive && (
          <Text
            style={{
              marginLeft: 4,
              fontSize: 12,
              fontWeight: "600",
              color: colors.text
            }}
          >
            {routeName}
          </Text>
        )}
      </Pressable>
    )
  }
  
export default CustomBottomTabs
