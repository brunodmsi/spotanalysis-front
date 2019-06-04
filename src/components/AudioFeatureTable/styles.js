import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;

export const Table = styled.table`
  width: 100%;
  padding: 0 20px;
  margin-top: 40px;
  text-align: center;
  border-collapse: collapse;

  td,
  th {
    color: #fff;
    text-align: left;
    padding: 8px;
    font-size: 18px;
  }

  // tr:nth-child(even) {
  //   background-color: #dddddd;
  // }
`;

export const SongInfoContainer = styled.div`
  justify-content: space-between;
  flex: 1;
  flex-direction: column;
`;

export const SongName = styled.a`
  font-size: 30px;
  color: #fff;
  font-family: 'Helvetica';
  text-decoration: none;
`;

export const ArtistsName = styled.a`
  font-size: 20px;
  color: #fff;
  font-family: 'Helvetica';
  text-decoration: none;
`;

export const SongContainer = styled.div`
  flex: 1;
  flex-direction: row;
`;

export const SongImage = styled.img`
  width: 250px;
  height: 250px;
  align-items: center;
`;
