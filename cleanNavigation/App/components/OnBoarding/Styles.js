import { StyleSheet,Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    item: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      width,
      height,
    },
    itemOverlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    image: {
      width,
      height,
      resizeMode: 'cover',
    },
    titleContainer: {
      position: 'absolute',
      alignItems: 'center',
      bottom: 60,
      zIndex: 1,
    },
    title: {
      fontSize: 22,
      color: '#fff',
      fontWeight:'bold'
    },
    
    buttonsContainer: {
      position: 'relative',
      bottom: -20,
      width:400,
     
     
    }
  });

  export default styles