import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faCalendar, faShoppingBasket, faConciergeBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../styles/estilos_barra.css'; // Asegúrate de que la ruta sea correcta


const BarraNormal = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLinkClick = (event) => {
      event.preventDefault();
      Swal.fire({
          icon: 'info',
          title: '¡Atención!',
          text: 'Debes iniciar sesión o registrate para realizar esta acción.',
          confirmButtonText: 'Aceptar',
          customClass: {
              confirmButton: 'swal2-confirm-button' // Aplicar la clase personalizada
          }
      });
    };
  

    return (
        <div className="flex flex-col items-center justify-center mb-28">
            <nav className="flex justify-between items-center py-4 navbar_gradient backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-10 h-24 px-8 ">
                {/* Logo Container */}
                <div className="flex items-center space-x-4 ml-2">
                    <Link className="flex items-center" to="/">
                        <img className="h-20 object-cover" src="https://i.ibb.co/gj0Bpcc/logo-empresa-mila.png" alt="logo-empresa-mila" />
                    </Link>
                </div>

                {/* Button for mobile menu */}
                <button
                    id="mobile-menu-button"
                    type="button"
                    className="inline-flex items-center p-2 text-sm text-black-500 rounded-lg lg:hidden hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                    onClick={handleMobileMenuToggle}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                    </svg>
                </button>

                {/* Desktop Menu */}
                <div id="desktop-menu" className={`hidden lg:flex flex-col lg:flex-row lg:items-center lg:space-x-12 space-y-2 lg:space-y-0 ml-24`}>
                    <Link to="/"  className="flex items-center text-gray-900 hover:text-yellow-800 cursor-pointer transition-colors duration-300 font-semibold no-underline">
                        <FontAwesomeIcon icon={faHome} className="mr-2" /> Inicio
                    </Link>
                    <Link to="/productos" onClick={handleLinkClick} className="flex items-center text-gray-900 hover:text-yellow-800 cursor-pointer transition-colors duration-300 font-semibold no-underline">
                        <FontAwesomeIcon icon={faBox} className="mr-2" /> Productos
                    </Link>
                    <Link to="/reservas" onClick={handleLinkClick} id="reservas-button" className="flex items-center text-gray-900 hover:text-yellow-800 cursor-pointer transition-colors duration-300 font-semibold no-underline">
                        <FontAwesomeIcon icon={faCalendar} className="mr-2" /> Reservas
                    </Link>
                    <Link to="/pedidos" onClick={handleLinkClick} className="flex items-center text-gray-900 hover:text-yellow-800 cursor-pointer transition-colors duration-300 font-semibold no-underline">
                        <FontAwesomeIcon icon={faShoppingBasket} className="mr-2" /> Pedidos
                    </Link>
                    <Link to="/eventos" onClick={handleLinkClick} className="flex items-center text-gray-900 hover:text-yellow-800 cursor-pointer transition-colors duration-300 font-semibold no-underline">
                        <FontAwesomeIcon icon={faCalendar} className="mr-2" /> Eventos
                    </Link>
                    <Link to="/servicios"  className="flex items-center text-gray-900 hover:text-yellow-800 cursor-pointer transition-colors duration-300 font-semibold no-underline">
                        <FontAwesomeIcon icon={faConciergeBell} className="mr-2" /> Servicios
                    </Link>
                </div>

                {/* User Links */}
                <div className="flex items-center space-x-6">
                    <Link to="/RegistroCliente" className="flex text-gray-900 hover:text-yellow-900 cursor-pointer transition-colors duration-300">
                        <svg className="fill-current h-5 w-5 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 0L11.34 .03L15.15 3.84L16.5 2.5C19.75 4.07 22.09 7.24 22.45 11H23.95C23.44 4.84 18.29 0 12 0M12 4C10.07 4 8.5 5.57 8.5 7.5C8.5 9.43 10.07 11 12 11C13.93 11 15.5 9.43 15.5 7.5C15.5 5.57 13.93 4 12 4M12 6C12.83 6 13.5 6.67 13.5 7.5C13.5 8.33 12.83 9 12 9C11.17 9 10.5 8.33 10.5 7.5C10.5 6.67 11.17 6 12 6M.05 13C.56 19.16 5.71 24 12 24L12.66 23.97L8.85 20.16L7.5 21.5C4.25 19.94 1.91 16.76 1.55 13H.05M12 13C8.13 13 5 14.57 5 16.5V18H19V16.5C19 14.57 15.87 13 12 13M12 15C14.11 15 15.61 15.53 16.39 16H7.61C8.39 15.53 9.89 15 12 15Z" />
                        </svg>
                        Registrate
                    </Link>
                    <Link to="/login" className="flex text-gray-900 hover:text-yellow-900 cursor-pointer transition-colors duration-300">
                        <svg className="fill-current h-5 w-5 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
                        </svg>
                        Ingresar
                    </Link>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div id="mobile-menu" className={`lg:hidden fixed top-24 left-0 right-0 bg-white shadow-lg z-50 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
                <Link to="/"  className="block px-4 py-2 text-gray-900 hover:bg-yellow-200 no-underline">
                    <FontAwesomeIcon icon={faHome} className="mr-2" /> Inicio
                </Link>
                <Link to="/productos" onClick={() => { handleLinkClick(); setMobileMenuOpen(false); }} className="block px-4 py-2 text-gray-900 hover:bg-yellow-200 no-underline">
                    <FontAwesomeIcon icon={faBox} className="mr-2" /> Productos
                </Link>
                <Link to="/reservas" onClick={() => { handleLinkClick(); setMobileMenuOpen(false); }} id="mobile-reservas-button" className="block px-4 py-2 text-gray-900 hover:bg-yellow-200 no-underline">
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" /> Reservas
                </Link>
                <Link to="/pedidos" onClick={() => { handleLinkClick(); setMobileMenuOpen(false); }} className="block px-4 py-2 text-gray-900 hover:bg-yellow-200 no-underline">
                    <FontAwesomeIcon icon={faShoppingBasket} className="mr-2" /> Pedidos
                </Link>
                <Link to="/eventos" onClick={() => { handleLinkClick(); setMobileMenuOpen(false); }} className="block px-4 py-2 text-gray-900 hover:bg-yellow-200 no-underline">
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" /> Eventos
                </Link>
                <Link to="/servicios"  className="block px-4 py-2 text-gray-900 hover:bg-yellow-200 no-underline">
                    <FontAwesomeIcon icon={faConciergeBell} className="mr-2" /> Servicios
                </Link>
            </div>
        </div>
    );
};

export default BarraNormal;