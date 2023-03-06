import { FaTwitter, FaInstagram } from "react-icons/fa";
import "./profileForm.css";

const ProfileForm = () => {
  return (
    <div className="profileFormContainerMain">
      <div className="profileFormContainer">
        <div className="profileFormItemHeadingContainer">
          <p className="profileFormItemHeading">Username</p>
        </div>
        <div className="profileFormContainerInputContainer">
          <input
            autocomplete="off"
            type="text"
            placeholder="Username..."
            className="profileFormContainerInput"
          />
        </div>
      </div>

      <div className="profileFormContainer">
        <div className="profileFormItemHeadingContainer">
          <p className="profileFormItemHeading">Bio</p>
        </div>
        <div className="profileFormContainerInputContainer">
          <textarea
            className="profileFormContainerInput"
            name="profileFormContainerInput"
            placeholder="Bio..."
            id=""
            cols="21"
            rows="5"
          ></textarea>
        </div>
      </div>

      <div className="profileFormContainer">
        <div className="profileFormItemHeadingContainer">
          <p className="profileFormItemHeading">Email</p>
        </div>
        <div className="profileFormContainerInputContainer">
          <input
            autocomplete="off"
            type="email"
            name=""
            placeholder="Email..."
            className="profileFormContainerInput"
            id=""
          />
        </div>
      </div>

      <div className="profileFormContainer profileFormSocialItemMainContainer">
        <div className="profileFormItemHeadingContainer">
          <p className="profileFormItemHeading">Social Connection</p>
        </div>
        <div className="profileFormSocialConnectionParaContainer">
          <p className="profileFormSocialConnectionPara">
            Help collectors verify your account by connecting social accounts.
          </p>
        </div>

        <div className="profileFormSocialConnectionIconAndBtnContainerMain">
          <div className="profileFormSocialConnectionIconAndBtnContainer">
            <div className="profileFormSocialConnectionIconContainer">
              <FaTwitter className="profileFormSocialConnectionIcon" />
            </div>
            <div className="profileFormSocialConnectionNameContainer">
              <p className="profileFormSocialConnectionName">Twitter</p>
            </div>
            <div className="profileFormSocialCollectionBtnContainer">
              <button className="profileFormSocialConnectBtn">Connect</button>
            </div>
          </div>

          <div className="profileFormSocialConnectionIconAndBtnContainer">
            <div className="profileFormSocialConnectionIconContainer">
              <FaInstagram className="profileFormSocialConnectionIcon" />
            </div>
            <div className="profileFormSocialConnectionNameContainer">
              <p className="profileFormSocialConnectionName">Instagram</p>
            </div>
            <div className="profileFormSocialCollectionBtnContainer">
              <button className="profileFormSocialConnectBtn">Connect</button>
            </div>
          </div>
        </div>
      </div>

      <div className="profileFormContainer">
        <div className="profileFormItemHeadingContainer">
          <p className="profileFormItemHeading">Links</p>
        </div>
        <div className="profileFormContainerInputContainer">
          <input
            autocomplete="off"
            type="text"
            placeholder="yourwebsite.com"
            className="profileFormContainerInput"
          />
        </div>

        <div className="profileFormContainer">
          <div className="profileFormItemHeadingContainer">
            <p className="profileFormItemHeading">Wallet Address</p>
          </div>
          <div className="profileFormContainerInputContainer">
            <input
              autocomplete="off"
              type="text"
              className="profileFormContainerInput"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="profileSaveBtnContainer">
        <button className="profileSaveBtn">Save</button>
      </div>
    </div>
  );
};

export default ProfileForm;
