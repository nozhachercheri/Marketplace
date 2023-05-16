import http from "../http-common";

class ProduitService {

  getAllBoutiqueProduit = (id) => {
    return http.get(`/getAllBoutiqueProduit/${id}`);
  };
  getAvisOfProduit = (produitId) => {
    return http.get(`/getAvisOfProduit/${produitId}`);
  };
  getTaillesOfProduit = (produitId) => {
    return http.get(`/getTaillesOfProduit/${produitId}`);
  };
  getCouleursOfProduit = (produitId) => {
    return http.get(`/getCouleursOfProduit/${produitId}`);
  };
  getAllCategories = () => {
    return http.get(`/getAllCategories`);
  };
  getProduit = (id) => {
    return http.get(`/getProduit/${id}`);
  };
  AddProduit = (formData) => {

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    return http.post(
      "/addProduit",
      formData,
      config
    );
  }
  updateProduit = (formData, id) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    http.put(
      `/updateProduit/${id}`,
      formData,
      config
    );
  }
  DeleteProduit(id) {
    return http.delete(`/deleteProduit/${id}`);
  }

}
export default new ProduitService()

