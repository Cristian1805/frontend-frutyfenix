import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'

import { HeroesRoutes } from '../heroes';
import { LoginPage } from '../auth';
//import { getEnvVariables } from '../heroes/helpers';

import { store } from '../store/store';
import { RegisterPage } from '../auth/pages/RegisterPage'; 


export const AppRouter = () => {


  const authStatus = 'checking'; //'authenticated'; 'not authenticated';
  
  //console.log(getEnvVariables()); 


  return (
    <Provider store={store}> 
    
        <Routes>
            
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} /> 
             
            
            <Route path="/*" element={ <HeroesRoutes />} /> 
            
            

        </Routes>
    
  </Provider>

    
  
  )
}
