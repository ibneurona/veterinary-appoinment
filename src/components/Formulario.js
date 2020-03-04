import React,{useState, Fragment} from 'react';
import uuid from 'uuid/v4';


const Formulario = ({crearCitas}) => {
  
  //State de el componente
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  });

  //funcion que se ejecuta cada vez que escribe el usuario
  const handleOnChange = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    });
  };

  //extraccion de valores de los inputs
  const {mascota, propietario, fecha, hora, sintomas} = cita;

  const [error,agergarError] = useState(false)

  //Funcion para agregar citas
  const agregaCita = (e) => {
    e.preventDefault();

    //validar
    if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
      agergarError(true)
      return;
    }

    //Error cita
    agergarError(false);

    //asignaar un id
    cita.id = uuid();
    
    //Crear cita
    crearCitas(cita);
    
    //reiniciar inputs
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: ""
    });

  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      <form onSubmit={agregaCita}>
        {error ? <p className="alerta-error">Todos los campos están vacíos</p> : null}
        <label>Nombre Mascota</label>
        <input
          type = "text"
          name = "mascota"
          className = "u-full-width"
          placeholder = "Nombre Mascota"
          onChange = {handleOnChange}
          value = {mascota}
        />
        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre del Dueño "
          onChange={handleOnChange}
          value = {propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={handleOnChange}
          value = {fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={handleOnChange}
          value = {hora}
        />
        <label>Síntomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={handleOnChange}
          value = {sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
}
 
export default Formulario;