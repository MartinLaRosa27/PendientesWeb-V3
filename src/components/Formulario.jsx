import { useState } from "react";
import shortid from "shortid";

export const Formulario = () => {
  const [pendiente, setPendiente] = useState({
    _id: shortid.generate(),
    tarea: "",
    descripcion: "",
  });

  const postPendiente = async (e) => {
    // Evita que se recargue automaticamente:
    e.preventDefault();
    // Verifica si hay elementos almacenados en el local storage:
    let elementos = JSON.parse(localStorage.getItem("pendienteStorage"));
    // Comprueba si es un array:
    if (Array.isArray(elementos)) {
      // Agrega elemento:
      elementos.push(pendiente);
    } else {
      // Crea un array:
      elementos = [pendiente];
    }
    // Guarda el el storage:
    localStorage.setItem("pendienteStorage", JSON.stringify(elementos));
    // Recarga componente:
    window.location.reload();
  };

  return (
    <form onSubmit={(e) => postPendiente(e)}>
      <legend>Agregar Pendiente</legend>
      <div className="form-grid">
        <div>
          <label>Tarea</label>
          <input
            type="text"
            name="tarea"
            placeholder="Arreglar casa"
            maxLength="90"
            minLength="3"
            value={pendiente.tarea}
            onChange={(e) =>
              setPendiente({
                ...pendiente,
                [e.target.name]: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label>Descripción</label>
          <input
            type="text"
            name="descripcion"
            placeholder="Pintar pared"
            maxLength="255"
            minLength="5"
            value={pendiente.descripcion}
            onChange={(e) =>
              setPendiente({
                ...pendiente,
                [e.target.name]: e.target.value,
              })
            }
            required
          />
        </div>
        <input type="submit" value="Guardar"></input>
      </div>
    </form>
  );
};
