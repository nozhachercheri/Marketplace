import React from 'react'
import ChangerMDP from './ChangerMDP/ChangerMDP';
import UpdateBoutique from '../Boutique/UpdateBoutiqueProfile/UpdateBoutiqueProfile';
export default function Profile() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(currentUser)
    return (
        <>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="profile-foreground position-relative mx-n4 mt-n4">
                            <div className="profile-wid-bg">
                                <img src="/assets/images/profile-bg.jpg" alt="" className="profile-wid-img" />
                            </div>
                        </div>
                        <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
                            <div className="row g-4">
                                <div className="col">
                                    <div className="p-2">
                                        <h3 className="text-white mb-1">{currentUser?.user?.login}</h3>
                                        <p className="text-white-75">{currentUser?.user?.role}</p>
                                        <button data-bs-toggle="modal" data-bs-target="#creatertaskModal2" class="btn btn-success waves-effect waves-light">Changer mot de passe</button>
                                        <ChangerMDP />
                                        <button style={{ marginLeft: "15px" }} data-bs-toggle="modal" data-bs-target="#creatertaskModal3" class="btn btn-success waves-effect waves-light">Modifier profil</button>
                                        <UpdateBoutique />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div>
                                    <div className="tab-content pt-4 text-muted">
                                        <div className="tab-pane active" id="overview-tab" role="tabpanel">
                                            <div className="row">
                                                <div className="col-xxl-3">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="card-title mb-3">Info</h5>
                                                            <div className="table-responsive">
                                                                <table className="table table-borderless mb-0">
                                                                    <tbody>
                                                                        {/* <tr>
                                                                            <th className="ps-0" scope="row">
                                                                                Username :</th>
                                                                            <td className="text-muted">{currentUser?.user?.login}</td>
                                                                        </tr> */}
                                                                        <tr>
                                                                            <th className="ps-0" scope="row">E-mail :</th>
                                                                            <td className="text-muted">{currentUser?.user?.email}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-9">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="card-title mb-3">A propos</h5>
                                                            <p>Bienvenue dans notre boutique en ligne ! Nous sommes ravis de vous accueillir sur notre site web où vous pouvez trouver une large sélection de produits pour répondre à vos besoins. Nous proposons des articles de qualité supérieure dans une variété de catégories, allant des vêtements et accessoires de mode aux articles pour la maison, en passant par les gadgets électroniques et les jouets pour enfants. Notre boutique en ligne est facile à naviguer et notre système de paiement sécurisé vous permet de faire vos achats en toute confiance. Nous nous efforçons de vous offrir une expérience de shopping en ligne agréable et pratique, et notre équipe de service client est là pour répondre à toutes vos questions. Nous espérons que vous apprécierez votre visite sur notre boutique en ligne et que vous trouverez tout ce dont vous avez besoin pour améliorer votre vie quotidienne.</p>
                                                            <div className="row">
                                                                <div className="col-6 col-md-4">
                                                                    <div className="d-flex mt-4">
                                                                        <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                                                            <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                                                                <i className="ri-user-2-fill"></i>
                                                                            </div>
                                                                        </div>

                                                                        <div className="flex-grow-1 overflow-hidden">
                                                                            <p className="mb-1">Designation :</p>
                                                                            <h6 className="text-truncate mb-0">Boutique</h6>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
