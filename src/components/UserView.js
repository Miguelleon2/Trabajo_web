import React from "react";
import TorneoList from "./TorneoList";

function UserView({ user }) {
  return (
    <div className="container">
      <h1><i className="fas fa-user"></i> Hola, {user.email}</h1>
      <TorneoList user={user} />
    </div>
  );
}

export default UserView;
