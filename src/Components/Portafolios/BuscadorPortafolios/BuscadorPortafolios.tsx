import axios from '../../../Utils/BaseUrlAxio'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import './BuscadorPortafolios.css'

interface IDataPropsPortafolio {
    Estado: string
    Nombre_tercero: string,
    StrIdTercero: string
    Viaja: string
    ciudad: string
    ultima_Compra: number
}

type propsBuscador = {
    setdatosClientes: React.Dispatch<React.SetStateAction<IDataPropsPortafolio[] | null>>
    cedulaVendedor: string
}

type Tciudades = {
    StrDescripcion: string
    StrIdCiudad: string
}

export const BuscadorPortafolios: React.FC<propsBuscador> = ({ setdatosClientes, cedulaVendedor }) => {

    const [inputValue, setinputValue] = useState('')
    const [selectValue, setselectValue] = useState<string>("0")
    const [arrayCiudades, setarrayCiudades] = useState<Tciudades[] | null>(null)

    useEffect(() => {
        if (cedulaVendedor) {
            consultarCiudadesVendedor()
        }
    }, [cedulaVendedor])

    const consultarListaClientesXVendedorXNombre = () => {
        axios.post(`/portafolios/nombre`, {
            vendedorId: cedulaVendedor,
            clienteNombre: inputValue
        }).then((response) => {
            setdatosClientes(response.data.data)
        }).catch((err) => {
            console.error(err)
        })
    }

    const consultarListaClientesXVendedorXCedula = () => {
        axios.post(`/portafolios/id`, {
            vendedorId: cedulaVendedor,
            clienteId: inputValue
        }).then((response) => {
            setdatosClientes(response.data.data)
        }).catch((err) => {
            console.error(err)
        })
    }

    const consultarCiudadesVendedor = () => {
        axios.post('/portafolios/ciudades', {
            vendedorId: cedulaVendedor,
        }).then((response) => {
            setarrayCiudades(response.data.data)
        }).catch((err) => {
            console.error(err)
        })
    }

    const consultarClientesXciudad = (ciudadId: string) => {
        if (ciudadId !== "0") {
            axios.post('/portafolios/clientes_ciudades', {
                ciudadId
            }).then((response) => {
                setdatosClientes(response.data.data)
            }).catch((err) => {
                console.error(err)
            })
        } else {
            consultarListaClientesXVendedorXNombre()
        }

    }

    const BuscarCliente = () => {
        switch (selectValue) {
            case '0':
                consultarListaClientesXVendedorXNombre()
                break;

            case '1':
                consultarListaClientesXVendedorXCedula()
                break;

            default:
                consultarListaClientesXVendedorXNombre()
                break;
        }
    }

    arrayCiudades?.sort((a, b) => {
        if (a.StrDescripcion < b.StrDescripcion) {
            return -1;
        }
        if (a.StrDescripcion > b.StrDescripcion) {
            return 1;
        }
        return 0;
    });

    return (
        <section className='pt-4'>
            <div className='flex flex-row gap-x-4'>
                <select onChange={(e) => { setselectValue(e.target.value) }} className='py-2 px-4 my-2 w-full md:w-1/2 border border-sky-950 rounded-3xl relative items-center'>
                    <option value={0}>Nombre</option>
                    <option value={1}>Cedula</option>
                </select>

                {
                    arrayCiudades !== null && (
                        <>
                            <select defaultValue={0} onChange={(e) => { consultarClientesXciudad(e.target.value) }} className='py-2 px-4 my-2 w-full md:w-1/2 border border-sky-950 rounded-3xl relative items-center'>
                                <option value={0}>Todas</option>
                                {
                                    arrayCiudades.map((ciudad) => (
                                        <option key={ciudad.StrIdCiudad} value={ciudad.StrIdCiudad}>{ciudad.StrDescripcion}</option>
                                    ))
                                }
                            </select>
                        </>
                    )
                }
            </div>

            <div className='flex my-4 w-full md:w-1/2 border border-sky-950 rounded-3xl relative items-center'>
                <input
                    type='text'
                    className='w-full px-4 py-2 bg-transparent outline-none'
                    onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                            BuscarCliente()
                        }
                    }}
                    value={inputValue}
                    onChange={(e) => {
                        setinputValue(e.target.value)
                    }}
                    placeholder={`Digite ${selectValue === "0" ? "un nombre" : "una cedula"}`}
                />
                <span className='absolute right-3 p-2 cursor-pointer hover:text-lime-500 transition-all duration-300' onClick={BuscarCliente}><AiOutlineSearch size={24} /></span>
            </div>

        </section>
    )
}
