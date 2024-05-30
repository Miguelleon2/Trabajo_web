import React from "react";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../firebase/credenciales";
import './Home.css';

const auth = getAuth(firebaseApp);

function Home({ user }) {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a la App de Tenis</h1>
        <button className="home-logout-button" onClick={() => signOut(auth)}>
          <i className="fas fa-sign-out-alt"></i> Cerrar sesión
        </button>
      </header>
      <main className="home-main">
        {user.rol === "admin" ? <AdminView /> : <UserView user={user} />}
      </main>
    </div>
  );
}

export default Home;
