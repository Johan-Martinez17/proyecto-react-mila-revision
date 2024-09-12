import React, { useState, useEffect } from 'react';
import Axios from 'axios';

// Supongamos que obtenemos el número de documento del usuario desde algún contexto o prop
const GestionReservasCliente = ({ numeroDocumento }) => {
    const [reservas, setReservas] = useState([]);
    const [filteredReservas, setFilteredReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/reservas');
                // Filtramos las reservas para el cliente actual
                const reservasCliente = response.data.filter(reserva => reserva.numerodoc === numeroDocumento);
                setReservas(reservasCliente);
                setFilteredReservas(reservasCliente); // Inicialmente, mostrar todas las reservas filtradas
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [numeroDocumento]);

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Hubo un error: {error}</p>;

    return (
        <div>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Mis Reservas</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
            <div className="w-full bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Mis Reservas</h2>
                <p className="text-gray-600 mb-6">Visualiza las reservas realizadas a tu nombre</p>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-left text-sm text-gray-600">
                                <th className="py-2 px-4 border-b border-yellow-400">Nombre</th>
                                <th className="py-2 px-4 border-b border-yellow-400">Documento</th>
                                <th className="py-2 px-4 border-b border-yellow-400">Teléfono</th>
                                <th className="py-2 px-4 border-b border-yellow-400">Correo</th>
                                <th className="py-2 px-4 border-b border-yellow-400">Número de personas</th>
                                <th className="py-2 px-4 border-b border-yellow-400">Fecha</th>
                                <th className="py-2 px-4 border-b border-yellow-400">Hora de inicio</th>
                                <th className="py-2 px-4 border-b border-yellow-400">Decoración</th>
                                <th className="py-2 px-4 border-b border-yellow-400">Actividades</th>
                                <th className="py-2 px-4 border-b border-yellow-400">Comentarios</th>
                                <th className="py-2 px-4 border-b border-yellow-400">Estado</th>
                                <th className="py-2 px-4 border-b border-yellow-400">Tipo de Reserva</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReservas.map(reserva => (
                                <tr key={reserva.id} className="border-t border-yellow-400">
                                    <td className="py-2 px-4">{reserva.nombre}</td>
                                    <td className="py-2 px-4">{reserva.numerodoc}</td>
                                    <td className="py-2 px-4">{reserva.celular}</td>
                                    <td className="py-2 px-4">{reserva.correo}</td>
                                    <td className="py-2 px-4">{reserva.numeroPersonas}</td>
                                    <td className="py-2 px-4">{reserva.fecha}</td>
                                    <td className="py-2 px-4">{reserva.horaInicio}</td>
                                    <td className="py-2 px-4">{reserva.decoracion}</td>
                                    <td className="py-2 px-4">{reserva.actividades}</td>
                                    <td className="py-2 px-4">{reserva.comentarios}</td>
                                    <td className="py-2 px-4">{reserva.estado_reserva}</td>
                                    <td className="py-2 px-4">{reserva.tipo_reserva}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
               
            </div>
        </div>
    );
};

export default GestionReservasCliente;
