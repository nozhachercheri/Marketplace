import http from '../../http-common'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Register = (login,nom,prenom,adresse,tel,email,motDePasse ) => {
  return http.post('/signup-client', {login,nom,prenom,adresse,tel,email,motDePasse })
}
const Login = async (email, motDePasse) => {
  const response = await http.post('/signin', {email,motDePasse})
  if (response.data) {
    const xdata= JSON.stringify(response.data)
    await AsyncStorage.setItem('user', xdata)
  }
  return response.data
}
const Logout = () => {
  AsyncStorage.removeItem('user')
}

const GetCurrentUser = () => {
  return AsyncStorage.getItem('user')
}


const getClientInfos = (clientId) =>{
  return http.get(`/getClientInfos/${clientId}`);
}
const ChangePassowrd = async (oldmotDePasse, newmotDePasse,clientId) => {
  return http.put('/updatePwdClient', {oldmotDePasse, newmotDePasse,clientId})
}
export default {
  Register,
  Login,
  Logout,
  GetCurrentUser,
  getClientInfos,
  ChangePassowrd
}