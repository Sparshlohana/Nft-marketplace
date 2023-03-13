import "./confirmPublish.css";

const ConfirmPublish = ({ title }) => {
  return (
    <div className="ConfirmPublishContainerMain">
      <div className="ConfirmPublishContainer">
        <div className="confirmPublishHeadingContainer">
          <p className="confirmPublishHeading">Do you wanna {title}!?</p>
        </div>
        <hr />
        <div className="ConfirmPublishBtnContainer">
          <button className="ConfirmPublishBtn">Yes</button>
          <button className="ConfirmPublishBtn">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPublish;
