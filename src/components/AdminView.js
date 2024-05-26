import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import TorneoForm from "./TorneoForm";
import TorneoParticipants from "./TorneoParticipants";
import './AdminView.css';




function AdminView() {
  const [torneos, setTorneos] = useState([]);
  const [editingTorneo, setEditingTorneo] = useState(null);
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

  const handleDelete = async (torneoId) => {
    await deleteDoc(doc(firestore, `torneos/${torneoId}`));
    setTorneos(torneos.filter(torneo => torneo.id !== torneoId));
  };

  const handleEdit = (torneo) => {
    setEditingTorneo(torneo);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { id, nombre, fecha, maxParticipantes } = editingTorneo;
    const torneoRef = doc(firestore, `torneos/${id}`);
    await updateDoc(torneoRef, { nombre, fecha, maxParticipantes });
    setEditingTorneo(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingTorneo({ ...editingTorneo, [name]: value });
  };

  return (
    <div className="container">
      <h1><i className="fas fa-user-shield"></i> Admin Panel</h1>
      <TorneoForm />
      <h2>Lista de Torneos</h2>
      <ul>
        {torneos.map((torneo) => (
          <li key={torneo.id} className="card">
            <h3><i className="fas fa-trophy"></i> {torneo.nombre}</h3>
            <p><i className="fas fa-calendar-alt"></i> Fecha Límite de Inscripción: {torneo.fecha}</p>
            <p><i className="fas fa-users"></i> Cantidad Máxima de Participantes: {torneo.maxParticipantes}</p>
            {torneo.imagen && <img src={torneo.imagen} alt={torneo.nombre} />}
            <div className="card-actions">
              <button onClick={() => handleEdit(torneo)}>
                <i className="fas fa-edit"></i> Editar
              </button>
              <button onClick={() => handleDelete(torneo.id)}>
                <i className="fas fa-trash"></i> Eliminar
              </button>
            </div>
            <TorneoParticipants torneoId={torneo.id} />
          </li>
        ))}
      </ul>
      {editingTorneo && (
        <form onSubmit={handleUpdate}>
          <h2>Editar Torneo</h2>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={editingTorneo.nombre}
              onChange={handleChange}
            />
          </label>
          <label>
            Fecha Límite de Inscripción:
            <input
              type="date"
              name="fecha"
              value={editingTorneo.fecha}
              onChange={handleChange}
            />
          </label>
          <label>
            Cantidad Máxima de Participantes:
            <input
              type="number"
              name="maxParticipantes"
              value={editingTorneo.maxParticipantes}
              onChange={handleChange}
            />
          </label>
          <button type="submit"><i className="fas fa-save"></i> Actualizar Torneo</button>
        </form>
      )}
    </div>
  );
}

export default AdminView;
