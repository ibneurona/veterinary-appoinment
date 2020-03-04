import React,{Fragment,useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from "./components/Cita";
import PropTypes from 'prop-types';


function App() {

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = []
  }

  const [citas, setCitas] = useState(citasIniciales);

  //useEffect para cuando el estado cambia
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas, citasIniciales]);
  
  //guarda las citas
  const crearCitas = cita => {
    setCitas([...citas, cita]);
  }
  
  //funcion para eliminar cita
  const eliminarCita = id => {

    const nuevasCitas = citas.filter(cita => cita.id !== id);
    setCitas(nuevasCitas);
  }

  //Mensaje de condicional de citas
  const tituloCitas = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'; 

  return (
    <Fragment>
      <h1>Administrador de pacientes Veterinarios</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCitas={crearCitas} />
          </div>
          <div className="one-half column">
            <h1>{tituloCitas}</h1>
            {citas.map(cita => (
              <Cita 
                key = {cita.id} 
                cita = {cita} 
                eliminarCita = {eliminarCita} 
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
//Documentado de componentes
Formulario.propType = {
  crearCitas: PropTypes.func.isRequired,
}

export default App;
