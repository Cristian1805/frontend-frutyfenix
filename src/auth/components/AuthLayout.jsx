import React from 'react';

export const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className="auth-page">
      <div className="row g-0 min-vh-100">
        <aside className="col-lg-6 col-xl-7 d-none d-lg-flex auth-brand">
          <div className="auth-brand-content animate__animated animate__fadeIn">
            <img src="/1-logo.jpg" alt="Fruty Fenix" className="auth-brand-logo" />
            <h1 className="auth-brand-title">Sistema de Inventarios</h1>
            <p className="auth-brand-text">
              Administre las entradas, salidas, proveedores y reportes de Fruty Fenix
              desde un solo lugar.
            </p>
            <ul className="auth-brand-list">
              <li>Control de inventario en tiempo real</li>
              <li>Gestión de proveedores y productos</li>
              <li>Reportes exportables en PDF</li>
            </ul>
          </div>
        </aside>

        <main className="col-lg-6 col-xl-5 d-flex align-items-center justify-content-center auth-form-panel">
          <div className="auth-card animate__animated animate__fadeIn">
            <div className="text-center mb-4">
              <img src="/1-logo.jpg" alt="Fruty Fenix" className="auth-mobile-logo d-lg-none" />
              <h2 className="auth-title">{title}</h2>
              {subtitle && <p className="auth-subtitle">{subtitle}</p>}
            </div>

            {children}

            {footer && <p className="auth-footer text-center mt-4 mb-0">{footer}</p>}
          </div>
        </main>
      </div>
    </div>
  );
};
