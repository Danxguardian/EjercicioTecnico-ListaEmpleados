import React, { useState, useEffect } from 'react';

function App() {
  const [listaEmpleados, setListaEmpleados] = useState([])
  const [tipoSalario, setTipoSalario] = useState("MXN")
  const [mostrarAgregar, setMostrarAgregar] = useState(false)
  const [mostrarEditar, setMostrarEditar] = useState(false)
  const tipoCambio = 21.50


  const [nombreEmpleado, setNombreEmpleado] = useState("")
  const [empresa, setEmpresa] = useState("")
  const [salario, setSalario] = useState(0)
  //  
  const agregarEmpleado = () => {
    console.log("agregarEmpleado")
    let nListaEmpleado = listaEmpleados
    nListaEmpleado.push({ nombre: nombreEmpleado, empresa: empresa, salario: salario })
    console.log(nListaEmpleado)
    setListaEmpleados(nListaEmpleado)
    setNombreEmpleado("")
    setEmpresa("")
    setSalario(0)
    setMostrarAgregar(false)
  }

  const editarEmpleados = () => {
    console.log("editarEmpleados")
  }


  const handleDataRow = (row, input, value, index) => {
    //handleDataRow(element,"nombre", event.target.value, index)
    console.log(row, input, value, index)
    let newState = {...listaEmpleados};    
    newState[index][input] = value
    console.log(newState)
    //setListaEmpleados(newState);
  }

  const cambiarTipoCambio = () => {
    console.log("cambiarTipoCambio")
    console.log(tipoSalario)
    if (tipoSalario === "MXN")
      setTipoSalario("USD")
    else
      setTipoSalario("MXN")
  }

  const dolarAmericano = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  const pesoMexicano = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  })

  useEffect(() => { }, [listaEmpleados]);
  return (
    <div className="w-full px-8 text-2xl">
      <div className="flex mt-8 space-x-4 border-b-4 border-green-500 ">
        <div className="text-2xl">Total Empleados: {listaEmpleados.length}</div>
        <div className="text-2xl">Salario Mostrado En: {tipoSalario}</div>
      </div>
      <div className="flex float-right mt-8 space-x-4 ">
        <button className={"bg-transparent text-green-500 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-500"} onClick={() => { setMostrarAgregar(true); setMostrarEditar(false) }}>Agregar Empleados</button>
        <button className={"bg-transparent text-green-500 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-500"} onClick={() => { setMostrarEditar(true); setMostrarAgregar(false) }}  >Editar Empleados</button>
        <button className={"bg-transparent text-green-500 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-500"} onClick={() => { cambiarTipoCambio() }}>{tipoSalario}</button>
      </div>
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="w-1/2 px-4 py-2">NOMBRE COMPLETO</th>
            <th className="w-1/4 px-4 py-2">EMPRESA</th>
            <th className="w-1/4 px-4 py-2">SALARIO</th>
          </tr>
        </thead>
        <tbody>
          {
            listaEmpleados.length == '' ?
              <tr>
                <td colSpan={3} className="text-center">
                  No se cuenta con registros
                </td>
              </tr>
              :

              mostrarEditar ?
                listaEmpleados.map((element, index) => (
                  <tr>
                    <td className="px-4 py-2 border">
                      <input className="w-full px-4 py-2 border-2 border-blue-500 hover:border-red-500" type="text" name="nombre" placeholder="Ingrese Nombre" defaultValue={element.nombre} onChange={() => {handleDataRow(element,"nombre", event.target.value, index) }} />
                    </td>
                    <td className="px-4 py-2 border">{element.empresa}</td>
                    <td className="px-4 py-2 border">
                      <input className="w-full px-4 py-2 border-2 border-blue-500 hover:border-red-500" type="text" name="salario" placeholder="Ingrese Salario" defaultValue={element.salario} onChange={() => {handleDataRow(element,"salario", event.target.value, index) }} />
                    </td>
                  </tr>
                ))
                :                
                listaEmpleados.map((element, index) => (
                  <tr className=" hover:bg-blue-100">
                    <td className="px-4 py-2 border">{element.nombre}</td>
                    <td className="px-4 py-2 border">{element.empresa}</td>
                    <td className={"px-4 py-2 text-right border " + (element.salario < 10000 ? "text-red-500" : "text-green-400")}>{
                      tipoSalario == "MXN" ?
                        pesoMexicano.format(element.salario)
                        :
                        dolarAmericano.format(element.salario / tipoCambio)
                    }</td>
                  </tr>
                ))

          }
          {mostrarAgregar ?
            <tr>
              <td>
                <input className="w-full px-4 py-2 border-2 border-blue-500 hover:border-red-500" type="text" name="nombre" placeholder="Ingrese Nombre" value={nombreEmpleado} onChange={() => { setNombreEmpleado(event.target.value) }} />
              </td>
              <td>
                <input className="w-full px-4 py-2 border-2 border-blue-500 hover:border-red-500" type="text" name="empresa" placeholder="Ingrese Empresa" value={empresa} onChange={() => { setEmpresa(event.target.value) }} />
              </td>
              <td>
                <input className="w-full px-4 py-2 border-2 border-blue-500 hover:border-red-500" type="text" name="salario" placeholder="Ingrese Salario" value={salario} onChange={() => { setSalario(event.target.value) }} />
              </td>
            </tr>
            :
            null
          }
        </tbody>
      </table>
      <div>
        {mostrarAgregar ?
          <div className="flex float-right mt-8 space-x-4 ">
            <button className={"bg-transparent text-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded border-2 border-red-500"} onClick={() => setMostrarAgregar(false)}>Cancelar</button>
            <button className={"bg-transparent text-green-500 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-500"} onClick={() => agregarEmpleado()}>Agregar Empleado</button>
          </div>
          :
          null
        }
        {mostrarEditar ?
        <div className="flex float-right mt-8 space-x-4 ">          
          <button className={"bg-transparent text-green-500 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-500"} onClick={() => setMostrarEditar(false)} >Terminar Edición</button>
        </div>
        :
        null
        }
      </div>
    </div >

  );




};

export default App;