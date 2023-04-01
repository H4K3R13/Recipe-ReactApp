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
`;
export default Notfound