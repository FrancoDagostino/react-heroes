import { useMemo } from "react";
import { useParams,Navigate, useNavigate } from "react-router-dom"
import { getHeroeById } from "../../selectors/getHeroById";


export const HeroScreen = () => {
  
  const {heroId} = useParams();
  
  const hero = useMemo(() =>{
    return getHeroeById(heroId)
  },[heroId])

  const navigate = useNavigate();
  
  const handleRetunr = ()=>{
    navigate(-1);
  }

  if(!hero){
    return <Navigate to='/'/>
  }
  const imgPath = `/assets/${hero.id}.jpg`;
  const {
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
  } = hero;

  return (
    <div className="row mt-5">
        <div className="col-4">
          <img 
            src={imgPath}
            alt={superhero}
            className="img-thumbnail animate__animated animate__fadeInLeft"  
          />
        </div>

        <div className="col-8 animate__animated animate__fadeIn">
          <h3>{superhero}</h3>
          <ul className="list-group list-group">
            <li className="list-group-item"> <b>Alter ego:</b> {alter_ego}</li>
            <li className="list-group-item"> <b>Publisher:</b> {publisher}</li>
            <li className="list-group-item"> <b>Publisher:</b> {first_appearance}</li>
          </ul>  
          <h5 className="mt-3">Characters</h5>
          <p>{characters}</p>

         <button
          className="btn btn-outline-info" 
          onClick={handleRetunr}           
        >
          Return
        </button>   

          

        </div>
       
    </div>
  )
}
