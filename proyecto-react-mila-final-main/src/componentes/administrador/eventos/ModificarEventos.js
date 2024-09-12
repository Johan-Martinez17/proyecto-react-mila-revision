import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const GestionEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');
  const [ordenFecha, setOrdenFecha] = useState('asc');

  useEffect(() => {
    axios.get('http://localhost:3000/eventos')
      .then(response => {
        setEventos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cargar los eventos.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }, []);

  const filtrarEventos = () => {
    let eventosFiltrados = eventos.filter(evento => {
      const porCategoria = filtroCategoria ? evento.categoria === filtroCategoria : true;
      const porNombre = evento.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
      return porCategoria && porNombre && evento.estado === 'activo';
    });

    eventosFiltrados.sort((a, b) => {
      return ordenFecha === 'asc'
        ? new Date(a.fecha) - new Date(b.fecha)
        : new Date(b.fecha) - new Date(a.fecha);
    });

    return eventosFiltrados;
  };

  const eliminarEvento = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción desactivará el evento.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`http://localhost:3000/eventos/${id}`, { estado: 'inactivo' })
          .then(() => {
            setEventos(eventos.map(evento =>
              evento.id === id ? { ...evento, estado: 'inactivo' } : evento
            ));
            Swal.fire(
              'Desactivado!',
              'El evento ha sido desactivado.',
              'success'
            );
          })
          .catch(error => {
            console.error('Error al desactivar el evento:', error);
            Swal.fire(
              'Error',
              'No se pudo desactivar el evento.',
              'error'
            );
          });
      }
    });
  };

  const eventosFiltrados = filtrarEventos();

  const TarjetaEvento = ({ evento }) => (
    <div className="rounded overflow-hidden shadow-lg flex flex-col transform hover:scale-105 transition duration-300 ease-in-out mt-12">
      <div className="relative">
        <img className="w-full" src={evento.imagen} alt={evento.nombre} />
        <div className="absolute inset-0 bg-gray-900 opacity-25 hover:bg-transparent transition duration-300"></div>
        <Link  className="text-xs absolute top-0 right-0 bg-yellow-500 px-4 py-2 text-black mt-3 mr-3 transition duration-500 ease-in-out no-underline">
          {evento.categoria}
        </Link>
      </div>
      <div className="px-6 py-4 flex-1">
        <Link className="text-gray-900 font-medium text-lg inline-block hover:text-yellow-500 transition duration-500 ease-in-out mb-2 no-underline">
          {evento.nombre}
        </Link>
        <p className="text-gray-500 text-sm mb-2">{evento.descripcion}</p>
        <p className="text-gray-900 font-semibold text-lg"> {new Date(evento.fecha).toLocaleDateString()} </p>
      </div>
      <div className="px-6 py-3 flex items-center justify-between bg-gray-100">
        <button
          onClick={() => eliminarEvento(evento.id)}
          className="flex items-center bg-yellow-500 hover:bg-red-700 text-black px-4 py-2 rounded transition duration-500 ease-in-out">
          <FontAwesomeIcon icon={faTrash} className="mr-2 text-black" />
          Desactivar
        </button>
        <Link
          to={`/editar-evento/${evento.id}`}
          className="flex  no-underline items-center bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded transition duration-500 ease-in-out">
          <FontAwesomeIcon icon={faEdit} className="mr-2 text-black" />
          Editar
        </Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="border-b mb-5 flex justify-between text-sm">
        <div className="text-black flex items-center pb-2 pr-2 border-b-2 border-black uppercase">
          <span className="font-semibold inline-block">Filtrar por categoría</span>
        </div>
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="text-black hover:underline"
        >
          <option value="">Todas</option>
          <option value="charlas">Charlas</option>
          <option value="teatro">Teatro</option>
          <option value="deportes">Deportes</option>
          <option value="culturales">Culturales</option>
          <option value="festivales">Festivales</option>
        </select>
      </div>

      {/* Filtros por nombre y botón de ordenar por fecha */}
      <div className="mb-5 flex justify-between items-center space-x-4">
        <input
          type="text"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          placeholder="Buscar por nombre"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => setOrdenFecha(ordenFecha === 'asc' ? 'desc' : 'asc')}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded transition duration-500 ease-in-out"
        >
          Ordenar por fecha: {ordenFecha === 'asc' ? 'Más Antigua a Más Reciente' : 'Más Reciente a Más Antigua'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {eventosFiltrados.map(evento => (
          <TarjetaEvento key={evento.id} evento={evento} />
        ))}
      </div>
    </div>
  );
};

export default GestionEventos;
