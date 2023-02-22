import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "./homeCarousel.css";

const HomeCarousel = () => {
  return (
    <AwesomeSlider style={{ height: "100vh" }}>
      <div data-src="https://images.hdqwalls.com/wallpapers/monkey-nft-v7.jpg" />
      <div data-src="https://wallpapersmug.com/download/3840x2160/3e0156/bitcoin-digital-art-abstract.jpg" />
      <div data-src="https://wallpaperaccess.com/full/3648367.jpg" />
      <div data-src="https://a-static.besthdwallpaper.com/pump-is-bitcoin-wallpaper-3840x2160-53102_54.jpg" />
      <div data-src="https://pbs.twimg.com/media/B3TpEy9CUAEtdoY.jpg" />
      <div data-src="https://wallpaperaccess.com/full/1267681.jpg" />
    </AwesomeSlider>
  );
};

export default HomeCarousel;
