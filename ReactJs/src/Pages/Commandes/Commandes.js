import React from 'react'
import CommandeService from '../../services/commande.service';
import Commande from './Commande';
import { useState, useEffect } from 'react';
export default function Commandes() {


    const [commandes, setCommandes] = useState([])
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const id = currentUser["user"]["id"]
    const retrieveCommandes = () => {
        CommandeService.GetBoutiqueCommandeForConfirm(id)
            .then((response) => {
                setCommandes(response.data)
            })
            .catch((e) => {
                console.log(e);

            });
    };
    useEffect(() => {
        retrieveCommandes();
    }, []);

    const Commandes = commandes.map(commande => <Commande key={commande.id} commande={commande} />)
    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Commandes à confirmer</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="listjs-table" id="customerList">
                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table
                                                className="table align-middle table-nowrap"
                                                id="customerTable"
                                            >
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>
                                                            Produit
                                                        </th>
                                                        <th>
                                                            Prix
                                                        </th>
                                                        <th>
                                                            Size
                                                        </th>
                                                        <th>
                                                            Couleur
                                                        </th>
                                                        <th>
                                                            Quantité
                                                        </th>
                                                        <th>
                                                            Prix total
                                                        </th>
                                                        <th>
                                                            Client
                                                        </th>
                                                        <th>
                                                            Etat
                                                        </th>
                                                        <th>
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {Commandes}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
