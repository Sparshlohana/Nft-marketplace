import React, { useState, useRef } from "react";
import { BsPlay, BsPause } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import "./nftAudioCard.css";

const NftAudioCard = ({ nft }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.currentTime = currentTime;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    setCurrentTime(audioRef.current.currentTime);
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <>
      <div className="nftCard">
        <div className="nftCardAudioContainerMain">
          <div className="nftCardAudioContainer">
            <audio ref={audioRef} src={nft.media} />
            <button
              className="playPauseBtn"
              onClick={isPlaying ? handlePause : handlePlay}
            >
              {isPlaying ? (
                <BsPause className="nftAudioCardPlayPauseIcon" />
              ) : (
                <BsPlay className="nftAudioCardPlayPauseIcon" />
              )}
            </button>
          </div>
          <div className="nftCardContent">
            <div className="nftCardAuthorNameContainer">
              <p className="nftCardAuthorName">
                {nft.seller.slice(0, 7) + "..." + nft.seller.slice(28)}
              </p>
              <TiTick className="nftAuthorVerificationImg" />
            </div>
            <div className="nftCardNameContainer">
              <h3 className="nftCardName">{nft.name}</h3>
            </div>

            <div className="nftCardPriceAndBuyContainer">
              <div className="nftCardPriceContainer">
                <p className="nftCardPrice">{nft.price} ETH</p>
              </div>
              <div className="nftCardBuyContainer">
                <button className="nftCardBuyBtn">Buy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftAudioCard;
