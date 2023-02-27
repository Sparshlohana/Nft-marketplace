import "./categoriesCards.css";

const CategoriesCards = () => {
  return (
    <div className="categoriesCardsContainer">
      <div className="categoriesCardsCollectionImgAndCollectionNameContainer">
        <div className="categoriesCardsCollectionImgContainer">
          <img
            className="categoriesCardsCollectionImg"
            src="https://images5.alphacoders.com/958/thumb-1920-958580.jpg"
            alt=""
          />
        </div>
        <div className="categoriesCardsCollectionNameContainerMain">
          <div className="categoriesCardsCollectionNameContainer">
            <h3 className="categoriesCardsCollectionName">Deep Collections</h3>
            <img
              className="categoriesCardsCollectionNameVerificationImg"
              src="https://cdn.cdnlogo.com/logos/t/77/twitter-verified-badge.svg"
              alt=""
            />
          </div>
          <div className="categoriesCardsCollectionNumberOfItemsContainer">
            <p className="categoriesCardsCollectionNumberOfItems">35 items</p>
          </div>
        </div>
      </div>

      <div className="categoriesCardsDataContainer">
        <p className="categoriesCardsData">My name is Deep The collection...</p>
      </div>

      <div className="categoriesCardsImageContainer">
        <img
          className="categoriesCardsImage"
          src="https://i.pinimg.com/originals/ee/29/98/ee2998cdb1cf6a6bf66bf65fe0076fd2.gif"
          alt=""
        />
        <img
          className="categoriesCardsImage"
          src="https://i.pinimg.com/originals/cc/c8/39/ccc839332d89d6150db61b7e47da89f1.gif"
          alt=""
        />
        <img
          className="categoriesCardsImage"
          src="https://thumbs.gfycat.com/AchingSilkyFoal-size_restricted.gif"
          alt=""
        />
      </div>
    </div>
  );
};

export default CategoriesCards;
