import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import BarraCliente from '../../barras/BarraCliente';
import Footer from "../../Footer/footer";

const FormularioInscripcion = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [total, setTotal] = useState('');
  const [numerodoc, setNumeroDoc] = useState('');
  const { eventoId } = useParams(); // Obtener el ID del evento desde la URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de formulario
    if (!nombre || !email || !metodoPago || !total || !numerodoc) {
      return Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
    }

    const nombreLength = nombre.length;
    if (nombreLength < 10 || nombreLength > 30) {
      return Swal.fire('Error', 'El nombre debe tener entre 10 y 30 caracteres.', 'error');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Swal.fire('Error', 'Ingrese una dirección de correo válida.', 'error');
    }

    if (!numerodoc.trim() || !/^\d{10}$/.test(numerodoc)) {
      return Swal.fire("Error", 'El número de documento debe ser válido.', 'error');
    }

    try {
      const formData = {
        nombre,
        numerodoc,
        email,
        eventoId,
        metodoPago,
        total
      };

      await axios.post('http://localhost:3000/inscritos', formData);
      Swal.fire('¡Éxito!', 'La reserva ha sido registrada correctamente.', 'success');
      navigate('/EventosCliente'); // Redirigir al usuario a la página de eventos
    } catch (error) {
      console.error('Error al inscribirse:', error);
      Swal.fire('Error', 'No se pudo completar la inscripción.', 'error');
    }
  };

  return (
    <div>
      <div className="max-w-screen-md mx-auto p-5 sm:p-10 md:p-16">
        <BarraCliente />
        <h1 className="text-4xl font-bold text-center mb-6 text-black">Inscripción al Evento</h1>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="numerodoc">
              Número de Documento
            </label>
            <input
              name="numerodoc"
              type="text"
              value={numerodoc}
              onChange={(e) => setNumeroDoc(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="metodoPago">
              Método de Pago
            </label>
            <select
              id="metodoPago"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            >
              <option value="">Seleccione un método de pago</option>
              <option value="tarjeta">Tarjeta de Crédito/Débito</option>
              <option value="paypal">PayPal</option>
              <option value="transferencia">Transferencia Bancaria</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="total">
              Total
            </label>
            <input
              type="number"
              id="total"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-300 transition duration-500 ease-in-out"
          >
            Inscribirse
          </button>
        </form>
        
      </div>
    <Footer></Footer>
  </div>
);
};

export default FormularioInscripcion;
