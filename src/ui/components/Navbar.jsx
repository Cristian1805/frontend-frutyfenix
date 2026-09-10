import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './Navbar.css'

import { Link, NavLink, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();  // Declaración Navigate
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    
    useEffect(() => {
        console.log('Hola', localStorage.getItem('jwt')) 
        if (!localStorage.getItem('jwt')) {
            navigate('/login', {
                replace: true 
            });
        }
    }, [navigate]);  // Añadir navigate como dependencia

    const onLogout = () => {
        // Eliminar un elemento de localStorage 
        localStorage.removeItem('jwt');

        // Muestra la notificación de SweetAlert
        Swal.fire({
            title: 'Logout exitoso',
            text: 'Te has desconectado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            // Redirige a la página de inicio de sesión
            navigate('/login', {
                replace: true,
            });
        });
    };

    return (
        <div className='container-fluid'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-1">
            <Link className="navbar-brand" to="/">
                <img src="./iconos/avatar.png" alt="Logo" width="25" height="25"/> Inicio
            </Link>
        

            <button
                className="navbar-toggler"
                type="button"
                onClick={() => setIsNavCollapsed(!isNavCollapsed)}   
            >
                <span className="navbar-toggler-icon"></span> 
            </button>

            {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                <div className="navbar-nav">
                <NavLink
                className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                to="/tropicales"
                >
                    <div className="d-flex align-items-center">
                    <img
                        src="./iconos/convenio.png"
                        alt="Logo" 
                        width="20"
                        height="20"
                        className="me-2" // Espaciado a la derecha del icono
                    />
                    TROPICALES
                </div>
                </NavLink>

                <NavLink
                className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                to="/importadas" 
                >
                    <div className='d-flex align-items-center'>
                    <img
                        src="./iconos/caja-de-devolucion.png"
                        alt="Logo"
                        width="20"
                        height="20"
                        className="me-2" // Espaciado a la derecha del icono
                    />
                    IMPORTADAS
                    </div>
                </NavLink>

                <NavLink
                className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                to="/search"
                >
                    <div className='d-flex align-items-center'>
                    <img
                        src="./iconos/lupa.png"
                        alt="Logo"
                        width="20"
                        height="20"
                        className="me-2" // Espaciado a la derecha del icono
                    />
                    BUSCAR
                    </div>
                    </NavLink>

        
                <NavLink
                className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                to="/proveedores"
                >
                    <div className='d-flex align-items-center'>
                    <img
                        src="./iconos/grafico-de-barras.png"
                        alt="Logo"
                        width="20"
                        height="20"
                        className="me-2" // Espaciado a la derecha del icono
                    />
                    PROVEEDORES
                    </div>
                </NavLink>

                <NavLink
                className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                to="/reportes"
                >
                    <div className='d-flex align-items-center'>
                    <img
                        src="./iconos/devoluciones-icono.png"
                        alt="Logo"
                        width="20"
                        height="20"
                        className="me-2" // Espaciado a la derecha del icono
                    />
                        REPORTES
                    </div>
                </NavLink>

                <NavLink
                className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                to="/registro-usuario"
                >
                    <div className='d-flex align-items-center'>
                    <img
                        src="./iconos/avatar.png"
                        alt="Logo"
                        width="20"
                        height="20"
                        className="me-2" // Espaciado a la derecha del icono
                    />
                    REGISTRAR USUARIO
                    </div>
                </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span className="navbar-brand">
                        Cristhian Lozano
                    </span> 

                    <button
                        className="btn btn-outline-danger"
                        onClick={onLogout} 
                    >
                        Logout
                    </button> 
                </ul> 
            </div>
        </nav>
        </div> 
    )
} 

