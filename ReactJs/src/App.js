import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Boutiques from './Pages/Boutique/Boutiques';
import CreateProduit from './Pages/Produit/CreateProduit/CreateProduit';
import Produits from './Pages/Produit/Produits';
import ModifierProduit from './Pages/Produit/ModifierProduit/ModifierProduit';
import Profile from './Pages/Profile/Profile';
import Commandes from './Pages/Commandes/Commandes';
import Facture from './Pages/Facture/Facture';
function App() {

  const currentUser = JSON.parse(localStorage.getItem('user'));
  console.log(currentUser)



  const Menu = () => {
    const location = useLocation();

    if (location.pathname === "/auth-signIn") {
      return <></>;
    }
    else
      return (
        <div style={{ backgroundColor: "#3B5998" }} className="app-menu navbar-menu">
          <div className="navbar-brand-box">
            <Link to="/Home" className="logo logo-dark">
              <span className="logo-lg">
                <img src=" /assets/images/logo-light.png" alt="" height="17" />
              </span>
            </Link>
            <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
              <i className="ri-record-circle-line"></i>
            </button>
          </div>
          <div id="scrollbar">
            <div className="container-fluid">
              <div id="two-column-menu">
              </div>
              <ul className="navbar-nav" id="navbar-nav">
                <li style={{ color: "#fff" }} className="menu-title"><span data-key="t-menu">Menu</span></li>
                {currentUser?.user?.role !== 'admin' ? (<li className="nav-item">
                  <Link style={{ color: "#fff" }} to='/CreateProduit' className="nav-link" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                    <span data-key="t-dashboards">Ajouter produit</span>
                  </Link>
                </li>) : (<></>)}
                {currentUser?.user?.role !== 'admin' ? (<li className="nav-item">
                  <Link style={{ color: "#fff" }} to='/Commandes' className="nav-link" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                    <span data-key="t-dashboards">Commandes</span>
                  </Link>
                </li>) : (<></>)}
              </ul>
            </div>
          </div>
          <div className="sidebar-background"></div>
        </div>
      )
  }
  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.clear()
    window.location.reload(false)
  };


  const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const NavigateProfile = () => {
    //   navigate("/Profile");
    // }
    if (location.pathname === "/auth-signIn") {
      return <></>;
    }

    return (
      <>
        <header id="page-topbar">
          <div className="layout-width">
            <div className="navbar-header">
              <div className="d-flex">
                <div className="navbar-brand-box horizontal-logo">
                  <a href="index.html" className="logo logo-dark">
                    <span className="logo-sm">
                      <img src=" /assets/images/logo-sm.png" alt="" height="22" />
                    </span>
                  </a>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="dropdown ms-sm-3 header-item topbar-user">
                  <button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="d-flex align-items-center">
                      <span className="text-start ms-xl-2">
                        <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{currentUser?.user?.login}</span>
                        <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{currentUser?.user?.role}</span>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    {currentUser?.user?.role !== 'admin' ? (<Link to='Profile' className="dropdown-item"><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Profile</span></Link>) : (<></>)}
                    <a onClick={Logout} className="dropdown-item" ><i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Log out</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }

  return (
    <div >
      <Router>
        <Menu />
        <Header />
        {currentUser == null ? (
          <Routes>
            <Route exact path="/auth-signIn" element={<Login />} />
            <Route exact path='*' element={<Navigate to="/auth-signIn" />} />
          </Routes>
        ) : (
          currentUser?.user?.role == 'admin' ? (<Routes>
            <Route exact path='*' element={<Navigate to="/" />} />
            <Route exact path="/" element={<Boutiques />} />
          </Routes>
          ) : (
            <Routes>
              <Route exact path='*' element={<Navigate to="/" />} />
              <Route exact path="/" element={<Produits />} />
              <Route exact path="/CreateProduit" element={<CreateProduit />} />
              <Route exact path="/UpdateProduit/:id" element={<ModifierProduit />} />
              <Route exact path="/Profile" element={<Profile />} />
              <Route exact path="/Commandes" element={<Commandes />} />
              <Route exact path="/Facture/:idC" element={<Facture />} />
            </Routes>
          )

        )}
      </Router>
    </div>
  );
}

export default App;
