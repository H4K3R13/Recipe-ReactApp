import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from "react";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab ] = useState('instructions');

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  };

  useEffect(() => {
    fetchDetails();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.name]);

  return (
    <DetailedWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title}/>
      </div>
      <Info>
        <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={ ()=> setActiveTab('instructions')}>Instructions</Button>
        <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={()=> setActiveTab('ingredients')}>Ingredients</Button>
        {activeTab === 'instructions' && (
                 <div>
                 <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                 <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
               </div>

        )}


        { activeTab === 'ingredients' && ( 
        <ul>
          {(details.extendedIngredients ?? []).map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul> 
        )}
      </Info>
    </DetailedWrapper>
  );
}

const DetailedWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  
  img{
    border-radius: 2rem;
    width: 100%;
    max-width: 800px;
    margin-bottom: 2rem;
  }
  
  h2{
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  li{
    font-size: 1.2rem;
    line-height:2.5rem;
  }
  
  ul{
    margin-top: 2rem;
    text-align: center;
    padding-inline-start: 0;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
  
  ${Button} {
    margin: 1rem;
  }
`;

export default Recipe;