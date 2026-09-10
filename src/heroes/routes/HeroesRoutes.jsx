import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../../ui';
import { RegisterPage } from '../../auth';
import { DcPage, HeroPage, MarvelPage, ProductoForm, ProveedorForm, SearchPage, Reportes, InventarioSalida} from '../pages';
import Inicio from '../pages/Inicio';
// import AgregarProducto from '../pages/AgregarProducto';

export const HeroesRoutes = () => {
  return (
    <>
        <Navbar />

        <div className="container"> 
            <Routes>
                <Route path="tropicales" element={<MarvelPage />} />
                <Route path="importadas" element={<DcPage />} /> 

                <Route path="productos/:id" element = {<ProductoForm />} /> 
                
                <Route path="search" element={<SearchPage />} />
                <Route path="hero/:id" element={<HeroPage />} /> 


                <Route path="proveedores" element={<ProveedorForm/>} />

                <Route path="registro-usuario" element={<RegisterPage />} />


                <Route path="salida-frm/:id" element={<InventarioSalida/>} />

                <Route path="reportes" element= {<Reportes /> } />
                                

                <Route path="/" element={<Inicio />} />
                
                <Route path="*" element={<Navigate to="/" replace />} />
                
            </Routes>
        </div>


    </>
  )
}
