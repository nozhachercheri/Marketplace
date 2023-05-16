import React from 'react'
import { useState } from 'react';
import ProduitService from '../../../services/produit.service';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function ModifierProduit() {
    var { id } = useParams();
    const navigate = useNavigate()
    const [produit, setProduit] = useState([]);
    const [formData, setFormData] = useState({
        nom: '',
        prix: '',
        size: '',
        categorie: '',
        desc: '',
    });

    const retrieveProduit = () => {
        ProduitService.getProduit(id)
            .then((response) => {
                setProduit(response.data[0])
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveProduit();
    }, []);

    useEffect(() => {
        setFormData({
            nom: produit.nom,
            prix: produit.prix,
            size: produit.size,
            categorie: produit.categorie,
            desc: produit.desc,
        });
    }, [produit]);

    console.log(formData);
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    const navigateToProduits = () => {
        navigate("/")
        window.location.reload(false)
      
      }
    const handleFileInputChange = (event) => {
        setFormData({ ...formData, image: event.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { nom, prix, size, desc, categorie, image } = formData;
        const data = new FormData();
        data.append('nom', nom);
        data.append('prix', prix);
        data.append('size', size);
        data.append('categorie', categorie);
        data.append('desc', desc);
        data.append('image', image);
        try {
            const response = await ProduitService.updateProduit(formData, id);
      
            navigateToProduits()
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Modifier Produit</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="nom">
                                                Nom
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nom"
                                                placeholder="Entrer nom"
                                                name='nom'
                                                value={formData.nom}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-label" htmlFor="desc">
                                                Description
                                            </label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                id="desc"
                                                value={formData.desc}
                                                placeholder="Entrer description"
                                                name='desc'
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-label" htmlFor="prix">
                                                Prix
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="prix"
                                                placeholder="Entrer prix"
                                                name='prix'
                                                value={formData.prix}
                                                onChange={handleInputChange}
                                            />

                                            <label
                                                htmlFor="size"
                                                className="form-label"
                                            >
                                                Size
                                            </label>
                                            <select
                                                className="form-select"
                                                data-choices=""
                                                data-choices-search-false=""
                                                id="size"
                                                name='size'
                                                value={formData.size}
                                                onChange={handleInputChange}
                                            >
                                                <option value="XL" selected="">
                                                    XL
                                                </option>
                                                <option value="XXL">XXL</option>
                                                <option value="XL">XL</option>
                                            </select>
                                            <label
                                                htmlFor="categorie"
                                                className="form-label"
                                            >
                                                Catégorie
                                            </label>
                                            <select
                                                className="form-select"
                                                data-choices=""
                                                data-choices-search-false=""
                                                id="categorie"
                                                name='categorie'
                                                value={formData.categorie}
                                                onChange={handleInputChange}
                                            >
                                                <option value="catégorie1" selected="">
                                                    catégorie1
                                                </option>
                                                <option value="catégorie2">catégorie2</option>
                                                <option value="catégorie3">catégorie3</option>
                                            </select>
                                        </div>
                                        <button type="submit" class="btn btn-dark btn-lg">Modifier</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">© Velzon.</div>
                        <div className="col-sm-6">
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    )
}
