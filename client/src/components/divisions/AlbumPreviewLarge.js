import React, { useState, useContext } from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { convertMilli } from "../../utils";
import styled from "styled-components";
import { theme } from "../../styles";
import { getTrack } from "../../spotify";
import { PlayerContext } from "../../context/PlayerContext";

const { colors } = theme;

const AlbumPreviewLargeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.grey};
  padding: 10px 10px;
  &:hover {
    background-color: ${colors.darkGrey};
    border: none;
  }

  .AlbumTrackContainer__inner_1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      margin: 0;
      color: ${colors.lightestGrey};
      &:nth-child(1) {
        margin-right: 95px;
      }
    }
    svg {
      margin-right: 95px;
      color: ${colors.lightestGrey};
      font-size: 30px;
      &:hover {
        color: ${colors.green};
        transform: scale(1.08);
      }
    }
  }
  .AlbumTrackContainer__inner_2 {
    display: flex;
    align-items: center;
    p {
      margin: 0;
      color: ${colors.lightestGrey};
    }
  }
`;

const AlbumPreviewLarge = ({ AlbumID, track }) => {
  const [insideValue, setInsideValue] = useState(true);
  const { playClickedMusic } = useContext(PlayerContext);

  const changeInsideValue = () => {
    setInsideValue(!insideValue);
  };

  const playMusicClicked = async (trackID) => {
    const response = await getTrack(trackID);
    const {
      album: { images },
      preview_url,
      artists,
      name,
    } = response?.data;

    const playerData = {
      musicImageUrl: images[2].url,
      musicName: name,
      musicArtistName: artists[0].name,
      musicArtistId: artists[0].id,
      musicPreviewUrl: preview_url,
    };
    playClickedMusic(playerData);
  };

  return (
    <AlbumPreviewLargeContainer
      className="AlbumTrackContainer__inner"
      onMouseEnter={changeInsideValue}
      onMouseLeave={changeInsideValue}
    >
      <div className="AlbumTrackContainer__inner_1">
        {insideValue ? (
          <p>{AlbumID + 1}</p>
        ) : (
          <PlayCircleOutlineIcon onClick={() => playMusicClicked(track.id)} />
        )}
        <p>{track.name}</p>
      </div>
      <div className="AlbumTrackContainer__inner_2">
        <p>{convertMilli(track.duration_ms)}</p>
      </div>
    </AlbumPreviewLargeContainer>
  );
};

export default AlbumPreviewLarge;
