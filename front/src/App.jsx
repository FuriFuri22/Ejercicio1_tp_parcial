import { useEffect, useState } from 'react'

function App() {

  const [personas, setPersonas] = useState([
    {
      id: 1,
      nombres: 'numero1',
      apellidos: 'numberone',
      dni: 454545456
    }
  ])
  const consultarPersonas = async () => {
    const response = await fetch('http://localhost:8888/consultar_con_soap', {
      method: 'post',
      body: (`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://localhost:8888/consultar_con_soap">
        <soapenv:Header />
        <soapenv:Body>
          <tns:consultarPersonasRequest>
          </tns:consultarPersonasRequest>
        </soapenv:Body>
      </soapenv:Envelope>`),
      headers: {
        'Content-Type': 'text/xml',
      },
    });
    if (response.ok) {
      const data = await response.text();
      const parseJs = new DOMParser();
      const xmlDoc = parseJs.parseFromString(data, "text/xml")
      const personasArrayXML = xmlDoc.querySelectorAll("result")
      const personasArray = Array.from(personasArrayXML).map(persona => {
        return {
          id: persona.querySelector("id").textContent,
          nombres: persona.querySelector("nombres").textContent,
          apellidos: persona.querySelector("apellidos").textContent,
          dni: persona.querySelector("dni").textContent,
        }
      })
      setPersonas(personasArray)
    } else {
      console.log(response);
    }
  };
  useEffect(() => {
    // Realizar llamada a http://localhost:8888/consultar_con_soap
    consultarPersonas();
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const nombres = formData.get('Nombres');
    const apellidos = formData.get('Apellidos');
    const dni = formData.get('DNI');
    const persona = {
      nombres,
      apellidos,
      dni,
    };
    fetch('http://localhost:8080/insertar_con_rest', {
      method: 'post',
      body: JSON.stringify(persona),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          consultarPersonas()
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div className='container-fluid mt-5'>
        <form className='w-75 mx-auto border border-secondary border-3 rounded p-2' onSubmit={handleSubmit}>
          <h1 className='text-center'>Registro de personas</h1>
          <div className="p-5">
            <input
              className='form-control my-1'
              type="text"
              name="Apellidos"
              placeholder="Apellidos"
            />
            <input
              className='form-control my-1'
              type="text"
              name="Nombres"
              placeholder="Nombres"
            />
            <input
              className='form-control my-1'
              type="number"
              name="DNI"
              placeholder="DNI"
            />
            <button type="submit"
              className='btn btn-success my-2 form-control'
            >Guardar</button>
            <label htmlFor="" className='text-center'>
              http://localhost:8080/insertar_con_rest
            </label>
          </div>
        </form>
        <br />
        <h2 className='text-center'>Listado de personas</h2>
        <h4 className='text-center'>
          http://localhost:8888/consultar_con_soap
        </h4>
        <br />
        <table className="table table-primary table-striped mx-auto w-75">
          <thead>
            <tr>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>DNI</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((persona) => (
              <tr key={persona?.id}>
                <td>{persona?.apellidos}</td>
                <td>{persona?.nombres}</td>
                <td>{persona?.dni}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
