import "./userNftCollectionAndCreationBtnContainer.css";
const UserNftCollectionAndCreationBtnContainer = ({ active, setActive }) => {
  const handleClick = (id) => {
    setActive(id);
  };

  return (
    <>
      <div className="userNftCollectionAndCreationBtnContainer">
        <div className="UserNftCollectionBtnContainer">
          <p
            onClick={(e) => handleClick(1)}
            className={
              active === 1
                ? "UserNftCollectionBtnActive"
                : "UserNftCollectionBtn"
            }
          >
            Collected <span className="UserNftCollectionBtn">1.1k</span>
          </p>
        </div>
        <div className="UserNftCollectionBtnContainer">
          <p
            onClick={() => handleClick(2)}
            className={
              active === 2
                ? "UserNftCollectionBtnActive"
                : "UserNftCollectionBtn"
            }
          >
            Created <span className="UserNftCollectionBtn">92.5k</span>
          </p>
        </div>
        <div className="UserNftCollectionBtnContainer">
          <p
            onClick={() => handleClick(3)}
            className={
              active === 3
                ? "UserNftCollectionBtnActive"
                : "UserNftCollectionBtn"
            }
          >
            Favorite <span className="UserNftCollectionBtn">92.5k</span>
          </p>
        </div>
      </div>
      <hr />
    </>
  );
};

export default UserNftCollectionAndCreationBtnContainer;
