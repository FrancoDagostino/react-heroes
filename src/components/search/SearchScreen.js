import { useNavigate,useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForms"
import { getHeroesByName} from "../../selectors/getHeroesByName";
import { HeroCard } from "../hero/HeroCard";
import queyString from 'query-string';
import { useMemo } from "react";

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const {q = ''} = queyString.parse(location.search)
  
  
  
  const heroesFilted = useMemo(()=>{
    return getHeroesByName(q)
  },[q])

  const [{searchText},handleInputChange,reset] = useForm({
    searchText:q
  });

  

  const handleSearch = (e) =>{
    e.preventDefault();
    navigate(`?q=${searchText}`)
  }
  return (
    <>
        <h1>Busquedas</h1>
        <hr/>
        <div className="row">
          <div className="col-5">
            <h4>Buscar</h4>
            <hr/>
            <form onSubmit={handleSearch}>
              <input 
                input="text"
                placeholder="Buscar un heroe"
                className="form-control"
                name="searchText"
                autoComplete="off"
                value={searchText}
                onChange={handleInputChange}              
              />
              <button type="submit" className="btn btn-outline-primary mt-1 btn-block"
                
                > 
                Buscar...
              </button>
            </form>
          </div>
          <div className="col-7">
              <h4>Resultados</h4>
              <hr/>
              {
                (q==='')
                 ? <div className="alert alert-info">Buscar un Heroe</div>
                 :(heroesFilted.length===0) 
                 && <div className="aler alert-danger">No hay Resultados: {q}</div>
              }

              {
                heroesFilted.map(hero => (
                  <HeroCard
                    key={hero.id}
                    {...hero}
                  />
                ))
              }
          </div>
        </div>
    </>
  )
}
