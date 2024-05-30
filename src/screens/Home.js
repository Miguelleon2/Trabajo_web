import React from "react";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../firebase/credenciales";
import './Home.css'; // Importar el CSS

const auth = getAuth(firebaseApp);

function Home({ user }) {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Bienvenido a la App de Tenis</h1>
      </div>
      <div className="home-main">
        {user.rol === "admin" ? <AdminView className="admin-view" /> : <UserView user={user} className="user-view" />}
      </div>
      <button className="home-logout-button" onClick={() => signOut(auth)}>
        <i className="fas fa-sign-out-alt"></i> Cerrar sesión
      </button>
    </div>
  );
}

export default Home;
