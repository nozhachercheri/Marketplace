import React, { useState } from 'react'
import { Link, NavLink} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AuthService from "../../services/auth.service"
import { Modal } from 'antd';
export default function Login() {

    const [user, setUser] = useState({email: "",motDePasse: ""});


    const [hidden, setHidden] = useState(true);



    const navigate = useNavigate();
     
        
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value || null });
        console.log(user);
      };
    
    const handleLogin = () => {
        if (user?.email?.length < 6 || user?.email?.length ==null || user?.motDePasse?.length == null || user?.motDePasse?.length < 4) {
            Modal.error({
                title: 'Erreur',
                content: 'All the fields should be filled',
            });
        } else {
        AuthService.LoginFunc(user.email,user.motDePasse)
        .then((response) => {
            window.location.reload(false)})
        .catch((error) => {
            Modal.warning({
                title: 'Erreur',
                content: "Can you please have another look on crendentials given",
            });
        })}
    };

  return (
    <div className="auth-page-wrapper pt-5">
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div className="bg-overlay"></div>
            <div className="shape">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                </svg>
            </div>
        </div>
        <div className="auth-page-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center mt-sm-5 mb-4 text-white-50">
                            <div>
                                <a  className="d-inline-block auth-logo">
                                    <img src="assets/images/logo-light.png" alt="" height="20"/>
                                </a>
                            </div>
                         
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="card mt-4">
                            <div className="card-body p-4">
                                <div className="text-center mt-2">
                                    <h5 className="text-primary">Welcome Back !</h5>
                                </div>
                                <div className="p-2 mt-4">
                                        <div className="mb-3">
                                            <label for="useremail" className="form-label">Email <span className="text-danger">*</span></label>
                                            <input   name="email"  type="email" className="form-control" id="useremail" placeholder="Entrer email" value={user.email} onChange={handleInputChange}  required/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" for="password-input">Password</label>
                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                <input  type="password" name='motDePasse' value={user.motDePasse} onChange={handleInputChange}  className="form-control pe-5 password-input" placeholder="Entre mot de passe" id="password-input"/>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button onClick={handleLogin} className="btn btn-success w-100" type="submit">Se connecter</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center">
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  )
}
