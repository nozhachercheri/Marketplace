import http from "../http-common";

class AuthService {

  // register = (nom_prenom, email, password, tel, cin) => {
  //   return http.post("/signup-citoyen", {nom_prenom, email, password, tel, cin});
  // };
  
  LoginFunc = async (email, motDePasse) => {
    const response = await http.post("/signin", {email,motDePasse});
    localStorage.setItem("user", JSON.stringify(response.data));
  };
}
export default new AuthService()

