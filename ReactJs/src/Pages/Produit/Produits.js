import React, { useState } from 'react'
import Produit from './Produit'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProduitService from '../../services/produit.service';
export default function Produits() {


    const [produits, setProduits] = useState([])

    const retrieveProduits = () => {
        const currentUser = JSON.parse(localStorage.getItem('user'));

        ProduitService.getAllBoutiqueProduit(currentUser?.user?.id)
            .then((response) => {
                setProduits(response.data)
            })
            .catch((e) => {
                console.log(e);

            });
    };
    useEffect(() => {
        retrieveProduits();
    }, []);

    const Produits = produits.map(produit => <Produit key={produit.id} produit={produit} />)

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Mes produits</h4>

                            </div>
                        </div>
                    </div>
                    <div>
                        <h5 className="mb-4"></h5>
                        <div className="timeline-2">
                            <div className="timeline-continue">
                                {Produits}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

