import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;

export const TopSong = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
`;

export const Song = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  padding-top: 20px;
`;

export const DivisorTxt = styled.p`
  color: #fff;
  font-size: 25px;
  font-family: "'Helvetica'";
  padding-bottom: 10px;
  padding-top: 20px;
`;

export const Separator = styled.hr`
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(255, 255, 255, 0.75),
    rgba(0, 0, 0, 0)
  );
`;

export const TopSongText = styled.p`
  color: #fff;
  font-size: 25px;
  font-family: "'Helvetica'";
  padding-bottom: 10px;
`;

export const TopSongInfo = styled.div`
  padding: 30px;
  color: #fff;

  p {
    font-size: 20px;
  }

  a {
    text-decoration: none;
    font-size: 18px;
    color: #ddd;
  }
`;

export const Logo = styled.img`
  width: 250px;
  height: 250px;
`;

export const Image = styled.img`
  width: 150px;
  height: 150px;
`;
