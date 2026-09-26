import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { url_prefi } from '../../config/api';
import { AuthLayout, AlertIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '../components';
import './AuthPages.css';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

export const LoginPage = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState(loginFormFields);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginEmail, loginPassword } = formState;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    if (error) setError('');
  };

  const loginSubmit = async (event) => {
    event.preventDefault();

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError('Por favor, ingrese su correo electrónico y contraseña.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post(`${url_prefi}/auth`, {
        email: loginEmail.trim(),
        password: loginPassword,
      });

      localStorage.setItem('jwt', data.token);
      localStorage.setItem('jwt-init-date', new Date().getTime());
      localStorage.setItem('user-name', data.name || 'Usuario autenticado');

      navigate('/', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          'No se pudo iniciar sesión. Verifique sus credenciales e intente nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Iniciar sesión"
      subtitle="Ingrese sus credenciales para acceder al sistema"
      footer="¿Problemas para ingresar? Contacte al administrador del sistema."
    >
      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2 auth-alert" role="alert">
          <AlertIcon />
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={loginSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">
            Correo electrónico
          </label>
          <div className="input-group auth-input-group">
            <span className="input-group-text">
              <MailIcon />
            </span>
            <input
              type="email"
              className="form-control"
              id="loginEmail"
              name="loginEmail"
              placeholder="usuario@frutyfenix.com"
              autoComplete="username"
              value={loginEmail}
              onChange={onInputChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="loginPassword" className="form-label">
            Contraseña
          </label>
          <div className="input-group auth-input-group">
            <span className="input-group-text">
              <LockIcon />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="loginPassword"
              name="loginPassword"
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
              value={loginPassword}
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

        <button type="submit" className="btn btn-success w-100 auth-submit" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
              Verificando...
            </>
          ) : (
            'Iniciar sesión'
          )}
        </button>
      </form>
    </AuthLayout>
  );
};
