import styled from "styled-components";

export const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #274381;
  font-family: "Lato", sans-serif;
  background-color: #ededed;
  height: 100vh;
  width: 100%;

  h1 {
    font-size: 24px;
    font-weight: bold;
    width: 100%; /* Full width */
    padding: 40px;
    text-align: center;
    position: fixed; /* Set the navbar to fixed position */
    top: 0;
  }

  h2 {
    color: #092e67;
    font-size: 18px;
    font-weight: bold;
    width: 100%; /* Full width */
    padding: 35px 0px;
    text-align: center;
  }
`;

export const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 0px;
  width: 98%;
`;
