import React from 'react'
import UserService from '../../../services/user.service';
import { useState } from 'react';
export default function ChangerMDP() {

    const [user, setUser] = useState({ oldmotDePasse: "", newmotDePasse: "" });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value || null });
    };

    const handleChange = () => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const id = currentUser["user"]["id"]
        UserService.updatePwdBoutique(user.oldmotDePasse, user.newmotDePasse, id)
            .then((response) => {
                window.location.reload(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }




    return (
        <>
            <div className="modal fade" id="creatertaskModal2" tabindex="-1" aria-labelledby="creatertaskModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content border-0">
                        <div className="modal-header p-3 bg-soft-info">
                            <h5 className="modal-title" id="creatertaskModalLabel">Modifier mot de passe</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-lg-12">
                                    <label for="motDePasse" className="form-label">Mot de passe actuel</label>
                                    <input name='oldmotDePasse' value={user.oldmotDePasse} onChange={handleInputChange} type="password" className="form-control" id="motDePasse" placeholder="mot de passe actuel" />
                                </div>
                                <div className="col-lg-12">
                                    <label for="motDePasse" className="form-label">Nouveau mot de passe</label>
                                    <input name='newmotDePasse' value={user.newmotDePasse} onChange={handleInputChange} type="password" className="form-control" id="motDePasse" placeholder="Mot de passe" />
                                </div>
                                <div className="mt-4">
                                    <div className="hstack gap-2 justify-content-end">
                                        <button type="button" className="btn btn-light" data-bs-dismiss="modal">Quitter</button>
                                        <button onClick={handleChange} type="submit" className="btn btn-success">Ajouter</button>
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

