import React, { useState } from "react";
import { getFirestore, collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/credenciales";

function TorneoForm() {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [imagen, setImagen] = useState(null);
  const [maxParticipantes, setMaxParticipantes] = useState(0);
  const firestore = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(firestore, "torneos"), {
      nombre,
      fecha,
      maxParticipantes,
      participantes: [],
    });

    if (imagen) {
      const storageRef = ref(storage, `torneos/${docRef.id}`);
      await uploadBytes(storageRef, imagen);
      const downloadURL = await getDownloadURL(storageRef);

      await updateDoc(doc(firestore, `torneos/${docRef.id}`), {
        imagen: downloadURL,
      });
    }

    setNombre("");
    setFecha("");
    setImagen(null);
    setMaxParticipantes(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2><i className="fas fa-plus-circle"></i> Crear Nuevo Torneo</h2>
      <label>
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>

      <label>
        Fecha Límite de Inscripción:
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </label>

      <label>
        Imagen:
        <input
          type="file"
          onChange={(e) => setImagen(e.target.files[0])}
        />
      </label>

      <label>
        Cantidad Máxima de Participantes:
        <input
          type="number"
          value={maxParticipantes}
          onChange={(e) => setMaxParticipantes(e.target.value)}
        />
      </label>

      <button type="submit"><i className="fas fa-save"></i> Crear Torneo</button>
    </form>
  );
}

export default TorneoForm;
