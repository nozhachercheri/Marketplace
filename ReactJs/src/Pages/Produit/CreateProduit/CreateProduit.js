import React from 'react'
import { useState } from 'react';
import ProduitService from '../../../services/produit.service';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function CreateProduit() {

    const navigate = useNavigate()

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const id = currentUser["user"]["id"]
    const [formData, setFormData] = useState({
        idBoutique: id,
        prod_name: '',
        prix: '',
        nomT: '',
        product_group_name: '',
        remise: '',
        qty: "",
        marque:"",
        image: null,
    });

    const [categories, setCategories] = useState([])
    const retrieveCategories = () => {
        ProduitService.getAllCategories()
            .then((response) => {
                setCategories(response.data)
            })
            .catch((e) => {
                console.log(e);

            });
    };
    useEffect(() => {
        retrieveCategories();
    }, []);



    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.files[0],
        });
    };
    const navigateToProduits = () => {
        navigate("/")
        window.location.reload(false)
    }

    const [selectedSizes, setSelectedSizes] = useState([]);

    function handleSizeSelection(event) {
        const selectedSize = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            // If the checkbox is checked, add the selected size to the array
            setSelectedSizes([...selectedSizes, selectedSize]);
        } else {
            // If the checkbox is unchecked, remove the selected size from the array
            setSelectedSizes(selectedSizes.filter(size => size !== selectedSize));
        }
    }

    const [selectedCouleurs, setSelectedCouleurs] = useState([]);

    function handleCouleursSelection(event) {
        const selectedCouleur = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {

            setSelectedCouleurs([...selectedCouleurs, selectedCouleur]);
        } else {

            setSelectedCouleurs(selectedCouleurs.filter(couleur => couleur !== selectedCouleur));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {
            prod_name,
            prix,
            remise,
            idBoutique,
            qty,
            marque,
            product_group_name,
            image,
        } = formData;

        const data = new FormData();
        data.append("prod_name", prod_name);
        data.append("prix", prix);
        data.append("remise", remise);
        data.append("boutiqueIdBoutique", idBoutique);
        data.append("qty", qty);
        data.append("marque", marque);
        data.append("product_group_name", product_group_name);
        data.append("image", image);

        const couleurs = JSON.stringify(selectedCouleurs);
        data.append("couleurs", couleurs);
        const sizes = JSON.stringify(selectedSizes);
        data.append("sizes", sizes);

        try {
            const response = await ProduitService.AddProduit(data);
            navigateToProduits();
        } catch (error) {
            console.log(error);
        }
    };
    console.log(selectedCouleurs)
    console.log(selectedSizes)


    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Ajouter Produit</h4>
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
                                                name='prod_name'
                                                onChange={handleInputChange}
                                            />
                                            {/* <label style={{marginTop:"15px"}}  className="form-label" htmlFor="desc">
                                                Description
                                            </label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                id="desc"
                                                placeholder="Entrer description"
                                                name='desc'
                                                onChange={handleInputChange}
                                            /> */}
                                            <label style={{ marginTop: "15px" }} className="form-label" htmlFor="prix">
                                                Prix
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="prix"
                                                placeholder="Entrer prix"
                                                name='prix'
                                                onChange={handleInputChange}
                                            />
                                            <label style={{ marginTop: "15px" }} className="form-label" htmlFor="remise">
                                                Remise en pourcent
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="remise"
                                                placeholder="Entrer remise"
                                                name='remise'
                                                onChange={handleInputChange}
                                            />
                                            <label style={{ marginTop: "15px" }} className="form-label" htmlFor="qty">
                                                Quantité
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="qty"
                                                placeholder="Entrer quantité"
                                                name='qty'
                                                onChange={handleInputChange}
                                            />
                                            <label style={{ marginTop: "15px" }} className="form-label" htmlFor="marque">
                                                Marque
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="marque"
                                                placeholder="Entrer quantité"
                                                name='marque'
                                                onChange={handleInputChange}
                                            />
                                            <label style={{ marginTop: "15px" }} className="form-label">Size</label>
                                            <div style={{ marginTop: "15px" }} className="form-check mb-2">
                                                <input className="form-check-input" type="checkbox" id="xxl" value="XXL" onChange={handleSizeSelection} />
                                                <label className="form-check-label" htmlFor="xxl">XXL</label>
                                            </div>
                                            <div style={{ marginTop: "15px" }} className="form-check mb-2">
                                                <input className="form-check-input" type="checkbox" id="xl" value="XL" onChange={handleSizeSelection} />
                                                <label className="form-check-label" htmlFor="xl">XL</label>
                                            </div>
                                            <div style={{ marginTop: "15px" }} className="form-check mb-2">
                                                <input className="form-check-input" type="checkbox" id="m" value="M" onChange={handleSizeSelection} />
                                                <label className="form-check-label" htmlFor="m">M</label>
                                            </div>
                                            <div style={{ marginTop: "15px" }} className="form-check mb-2">
                                                <input className="form-check-input" type="checkbox" id="s" value="S" onChange={handleSizeSelection} />
                                                <label className="form-check-label" htmlFor="s">S</label>
                                            </div>
                                            <div style={{ marginTop: "15px" }} className="form-check mb-2">
                                                <input className="form-check-input" type="checkbox" id="xs" value="XS" onChange={handleSizeSelection} />
                                                <label className="form-check-label" htmlFor="xs">XS</label>
                                            </div>

                                            <label style={{ marginTop: "15px" }} className="form-label">Couleurs</label>
                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="Noir"

                                                    value="noir" onChange={handleCouleursSelection}
                                                />
                                                <label className="form-check-label" htmlFor="Noir">
                                                    Noir
                                                </label>
                                            </div>
                                            <div className="form-check form-check-secondary mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="Bleu"

                                                    value="bleu" onChange={handleCouleursSelection}
                                                />
                                                <label className="form-check-label" htmlFor="Bleu">

                                                    Bleu
                                                </label>
                                            </div>
                                            <div className="form-check form-check-success mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="Vert"

                                                    value="vert" onChange={handleCouleursSelection}
                                                />
                                                <label className="form-check-label" htmlFor="Vert">
                                                    Vert
                                                </label>
                                            </div>
                                            <div className="form-check form-check-warning mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="Jaune"

                                                    value="jaune" onChange={handleCouleursSelection}
                                                />
                                                <label className="form-check-label" htmlFor="Jaune">
                                                    Jaune
                                                </label>
                                            </div>
                                            <div className="form-check form-check-danger mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="Rouge"

                                                    value="rouge" onChange={handleCouleursSelection}
                                                />
                                                <label className="form-check-label" htmlFor="Rouge">
                                                    Rouge
                                                </label>
                                            </div>


                                            <label
                                                htmlFor="choices-priority-input"
                                                className="form-label"
                                                style={{ marginTop: "15px" }}
                                            >
                                                Catégorie
                                            </label>
                                            <select
                                                className="form-select"
                                                data-choices=""
                                                data-choices-search-false=""
                                                id="choices-priority-input"
                                                name='product_group_name'
                                                onChange={handleInputChange}
                                            >
                                                <option selected disabled value="">Choose...</option>
                                                {categories.map(categorie => <option value={categorie["product_group_name"]}>{categorie.product_group_name}</option>)}
                                            </select>
                                            <div className="mb-3">
                                                <label style={{ marginTop: "15px" }} className="form-label" htmlFor="project-thumbnail-img">
                                                    Image
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="project-thumbnail-img"
                                                    type="file"
                                                    accept="image/png, image/gif, image/jpeg"
                                                    name='image'
                                                    onChange={handleFileInputChange}
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-dark btn-lg">Ajouter</button>
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
