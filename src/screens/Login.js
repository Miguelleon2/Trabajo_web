import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { firebaseApp } from "../firebase/credenciales";
import './Login.css'; // Importa el archivo CSS

const auth = getAuth(firebaseApp);

function Login() {
  const firestore = getFirestore(firebaseApp);
  const [isRegistrando, setIsRegistrando] = useState(false);

  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(infoUsuario.user.uid);
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol });
  }

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = isRegistrando ? e.target.elements.rol.value : null;

    console.log("submit", email, password, rol);

    if (isRegistrando) {
      registrarUsuario(email, password, rol);
    } else {
      signInWithEmailAndPassword(auth, email, password);
    }
  }

  return (
    <div className="container">
      <h1>{isRegistrando ? "Regístrate" : "Inicia sesión"}</h1>
      <form onSubmit={submitHandler}>
        <label>
          <i className="fas fa-envelope"></i> Correo electrónico:
          <input type="email" id="email" name="email" />
        </label>

        <label>
          <i className="fas fa-lock"></i> Contraseña:
          <input type="password" id="password" name="password" />
        </label>

        {isRegistrando && (
          <label>
            <i className="fas fa-user-tag"></i> Rol:
            <select id="rol" name="rol">
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
          </label>
        )}

        <button type="submit">{isRegistrando ? "Registrar" : "Iniciar sesión"}</button>
      </form>

      <button onClick={() => setIsRegistrando(!isRegistrando)}>
        {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
      </button>
    </div>
  );
}

export default Login;
