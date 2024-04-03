import axios from '../../../Utils/BaseUrlAxio'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillHome, AiFillPhone, AiOutlineUser, AiTwotoneMail } from 'react-icons/ai'
import { BiHomeAlt, BiSolidCity } from 'react-icons/bi'
import { FaMoneyBillWave } from "react-icons/fa";
import { HiIdentification } from 'react-icons/hi'
import { ModalsLayout } from '../../Modals/ModalsLayout'
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from 'recharts'
import { RiCellphoneFill } from 'react-icons/ri'
import './stylesInfoClientes.css'
import { PropsTercero } from '../TablePortafolios/TablePortafolios';
import { FormateoNumberInt } from '../../../Utils/Helpers';
import { PermisosContext } from '../../../context/permisosContext';

type InfoProps = {
    setviewInfoCliente: React.Dispatch<React.SetStateAction<boolean>>
    cedula: string
    setviewGestionesCliente: React.Dispatch<React.SetStateAction<boolean>>
    setidClienteGestiones: React.Dispatch<React.SetStateAction<PropsTercero>>
}

type ClienteData = {
    tipoId: string
    idTercero: string
    nombre: string
    nomCcial: string
    direcc1: string
    direcc2: string | null
    tel: string
    cel: string
    tel2: string | null
    intPlazo: number
    estado: string
    ciudad: string
    emailFE: string
    cupo: string
    flete: string
    descuento: string
    precioTercero: number
    descTipoTercero: string
    cartera: number | string | null
    observacion: string
}

type contactos = {
    StrTercero: string,
    StrNombres: string,
    StrApellidos: string,
    pago: string,
    compra: string
    strTelefono: string
}

export const InfoClientesPortafolio: React.FC<InfoProps> = ({ setviewInfoCliente, cedula, setviewGestionesCliente, setidClienteGestiones }) => {

    const [dataCliente, setdataCliente] = useState({} as ClienteData)
    const [dataGraficaProductos, setdataGraficaProductos] = useState([])
    const [cartera, setCartera] = useState(0)
    const [loadingGrafico, setloadingGrafico] = useState(true)
    const [contactos, setcontactos] = useState<contactos[]>([])
    const { permisos } = useContext(PermisosContext)
    const getRandomColor = () => {
        // Genera un color aleatorio en formato hexadecimal
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    useEffect(() => {
        GetDataClientes()
    }, [])


    const GetDataClientes = () => {
        axios.get(`/portafolios/data/Cliente/${cedula}`)
            .then((response) => {
                setcontactos(response.data.contactos)
                setCartera(response.data.cartera)
                setdataCliente(response.data.data)
                setdataGraficaProductos(response.data.grafica)
                setloadingGrafico(false)
            }).catch((err) => {
                console.error(err)
            })
    }

    const openModalGestiones = () => {
        setviewGestionesCliente(true)
        setviewInfoCliente(false)
        setidClienteGestiones({
            strNombre: dataCliente.nombre,
            stridCedula: cedula
        })
    }

    return (
        <ModalsLayout CloseEvent={setviewInfoCliente}>
            <div className='overflow-y-scroll infoCliente_Container '>
                <div className='flex flex-col items-center px-6 border-r-2 justify-evenly'>
                    <div className='flex items-center justify-center p-4 m-6 rounded-full bg-sky-800'>
                        <AiOutlineUser size={60} color={"white"} />
                    </div>
                    <div>
                        <p className='text-lg font-bold'>{dataCliente.nombre}</p>
                        <div className='flex items-center mt-5'>
                            <span className='mr-5'><HiIdentification size={20} /></span>
                            <span>{dataCliente.tipoId} - {dataCliente.idTercero}</span>
                        </div>
                        {/* {
                            (dataCliente.nomCcial).toString().trim() !== "" &&(
                                <p>{dataCliente.nomCcial}</p>
                            )
                        } */}
                        {
                            dataCliente.tel !== "" && (
                                <div className='flex items-center mt-5'>
                                    <span style={{ marginRight: '20px' }}><AiFillPhone size={20} /></span>
                                    <span>{dataCliente.tel}</span>
                                </div>
                            )
                        }
                        {
                            (dataCliente.cel !== "" && dataCliente.cel !== null) && (
                                <div className='flex items-center mt-5'>
                                    <span style={{ marginRight: '20px' }}><RiCellphoneFill size={20} /></span>
                                    <span>{dataCliente.cel}</span>
                                </div>
                            )
                        }
                        {
                            (dataCliente.direcc1 !== "" && dataCliente.direcc1 !== null) && (
                                <div className='flex items-center mt-5'>
                                    <span style={{ marginRight: '20px' }}><AiFillHome size={20} /></span>
                                    <span>{dataCliente.direcc1}</span>
                                </div>
                            )
                        }

{
                            (dataCliente.direcc2 !== "" && dataCliente.direcc2 !== null) && (
                                <div className='flex items-center w-64 mt-4 overflow-hidden'>
                                    <span style={{ marginRight: '20px' }}><BiHomeAlt size={20} /></span>
                                    <span className='break-all'>{dataCliente.direcc2}</span>
                                </div>
                            )
                        }
                        <div className='flex items-center mt-5'>
                            <span className='mr-5'><BiSolidCity size={20} /></span>
                            <span>{dataCliente.ciudad}</span>
                        </div>
                        {
                            (dataCliente.emailFE !== "" && dataCliente.emailFE !== null) && (
                                <div className='flex items-center mt-5'>
                                    <span style={{ marginRight: '20px' }}><AiTwotoneMail size={20} /></span>
                                    <span>{dataCliente.emailFE}</span>
                                </div>
                            )
                        }
                        <div className='flex items-center mt-5'>
                            <span className='mr-5'><FaMoneyBillWave size={20} /></span>
                            <span>Precio {dataCliente.precioTercero}</span>
                        </div>
                    </div>
                    <button className='w-auto px-12 py-2 my-12 text-white rounded bg-sky-800' onClick={() => { setviewInfoCliente(false) }}>Cerrar</button>

                </div>

                <div className='flex flex-col items-center px-12 font-bold border-r-2 lg:w-1/2 md:items-stretch'>
                    <h1 className='my-3 text-3xl text-center'>INFORMACION GENERAL</h1>

                    <section className='grid gap-4 py-4 sm:grid-cols-3'>
                        <div className='flex flex-col items-center'>
                            <h4 className='text-lg font-bold text-sky-800'>Cupo</h4>
                            <span className='text-sm'>{FormateoNumberInt(dataCliente.cupo)}</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h4 className='text-lg font-bold text-sky-800'>Cartera</h4>
                            <span className='text-sm'>{FormateoNumberInt(cartera.toFixed(2))}</span>
                        </div>

                        <div className='flex flex-col items-center'>
                            <h4 className='text-lg font-bold text-sky-800'>Plazo</h4>
                            <span className='text-sm'>{dataCliente.intPlazo}</span>
                        </div>


                    </section>

                    <section className='grid py-4 border-b-2 border-gray-400 sm:grid-cols-2'>
                        <div className='flex flex-col items-center'>
                            <h4 className='text-lg font-bold text-sky-800'>Flete</h4>
                            <span className='text-sm truncate w-26'>{dataCliente.flete}</span>
                        </div>


                        <div className='flex flex-col items-center'>
                            <h4 className='text-lg font-bold text-sky-800'>Descuento</h4>
                            <span className='text-sm'>{dataCliente.descuento}</span>
                        </div>
                    </section>

                    <section className='flex flex-col my-6'>
                        {/*  <h3 className='text-xl font-bold text-sky-800'>Top productos mas comprados</h3> */}
                        {
                            dataCliente.observacion && (<p className='text-lg font-bold  text-sky-800'>Observación: <span className='text-sm text-center text-black'>{dataCliente.observacion}</span></p>)
                        }

                        {
                            permisos.find((permiso) => permiso.id_permiso == 15) && (
                                contactos.length > 0 && (
                                    <article className='px-2 my-2 border border-slate-300'>
                                        <h2 className='my-3 text-xl'>Contactos</h2>
                                        <div className='flex flex-col gap-y-2'>
                                            {
                                                contactos.map((contacto, index) => (
                                                    <div key={index} className='flex justify-between py-2 gap-x-2 border-y-2'>
                                                        <article className='flex gap-x-4'>
                                                            <span>{contacto.strTelefono}</span>
                                                            <span>{contacto.StrNombres} {contacto.StrApellidos}</span>
                                                        </article>

                                                        <article className='flex gap-x-3'>
                                                            <span className='text-lg font-bold text-sky-800'>{(contacto.compra && contacto.compra.toString() !== "Vacio") && contacto.compra}</span>
                                                            <span className='text-lg font-bold text-sky-800'>{(contacto.pago && contacto.pago.toString() !== "Vacio") && contacto.pago}</span>
                                                        </article>


                                                    </div>
                                                ))
                                            }
                                        </div>

                                    </article>
                                )
                            )

                        }


                        <button onClick={openModalGestiones} className='px-4 py-2 text-xl font-bold text-white rounded bg-sky-800'>Agregar Gestión</button>
                    </section>
                </div>

                <div className='flex flex-col items-center justify-center px-6'>
                    <h3>Clases mas compradas</h3>

                    {
                        !loadingGrafico ? (
                            dataGraficaProductos.length !== 0 ? (
                                <ResponsiveContainer height={400} width={250}>
                                    <PieChart>
                                        <Legend />

                                        <Pie
                                            dataKey={"TotalCantidad"}
                                            data={dataGraficaProductos}
                                            innerRadius={50}
                                            outerRadius={120}
                                            nameKey={"StrDescripcion"}
                                        >

                                            {
                                                dataGraficaProductos.map((item, index) => (
                                                    <Cell key={`${index}-${item}`} fill={getRandomColor()}></Cell>
                                                ))
                                            }

                                        </Pie>
                                        <Tooltip />

                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <h1>Sin datos</h1>
                            )

                        ) :
                            (
                                <h1>Cargando..</h1>
                            )
                    }
                </div>

            </div>
        </ModalsLayout>
    )
}
