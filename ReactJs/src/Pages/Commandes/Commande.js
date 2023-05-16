import React from 'react'
import CommandeService from '../../services/commande.service'
import { useNavigate } from 'react-router-dom'
export default function Commande({ commande }) {

    const handleEdit = () => {
        CommandeService.ConfirmCommandeFromBoutique(commande.idC)
            .then((response) => {
                window.location.reload(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleDelete = () => {
        CommandeService.DeleteCommande(commande.idC)
            .then((response) => {
                window.location.reload(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const naviagte = useNavigate()
    const navigateToFacture = () => {
        naviagte("/Facture/"+commande.idC)
    }
    const prixTotal = commande.qty * commande.prix
    return (
        <tr>
            <td >{commande.produit}</td>
            <td >{commande.prix}</td>
            <td >{commande.nomT}</td>
            <td >{commande.nomC}</td>
            <td >{commande.qty}</td>
            <td >{prixTotal}</td>
            <td >
                {commande.Client}
            </td>
            {commande.etat == 1 ? (
                <td >
                    <span className="badge badge-soft-danger text-uppercase">
                        En attente
                    </span>
                </td>) : (<td >
                    <span className="badge badge-soft-success text-uppercase">
                        Confirmé
                    </span>
                </td>)}

            <td>
                {commande.etat == 1 ? (<div className="d-flex gap-2">
                    <div className="edit">
                        <button
                            className="btn btn-sm btn-success edit-item-btn"
                            onClick={handleEdit}
                        >
                            confirmer
                        </button>
                    </div>

                    <div className="remove">
                        <button
                            className="btn btn-sm btn-danger remove-item-btn"
                            onClick={handleDelete}>
                            Supprimer
                        </button>
                    </div>
                </div>) : (<button
                    className="btn btn-sm btn-success edit-item-btn"
                    onClick={navigateToFacture}
                >
                    Facture de ce produit
                </button>)}

            </td>
        </tr>
    )
}
