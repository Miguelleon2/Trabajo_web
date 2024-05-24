import React, { useState, useEffect } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { firebaseApp } from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Loader from './components/Loader'; // Importar el loader

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
      setLoading(false);
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        //funcion final
        if (!user) {
          setUserWithFirebaseAndRol(usuarioFirebase);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, [auth, user]);

  if (loading) {
    return <Loader />;
  }

  return <div className="container">{user ? <Home user={user} /> : <Login />}</div>;
}

export default App;
