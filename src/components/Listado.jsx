import React, { useEffect, useState } from "react";
import { Formulario } from "./Formulario.jsx";

export const Listado = () => {
  const [pendientes, setPendientes] = useState([]);

  const getPendientes = async () => {
    // Verifica elementos del local storage:
    const elementos = JSON.parse(localStorage.getItem("pendienteStorage"));
    // Comprueba si es un array:
    if (Array.isArray(elementos)) {
      // Modifica el estado de pendientes:
      setPendientes(elementos);
    } else {
      // No hay elementos guardados en el storage:
      setPendientes([]);
    }
  };

  const deletePendientes = async (e, id) => {
    e.preventDefault();
    // Crea un array sin el elemento a eliminar:
    const nuevoArrayPendientes = pendientes.filter((valor) => valor._id !== id);
    //Modifica el local storage:
    localStorage.setItem(
      "pendienteStorage",
      JSON.stringify(nuevoArrayPendientes)
    );
    // Recarga componente:
    window.location.reload();
  };

  useEffect(() => {
    getPendientes();
  }, []);

  return (
    <>
      <header>Lista de Pendientes</header>
      <Formulario />
      <main>
        {pendientes.length === 0 && <h3>No hay pendientes registrados</h3>}
        <ul>
          {pendientes.map((valor) => {
            return (
              <form onSubmit={(e) => deletePendientes(e, valor._id)}>
                <li key={valor._id}>
                  <span>{valor.tarea}</span>: {valor.descripcion}
                  <input type="submit" value="Eliminar"></input>
                </li>
              </form>
            );
          })}
        </ul>
      </main>
    </>
  );
};
