import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'

import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components';
import { getHeroesByName } from '../helpers'; 

export const SearchPage = () => { 

  const navigate = useNavigate();
  const location = useLocation(); 

  const { q = '' } = queryString.parse( location.search );
  const heroes = getHeroesByName(q);

  const showSearch = (q.length === 0);
  const showError  = (q.length > 0) && heroes.length === 0;


  const { searchText, onInputChange } = useForm({
    searchText: q
  });  



  const onSearchSubmit = (event) =>{
    event.preventDefault();
    // if ( searchText.trim().length <= 1 ) return;

    navigate(`?q=${ searchText }`);
  }


  return (
    <>
      <h1 className='form-title-importadas' >BUSCAR </h1>
      <hr className='form-divider-importadas' />
      

      <div className="row" id='row-search'> 

          <div className="col-md-5">
            {/* <h4>Busca las frutas registradas en el inventario </h4> */}
            {/* <hr /> */}
            <form onSubmit={ onSearchSubmit }>
              <input 
                type="text"
                placeholder="Busca una fruta registrada en el inventario"
                className="form-control"
                name="searchText"
                autoComplete="off"
                value={ searchText }
                onChange={ onInputChange }
              />

              <button className="btn btn-primary btn-sm mt-4">
                Buscar 
              </button>
            </form>
          </div>

          <div className="col-7">
            <h4>Resultados Obtenidos</h4>
            <hr />
            
            <div className="alert alert-primary animate__animated animate__fadeIn" 
                style={{ display: showSearch ? '' : 'none' }}>
              Buscador
            </div>

            <div className="alert alert-danger animate__animated animate__fadeIn" 
                style={{ display: showError ? '' : 'none' }}>
              Fruta no encontrada en el inventario:  <b>{ q }</b>
            </div>


            {
              heroes.map( hero => (
                <HeroCard key={ hero.id } {...hero } />
              ))
            }

          </div>
      </div>
      

    </>
  )
}
