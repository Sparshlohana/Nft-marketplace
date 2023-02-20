import { useState } from "react";
import "./nftAudioCard.css";

const NftAudioCard = ({ nft }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    console.log("play clicked");
    const audio = new Audio(nft?.media);
    audio.load();
    audio.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    console.log("pause clicked");
    const audio = new Audio(nft?.media);
    audio.pause();
    setIsPlaying(false);
    console.log("Audio paused");
  };

  return (
    <div className="audio-card">
      <img src={""} alt={nft?.name} />
      <h2>{nft?.name}</h2>
      <p>{nft?.description}</p>
      {isPlaying ? (
        <button onClick={pauseAudio}>Pause</button>
      ) : (
        <button onClick={playAudio}>Play</button>
      )}
    </div>
  );
};

export default NftAudioCard;
