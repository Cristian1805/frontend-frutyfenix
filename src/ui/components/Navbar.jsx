import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';

import './Navbar.css';

const MenuIcon = () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="m6 6 12 12M18 6 6 18" />
    </svg>
);

const LogoutIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M10 17 15 12 10 7" />
        <path d="M15 12H3M21 19V5a2 2 0 0 0-2-2h-6" />
    </svg>
);

const getInitials = (name) => name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

export const Navbar = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const userName = localStorage.getItem('user-name') || 'Usuario autenticado';

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    useEffect(() => {
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setIsSidebarOpen(false);
        };

        document.body.classList.toggle('sidebar-is-open', isSidebarOpen);
        window.addEventListener('keydown', closeOnEscape);

        return () => {
            document.body.classList.remove('sidebar-is-open');
            window.removeEventListener('keydown', closeOnEscape);
        };
    }, [isSidebarOpen]);

    const closeSidebar = () => setIsSidebarOpen(false);

    const onLogout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('jwt-init-date');
        localStorage.removeItem('user-name');

        Swal.fire({
            title: 'Sesión cerrada',
            text: 'Te has desconectado correctamente.',
            icon: 'success',
            confirmButtonText: 'Continuar',
        }).then(() => {
            navigate('/login', { replace: true });
        });
    };

    const navLinkClass = ({ isActive }) => `sidebar-nav-link${isActive ? ' active' : ''}`;

    return (
        <>
            <header className="app-mobile-bar">
                <button
                    type="button"
                    className="mobile-menu-toggle"
                    onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
                    aria-controls="app-sidebar"
                    aria-expanded={isSidebarOpen}
                    aria-label={isSidebarOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
                >
                    {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
                <div className="mobile-brand">
                    <img src="/1-logo.jpg" alt="" />
                    <span>Fruty Fenix</span>
                </div>
            </header>

            {isSidebarOpen && (
                <button
                    type="button"
                    className="sidebar-backdrop"
                    onClick={closeSidebar}
                    aria-label="Cerrar menú principal"
                />
            )}

            <aside id="app-sidebar" className={`app-sidebar${isSidebarOpen ? ' is-open' : ''}`}>
                <div className="sidebar-brand">
                    <NavLink to="/" className="sidebar-brand-link" onClick={closeSidebar}>
                        <img src="/1-logo.jpg" alt="" className="sidebar-brand-logo" />
                        <span>
                            <strong>Fruty Fenix</strong>
                            <small>Control de inventarios</small>
                        </span>
                    </NavLink>
                    <button
                        type="button"
                        className="sidebar-close d-lg-none"
                        onClick={closeSidebar}
                        aria-label="Cerrar menú principal"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className="sidebar-user">
                    <div className="sidebar-avatar" aria-hidden="true">{getInitials(userName)}</div>
                    <div className="sidebar-user-info">
                        <span>Sesión activa</span>
                        <strong>{userName}</strong>
                    </div>
                </div>

                <nav className="sidebar-nav" aria-label="Navegación principal">
                    <p className="sidebar-section-label">Principal</p>
                    <NavLink to="/" end className={navLinkClass} onClick={closeSidebar}>
                        <img src="/iconos/avatar.png" alt="" />
                        <span>Inicio</span>
                    </NavLink>

                    <p className="sidebar-section-label">Catálogo</p>
                    <NavLink to="/tropicales" className={navLinkClass} onClick={closeSidebar}>
                        <img src="/iconos/convenio.png" alt="" />
                        <span>Frutas tropicales</span>
                    </NavLink>
                    <NavLink to="/importadas" className={navLinkClass} onClick={closeSidebar}>
                        <img src="/iconos/caja-de-devolucion.png" alt="" />
                        <span>Frutas importadas</span>
                    </NavLink>
                    <NavLink to="/search" className={navLinkClass} onClick={closeSidebar}>
                        <img src="/iconos/lupa.png" alt="" />
                        <span>Buscar producto</span>
                    </NavLink>

                    <p className="sidebar-section-label">Gestión</p>
                    <NavLink to="/proveedores" className={navLinkClass} onClick={closeSidebar}>
                        <img src="/iconos/grafico-de-barras.png" alt="" />
                        <span>Proveedores</span>
                    </NavLink>
                    <NavLink to="/registro-usuario" className={navLinkClass} onClick={closeSidebar}>
                        <img src="/iconos/avatar.png" alt="" />
                        <span>Registrar usuario</span>
                    </NavLink>

                    <p className="sidebar-section-label">Análisis</p>
                    <NavLink to="/reportes" className={navLinkClass} onClick={closeSidebar}>
                        <img src="/iconos/devoluciones-icono.png" alt="" />
                        <span>Reportes</span>
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <button type="button" className="sidebar-logout" onClick={onLogout}>
                        <LogoutIcon />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>
        </>
    );
};
