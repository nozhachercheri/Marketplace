import http from "../../http-common";
class ProduitService {
  getAll() {
    return http.get("/getAllProduit");
  }
  // GetProduitWithCategorie(categorie) {
  //   return http.get("/getProduitWithCategorie", { params: { categorie } });
  // }
  getAllCategories() {
    return http.get("/getAllCategories");
  }
  getProduistWithCategorie(categorie) {
    return http.get("/getProduistWithCategorie",{ params: { categorie } });
  }
  getProduitWithArticleId(article_id) {
    return http.get("/getProduitWithArticleId",{ params: { article_id } });
  }
  getProduitWithArticleIds(similarItems) {
    return http.get("/getProduitWithArticleIds", { params: { similarItems: similarItems } });
  }
  getTailleOfProduit(produitId) {
    return http.get(`/getTaillesOfProduit/${produitId}`);
  }
  
  getCouleurOfPRoduit(produitId) {
    return http.get(`/getCouleursOfProduit/${produitId}`);
  }
  getAvisOfProduit(produitId) {
    console.log("produitId",produitId)
    return http.get(`/getAvisOfProduit/${produitId}`);
  }
   
 
}
export default new ProduitService();
