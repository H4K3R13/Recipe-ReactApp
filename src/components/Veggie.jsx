import { useEffect,useState } from "react";
import styled from 'styled-components';
import { Splide, SplideSlide} from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  },[]);

  const getVeggie = async () => {

    const check = localStorage.getItem('veggie');
    if(check){
      setVeggie(JSON.parse(check))
    }
    else{
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
        );
      const data = await api.json();
      localStorage.setItem('veggie',JSON.stringify(data.recipes));
      setVeggie(data.recipes);
      console.log(data.recipes);
    }
  };
  return (
        <div>
        <Wrapper>
          <h3>Our Vegetaraian Picks</h3>
          <Splide options={{
            perPage:2,
            arrows: true,
            pagination: true,
            drag: 'free' ,
            gap: '1.5rem',
          }}
          >
          {veggie.map((recipe) => {
            return(
              <SplideSlide key={recipe.id}>
              <Card>
                <Link to={'/recipe/' + recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient/>
                </Link>
              </Card>
              </SplideSlide>
            );
          })}
          </Splide>
        </Wrapper>
  </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 3rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (max-width: 768px) {
    min-height: 20rem;
    border-radius: 1.5rem;

    p {
      font-size: 0.8rem;
    }
  }

  @media only screen and (max-width: 480px) {
    min-height: 15rem;
    border-radius: 1rem;

    p {
      font-size: 0.7rem;
    }
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;


export default Veggie