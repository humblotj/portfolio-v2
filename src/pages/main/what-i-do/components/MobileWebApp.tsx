import './MobileWebApp.scss';
import mockup from '../../../../assets/mobilewebapp.png';

const MobileWebApp = () => {
  return (
    <li className="mobile-web-app">
      <h3>
        I developped
        <br />
        mobile and web applications
      </h3>
      <div>
        <img src={mockup} alt="" />
      </div>
    </li>
  );
};

export default MobileWebApp;
