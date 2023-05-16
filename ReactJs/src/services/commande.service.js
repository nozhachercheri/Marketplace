import http from "../http-common";

class CommandeService {

  GetBoutiqueCommandeForConfirm = (id) => {
    return http.get(`/getBoutiqueCommandeForConfirm/${id}`);
  };
  GetFactureForProduit = (idC) => {
    return http.get(`/getFactureForProduit/${idC}`);
  };

  ConfirmCommandeFromBoutique = (idC) => {
   return  http.put(`/confirmCommandeFromBoutique/${idC}`);
  }

  DeleteCommande = (idC) => {
    return http.delete(`/deleteCommande/${idC}`);
  }


}
export default new CommandeService()

