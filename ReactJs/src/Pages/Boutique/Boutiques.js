import React from 'react'
import UserService from '../../services/user.service'
import Boutique from './Boutique';
import { useState,useEffect } from 'react';
import CreateBoutique from './CreateBoutique/CreateBoutique';
export default function Boutiques() {

    const [boutiques, setBoutiques] = useState([])
    const retrieveAllBoutiques = () => {
        UserService.getAllBoutiques()
            .then((response) => {
                setBoutiques(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    useEffect(() => {
        retrieveAllBoutiques();
    }, []);
    
    const Boutiquess = boutiques.map(boutique => <Boutique key={boutique.id} boutique={boutique} />)
    console.log(boutiques)
    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Boutiques</h4>
                                <div class="row g-4 mb-3">
                                    <div class="col-sm-auto">
                                     <div>
                                            <button style={{marginTop:"15px"}} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#creatertaskModal1">Ajouter boutique</button>
                                        </div>
                                        <CreateBoutique />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                </div>
                                <div className="card-body">
                                    <table
                                        id="example"
                                        className="table table-bordered dt-responsive nowrap table-striped align-middle"
                                        style={{ width: "100%" }}
                                    >
                                        <thead>
                                            <tr>
                                                <th>Email</th>
                                                <th>Login</th>
                                                <th>Open time</th>
                                                <th>Close time</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Boutiquess}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
