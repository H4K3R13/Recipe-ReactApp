import { GiHamburger } from 'react-icons/gi';
import styled from 'styled-components';
function Notfound() {
  return (
    <Error><GiHamburger/>404 Page Not Found</Error>
  )
}

const Error = styled.div`
    font-size:5rem;
    text-align:center;

    @media (max-width:768px){
      font-size: 3rem;
    }

    @media (max-width:576px){
      font-size:2rem;
      text-align:left;
    }
`;
export default Notfound