import React from 'react'
import CommandeService from '../../services/commande.service';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function Facture() {

    let { idC } = useParams()
    const [facture, setFacture] = useState([])
    const retrieveFacture = () => {
        CommandeService.GetFactureForProduit(idC)
            .then((response) => {
                setFacture(response.data[0])
            })
            .catch((e) => {
                console.log(e);

            });
    };
    useEffect(() => {
        retrieveFacture();
    }, []);

    const prix = ((facture.prix - (((facture.remise)*(facture.prix))/100)) * facture.qty)
    const prixT = prix + 10
    const currentUser = JSON.parse(localStorage.getItem('user'));
    return (
        <>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">Facture</h4>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row justify-content-center">
                            <div className="col-xxl-9">
                                <div className="card" id="demo">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card-header border-bottom-dashed p-4">
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0 mt-sm-0 mt-3">
                                                        <h6>
                                                            <span className="text-muted fw-normal">Email:</span>
                                                            <span id="email">{currentUser?.user?.email}</span>
                                                        </h6>
                                                        <h6 className="mb-0">
                                                            <span className="text-muted fw-normal">
                                                               Nom boutique : 
                                                            </span>
                                                            <span id="contact-no"> {currentUser?.user?.login}</span>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*end card-header*/}
                                        </div>
                                        {/*end col*/}
                                        <div className="col-lg-12">
                                            <div className="card-body p-4">
                                                <div className="row g-3">
                                                    <div className="col-lg-3 col-6">
                                                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                                                            Date
                                                        </p>
                                                        <h5 className="fs-14 mb-0">
                                                            <span id="invoice-date">{facture.date}</span>{" "}
                                                        </h5>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-3 col-6">
                                                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                                                            Etat commande
                                                        </p>
                                                        <span
                                                            className="badge badge-soft-success fs-11"
                                                            id="payment-status"
                                                        >
                                                            Confirmé
                                                        </span>
                                                    </div>
                                                    {/*end col*/}
                                                    {/*end col*/}
                                                </div>
                                                {/*end row*/}
                                            </div>
                                            {/*end card-body*/}
                                        </div>
                                        {/*end col*/}
                                        {/* <div className="col-lg-12">
                                            <div className="card-body p-4 border-top border-top-dashed">
                                                <div className="row g-3">
                                                    <div className="col-6">
                                                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                                            Billing Address
                                                        </h6>
                                                        <p className="fw-medium mb-2" id="billing-name">
                                                            David Nichols
                                                        </p>
                                                        <p
                                                            className="text-muted mb-1"
                                                            id="billing-address-line-1"
                                                        >
                                                            305 S San Gabriel Blvd
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <span>Phone: +</span>
                                                            <span id="billing-phone-no">(123) 456-7890</span>
                                                        </p>
                                                        <p className="text-muted mb-0">
                                                            <span>Tax: </span>
                                                            <span id="billing-tax-no">12-3456789</span>{" "}
                                                        </p>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                                            Shipping Address
                                                        </h6>
                                                        <p className="fw-medium mb-2" id="shipping-name">
                                                            David Nichols
                                                        </p>
                                                        <p
                                                            className="text-muted mb-1"
                                                            id="shipping-address-line-1"
                                                        >
                                                            305 S San Gabriel Blvd
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <span>Phone: +</span>
                                                            <span id="shipping-phone-no">(123) 456-7890</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="col-lg-12">
                                            <div className="card-body p-4">
                                                <div className="table-responsive">
                                                    <table className="table table-borderless text-center table-nowrap align-middle mb-0">
                                                        <thead>
                                                            <tr className="table-active">
                                                                <th scope="col">Produit en details</th>
                                                                <th scope="col">Prix unitaire</th>
                                                                <th scope="col">Taille</th>
                                                                <th scope="col">Couleur</th>
                                                                <th scope="col">Quantité</th>
                                                                <th scope="col" className="text-end">
                                                                    Remise en pourcent
                                                                </th>
                                                                <th scope="col" className="text-end">
                                                                    Prix
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="products-list">
                                                            <tr>
                                                                <th scope="row">{facture.produit}</th>
                                                                <td>
                                                                    <span className="fw-medium">
                                                                    {facture.prix}
                                                                    </span>
                                                                </td>
                                                                <td>{facture.taille}</td>
                                                                <td>{facture.couleur}</td>
                                                                <td>{facture.qty}</td>
                                                                <td>{facture.remise}%</td>
                                                                <td className="text-end">{prix}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    {/*end table*/}
                                                </div>
                                                <div className="border-top border-top-dashed mt-2">
                                                    <table
                                                        className="table table-borderless table-nowrap align-middle mb-0 ms-auto"
                                                        style={{ width: 250 }}
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td>Livraison</td>
                                                                <td className="text-end">7 DT</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Tax</td>
                                                                <td className="text-end">3 DT</td>
                                                            </tr>
                                                            <tr className="border-top border-top-dashed fs-15">
                                                                <th scope="row">Prix Total</th>
                                                                <th className="text-end">{prixT}</th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    {/*end table*/}
                                                </div>
                                                <div className="mt-3">
                                                    <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                                        Client details
                                                    </h6>
                                                    <p className="text-muted mb-1">
                                                    Nom et prénom:{" "}
                                                        <span className="fw-medium" id="payment-method">
                                                        {facture.client}
                                                        </span>
                                                    </p>
                                                    <p className="text-muted mb-1">
                                                    Email :{" "}
                                                        <span className="fw-medium" id="card-holder-name">
                                                        {facture.email}
                                                        </span>
                                                    </p>
                                                    <p className="text-muted mb-1">
                                                        Tel :{" "}
                                                        <span className="fw-medium" id="card-number">
                                                        {facture.tel}
                                                        </span>
                                                    </p>
                                                    <p className="text-muted">
                                                        Adresse :{" "}
                                                        <span className="fw-medium" id="">
                                                            {" "}
                                                        </span>
                                                        <span id="card-total-amount">{facture.adresse}</span>
                                                    </p>
                                                </div>
                                                <div className="mt-4">
                                                    <div className="alert alert-info">
                                                        <p className="mb-0">
                                                            <span className="fw-semibold">NB: </span>
                                                            <span id="note">
                                                                Tous les comptes doivent être payés dans les 7 jours à compter de
                                                                réception de facture. A régler par chèque ou crédit
                                                                carte ou paiement direct en ligne. Si le compte n'est pas
                                                                payé dans les 7 jours les détails des crédits fournis comme
                                                                la confirmation des travaux entrepris sera facturée
                                                                frais convenus indiqués ci-dessus.
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                                    <a
                                                        href="javascript:window.print()"
                                                        className="btn btn-success"
                                                    >
                                                        <i className="ri-printer-line align-bottom me-1" />{" "}
                                                        Imprimer
                                                    </a>
                                                </div>
                                            </div>
                                            {/*end card-body*/}
                                        </div>
                                        {/*end col*/}
                                    </div>
                                    {/*end row*/}
                                </div>
                                {/*end card*/}
                            </div>
                            {/*end col*/}
                        </div>
                        {/*end row*/}
                    </div>
                    {/* container-fluid */}
                </div>
                {/* End Page-content */}
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">© Velzon.</div>
                            <div className="col-sm-6">
                                <div className="text-sm-end d-none d-sm-block">
                                    Design &amp; Develop by Themesbrand
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            {/* end main content*/}
        </>

    )
}
