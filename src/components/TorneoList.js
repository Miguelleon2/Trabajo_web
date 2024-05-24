import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";

function TorneoList({ user }) {
  const [torneos, setTorneos] = useState([]);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchTorneos = async () => {
      const querySnapshot = await getDocs(collection(firestore, "torneos"));
      const torneosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTorneos(torneosData);
    };

    fetchTorneos();
  }, [firestore]);

  const inscribirseEnTorneo = async (torneoId) => {
    const torneoRef = doc(firestore, `torneos/${torneoId}`);
    await updateDoc(torneoRef, {
      participantes: arrayUnion({
        uid: user.uid,
        email: user.email,
      }),
    });
  };

  return (
    <div>
      <h2><i className="fas fa-list"></i> Lista de Torneos</h2>
      <ul>
        {torneos.map((torneo) => (
          <li key={torneo.id} className="card">
            <h3><i className="fas fa-trophy"></i> {torneo.nombre}</h3>
            <p><i className="fas fa-calendar-alt"></i> Fecha Límite de Inscripción: {torneo.fecha}</p>
            <p><i className="fas fa-users"></i> Cantidad Máxima de Participantes: {torneo.maxParticipantes}</p>
            {torneo.imagen && <img src={torneo.imagen} alt={torneo.nombre} />}
            <button onClick={() => inscribirseEnTorneo(torneo.id)}><i className="fas fa-sign-in-alt"></i> Inscribirse</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TorneoList;
