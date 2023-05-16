import http from "../http-common";

class UserService {

  getAllBoutiques = () => {
    return http.get("/allBoutiques");
  };
  updatePwdBoutique = (oldmotDePasse,newmotDePasse,id) => {
    return http.put("/updatePwd",{oldmotDePasse,newmotDePasse,id})
  };
  addBoutique = (formData) => {

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    http.post(
      "/signup-boutique",
      formData,
      config
    );
  }
  DeleteBoutique(id) {
    return http.delete(`/deleteBoutique/${id}`);
  }
  updateBoutiqueInfos = (formData) => {
    return http.put(`/updateBoutiqueInfos`,formData)
  };
  getBoutiqueInfos = (id) => {
    console.log(id)
    return http.get(`/getBoutiqueInfos/${id}`);
  };

}
export default new UserService()

