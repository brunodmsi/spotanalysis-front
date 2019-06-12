import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;

const TracksButton = styled.button`
  height: 45px;
  padding: 20px;
  margin-top: 10px;
  background: transparent;
  border: 2px solid #0099cc;
  color: #0099cc;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.5s
  border-radius: 6px;
  width: 30%;
  align-items: center;
  justify-content: center;
  display: flex;

  &:hover {
    background: #008cba;
    color: white;
  }
`;

const Select = styled.button`
  height: 45px;
  padding: 20px;
  margin-top: 10px;
  background: transparent;
  border: 2px solid #e5556e;
  color: #e5556e;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.5s
  border-radius: 6px;
  width: 30%;
  align-items: center;
  justify-content: center;
  display: flex;

  &:hover {
    background: #e6304c;
    color: white;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Error = styled.div`
  display: flex;
  background-color: #ff525b;
  border-radius: 4px;
  height: 35px;
  text-align: center;

  p {
    font-size: 18px;
    color: #fff;
    margin: auto;
  }
`;

const Form = styled.form`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  display: flex;

  input {
    flex: 1;
    height: 45px;
    padding: 0 20px;
    background: #fff;
    border: 0;
    font-size: 18px;
    color: #444;
    border-radius: 3px;
  }

  button {
    height: 45px;
    padding: 0 20px;
    margin-left: 10px;
    background: transparent;
    border: 2px solid #e5556e;
    transition: all 0.5s;
    color: #e5556e;
    font-size: 20px;
    font-weight: bold;
    border-radius: 3px;

    &:hover {
      background: #e6304c;
      color: white;
    }
  }
`;

const Logo = styled.img`
  width: 250px;
  height: 250px;
`;

export {
  Container, Form, Logo, Wrap, Error, TracksButton, Select,
};
