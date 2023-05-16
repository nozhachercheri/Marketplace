import http from "../../http-common";
class CommandeService {

  AddCommande(tailleId,couleurId,qty,clientId,produitId) {
    return http.post("/addCommande", {tailleId,couleurId,qty,clientId,produitId});
  }
  AllCommandeForClient(clientId) {
    return http.get(`/AllCommandeForClients/${clientId}`);
  }
  AllConfirmedCommandeForClient(clientId) {
    return http.get(`/AllConfirmedCommandeForClient/${clientId}`);
  }
  confirmAllCommandeProduits(clientId) {
    return http.put(`/confirmAllCommandeProduits/${clientId}`);
  }  
  DeletePendingCommande(idC) {
    return http.delete(`/DeletePendingCommande/${idC}`);
  }  
 
}
export default new CommandeService();
