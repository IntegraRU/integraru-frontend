import styled from "styled-components";

export const Container = styled.div`
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #274381;
  font-family: "Lato", sans-serif;
  font-weight: bold;
  font-size: 14px;
  padding: 24px 28px;
  border-radius: 8px;
  width: 128px;
  height: 128px;
  margin: 20px;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  p {
    padding-top: 8px;
    text-align: center;
  }

  &:hover {
    cursor: pointer;
  }
`;
