import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function TorneoParticipants({ torneoId }) {
  const [participantes, setParticipantes] = useState([]);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchParticipantes = async () => {
      const docRef = doc(firestore, `torneos/${torneoId}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setParticipantes(docSnap.data().participantes || []);
      }
    };

    fetchParticipantes();
  }, [firestore, torneoId]);

  return (
    <div>
      <h3>Participantes</h3>
      {participantes.length > 0 ? (
        <ul>
          {participantes.map((participante, index) => (
            <li key={index}>
              {participante.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay participantes</p>
      )}
    </div>
  );
}

export default TorneoParticipants;
