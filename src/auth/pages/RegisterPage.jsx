import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import { url_prefi } from '../../config/api';
import { AlertIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from '../components';
import './AuthPages.css';

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
};

export const RegisterPage = () => {
  const [formState, setFormState] = useState(registerFormFields);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { registerName, registerEmail, registerPassword, registerPassword2 } = formState;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    if (error) setError('');
  };

  const registerSubmit = async (event) => {
    event.preventDefault();

    if (
      !registerName.trim() ||
      !registerEmail.trim() ||
      !registerPassword.trim() ||
      !registerPassword2.trim()
    ) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (registerPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (registerPassword !== registerPassword2) {
      setError('Las contraseñas ingresadas no coinciden.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post(
        `${url_prefi}/auth/new`,
        {
          name: registerName.trim(),
          email: registerEmail.trim(),
          password: registerPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        }
      );

      Swal.fire({
        title: 'Usuario registrado',
        text: `La cuenta de ${registerName.trim()} fue creada exitosamente.`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      setFormState(registerFormFields);
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          'No se pudo registrar el usuario. Verifique los datos e intente nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8 col-xl-6">
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <h1 className="auth-title h3">Registrar usuario</h1>
              <p className="auth-subtitle">
                Cree las credenciales de acceso para un nuevo usuario del sistema.
              </p>
            </div>

            {error && (
              <div
                className="alert alert-danger d-flex align-items-center gap-2 auth-alert"
                role="alert"
              >
                <AlertIcon />
                <div>{error}</div>
              </div>
            )}

            <form onSubmit={registerSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="registerName" className="form-label">
                  Nombre completo
                </label>
                <div className="input-group auth-input-group">
                  <span className="input-group-text">
                    <UserIcon />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="registerName"
                    name="registerName"
                    placeholder="Nombre y apellido"
                    autoComplete="name"
                    value={registerName}
                    onChange={onInputChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="registerEmail" className="form-label">
                  Correo electrónico
                </label>
                <div className="input-group auth-input-group">
                  <span className="input-group-text">
                    <MailIcon />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="registerEmail"
                    name="registerEmail"
                    placeholder="usuario@frutyfenix.com"
                    autoComplete="email"
                    value={registerEmail}
                    onChange={onInputChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="registerPassword" className="form-label">
                  Contraseña
                </label>
                <div className="input-group auth-input-group">
                  <span className="input-group-text">
                    <LockIcon />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="registerPassword"
                    name="registerPassword"
                    placeholder="Mínimo 6 caracteres"
                    autoComplete="new-password"
                    value={registerPassword}
                    onChange={onInputChange}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary auth-toggle"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="registerPassword2" className="form-label">
                  Confirmar contraseña
                </label>
                <div className="input-group auth-input-group">
                  <span className="input-group-text">
                    <LockIcon />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="registerPassword2"
                    name="registerPassword2"
                    placeholder="Repita la contraseña"
                    autoComplete="new-password"
                    value={registerPassword2}
                    onChange={onInputChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100 auth-submit" disabled={loading}>
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    Registrando...
                  </>
                ) : (
                  'Crear cuenta'
                )}
              </button>

              <Link to="/" className="btn btn-link w-100 mt-2 text-decoration-none">
                Volver al inicio
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
