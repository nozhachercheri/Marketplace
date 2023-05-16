import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../../services/user.service';
export default function UpdateBoutique() {


    const currentUser = JSON.parse(localStorage.getItem('user'));
    const id = currentUser["user"]["id"]
    console.log(id)
    const navigate = useNavigate()
    const [boutique, setBoutique] = useState([]);
    const [formData, setFormData] = useState({
        id:'',
        login: '',
        email: '',
        description: '',
        openTime: '',
        closeTime: '',
    });

    const retrieveBoutique = () => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const id = currentUser["user"]["id"]
        // console.log(id)
        UserService.getBoutiqueInfos(id)
            .then((response) => {
                setBoutique(response.data[0])
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveBoutique();
    }, []);

    useEffect(() => {
        setFormData({
            id:boutique.userId,
            description: boutique.description,
            openTime: boutique.openTime,
            closeTime: boutique.closeTime,
        });
    }, [boutique]);

    // console.log(formData);
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    const navigateToProfile = () => {
        navigate("/Profile")
        window.location.reload(false)

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        const { description, openTime, closeTime, id } = formData;
        const data = new FormData();
        data.append('description', description);
        data.append('openTime', openTime);
        data.append('closeTime', closeTime);
        data.append('id', id);
        try {  
            const response = await UserService.updateBoutiqueInfos(formData);
            navigateToProfile()
        } catch (error) {
            console.log(error);
        }
    };

    console.log(formData)
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="modal fade" id="creatertaskModal3" tabindex="-1" aria-labelledby="creatertaskModalLabe3" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0">
                            <div className="modal-header p-3 bg-soft-info">
                                <h5 className="modal-title" id="creatertaskModalLabe3">Modifier Boutique</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="row g-3">
                                    <div className="col-lg-12">
                                        <label for="openTime" className="form-label">Open time</label>
                                        <input name='openTime' value={formData.openTime} onChange={handleInputChange} type="time" className="form-control" id="openTime" placeholder="time" />
                                    </div>
                                    <div className="col-lg-12">
                                        <label for="closeTime" className="form-label">Close time</label>
                                        <input name='closeTime' value={formData.closeTime} onChange={handleInputChange} type="time"className="form-control" id="closeTime" placeholder="time" />
                                    </div>
                                    <div className="col-lg-12">
                                        <label for="description" className="form-label">Description</label>
                                        <input name='description' value={formData.description} onChange={handleInputChange} type="text" className="form-control" id="description" placeholder="Description" />
                                    </div>
                                    <div className="mt-4">
                                        <div className="hstack gap-2 justify-content-end">
                                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Quitter</button>
                                            <button type="submit" className="btn btn-success">Modifier</button>
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
