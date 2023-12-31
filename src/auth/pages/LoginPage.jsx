//HOOKS de la aplicacion
import React, { useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';

import './LoginPage.css' 




const loginFormFields = {
  loginEmail:    '',
  loginPassword: '',
}


export const LoginPage = () => {

  const navigate = useNavigate();

  const { startLogin, errorMessage } = useAuthStore();       
  const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
  
  // const history = useHistory(); 

  const loginSubmit = async ( event ) => {
    event.preventDefault();

    // Verificar si ambos campos están vacíos
    if (!loginEmail.trim() && !loginPassword.trim()) {
      Swal.fire('Campos Vacíos', 'Por favor, ingrese su correo electrónico y contraseña.', 'warning');
      return;
    }


    try {
      const url = 'http://localhost:5174/auth'; 
      
      const body = {
        email : loginEmail,
        password : loginPassword 
      }
      
      console.log(url);
      const response = await axios.post(url, body);
      
      // Almacenar datos en localStorage
      localStorage.setItem('jwt', response.data.token);
      navigate('/inicio',{ replace: true}); 
      console.log('Response:', response.data); 
      
    } catch (error) {
      console.error('Error:', error); 
    }

}; 

useEffect(() => {
  if ( errorMessage !== undefined ) {
    Swal.fire('Error en la autenticación', errorMessage, 'error');
  }
}, [errorMessage]) 



  return (
    <div className="container h-100">
      <div className="row h-100 justify-content-center align-items-center">
        {/* Columna para el logo de la empresa */}
          <div className="col-md-6 col-sm-12 text-center">
            <img
              src="/assets/logo.jpg"
              alt="Logo de la Empresa"
              className="img-fluid mb-4"
            />
          {/* <h3 className="display-6">Bienvenido al inventario</h3> */}
        </div>
        {/* Columna para el formulario de inicio de sesión */}
          <div className="col-md-6 col-sm-12">
            <div className="mt-3 text-center">
              <h3 className="form-title">Formulario Inicio de sesión</h3>
              <hr className="form-divider" /> 
            </div>
          <form onSubmit={ loginSubmit }>
            <div className="form-group">
              <label htmlFor="usuario">Usuario:</label>
              <input
                type="text"
                className="form-control"
                id="usuario"
                placeholder="Correo Electronico"
                name="loginEmail"
                value= {loginEmail}
                onChange={onLoginInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="contrasena">Contraseña:</label>
              <input 
                type="password"
                className="form-control"
                id="contrasena"
                placeholder="Contraseña"
                name="loginPassword"
                value= {loginPassword}
                onChange={onLoginInputChange} 
              />
            </div>

             
            <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </div>

          <div className="form-group">
            <Link to="/register" className="btn btn-secondary">
            Registo Usuario 
            </Link>
          </div>
          </form>
        </div>
      </div>
    </div> 
  );
};
