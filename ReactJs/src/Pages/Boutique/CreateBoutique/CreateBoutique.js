import React from 'react'
import { useState } from 'react';
import UserService from '../../../services/user.service';
export default function CreateBoutique() {

    const [formData, setFormData] = useState({
        email:"",
        login: "",
        motDePasse: "",
        closeTime: "",
        description: "",
        openTime: "",
        cover: null,
      });
    
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
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, login, motDePasse, closeTime,openTime,description, cover } = formData;
        const data = new FormData();
        data.append('email', email);
        data.append('login', login);
        data.append('motDePasse', motDePasse);
        data.append('closeTime', closeTime);
        data.append('openTime', openTime);
        data.append('description', description);
        data.append('cover', cover);
        try {
          const response = await UserService.addBoutique(formData);
          window.location.reload(false);
        } catch (error) {
          console.log(error);
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
        }
      };
    
  
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="modal fade" id="creatertaskModal1" tabindex="-1" aria-labelledby="creatertaskModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content border-0">
                        <div className="modal-header p-3 bg-soft-info">
                            <h5 className="modal-title" id="creatertaskModalLabel">Ajouter Boutique</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="row g-3">

                                <div className="col-lg-12">
                                    <label for="login" className="form-label">Nom d'utilisateur</label>
                                    <input name='login'  onChange={handleInputChange} type="text" className="form-control" id="login" placeholder="Nom d'utilisateur" />
                                </div>
                                <div className="col-lg-12">
                                    <label for="email" className="form-label">Email</label>
                                    <input name='email' onChange={handleInputChange} type="text" className="form-control" id="email" placeholder="Email" />
                                </div>
                                <div className="col-lg-12">
                                    <label for="motDePasse" className="form-label">Mot de passe</label>
                                    <input name='motDePasse'  onChange={handleInputChange} type="password" className="form-control" id="motDePasse" placeholder="Mot de passe" />
                                </div>
                                <div className="col-lg-12">
                                    <label for="openTime" className="form-label">Open time</label>
                                    <input name='openTime'  onChange={handleInputChange} type="time" className="form-control" id="openTime" placeholder="Open time" />
                                </div>
                                <div className="col-lg-12">
                                    <label for="closeTime" className="form-label">Close time</label>
                                    <input name='closeTime'  onChange={handleInputChange} type="time" className="form-control" id="closeTime" placeholder="Close time" />
                                </div>
                                <div className="col-lg-12">
                                    <label for="description" className="form-label">Description</label>
                                    <input name='description'  onChange={handleInputChange} type="text" className="form-control" id="description" placeholder="Description" />
                                </div>
                                <div className="col-lg-12">
                                        <label className="form-label" htmlFor="project-thumbnail-img">
                                            Image
                                        </label>
                                        <input
                                            className="form-control"
                                            id="project-thumbnail-img"
                                            type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                            name='cover' 
                                            onChange={handleFileInputChange}
                                        />
                                    </div>
                                <div className="mt-4">
                                    <div className="hstack gap-2 justify-content-end">
                                        <button type="button" className="btn btn-light" data-bs-dismiss="modal">Quitter</button>
                                        <button  type="submit"  className="btn btn-success">Ajouter</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </>
    )
}
