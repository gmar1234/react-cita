import {Fragment, useState,useEffect} from 'react';
import { Formulario } from './components/Formulario';
import { Cita } from './components/Cita';

function App() {

  let cistasIniciales = JSON.parse(localStorage.getItem('citas'));

  if(!cistasIniciales){
    cistasIniciales = [];
  }


  const [citas, guardarCitas] = useState(cistasIniciales)

  // useeddet para realizar ciertas operaciones

  useEffect(()=>{
    let cistasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(cistasIniciales){
      localStorage.setItem('citas',JSON.stringify(citas))
    }else{
      localStorage.setItem('citas',JSON.stringify([]))
    }
  },[citas])

  const crearCita = cita =>{
    guardarCitas([
      ...citas,
      cita
    ])
  }

  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita=>cita.id !==id);
    guardarCitas(nuevasCitas)
  }

  const titulo = citas.length ===0 ? 'No hay Citas' : 'Asministra tus citas';

  return (
         <Fragment>
            <h1>Admnistrador pacientes</h1>
            <div className="container">
              <div className="row">
                <div className="one-half column">
                  <Formulario
                    crearCita={crearCita}
                  />
                </div>
                <div className="one-half column">
                  <h2>{titulo}</h2>
                  {citas.map(cita=>(
                    <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
                  ))}
                </div>
              </div>
            </div>
         </Fragment>
  );
}

export default App;
