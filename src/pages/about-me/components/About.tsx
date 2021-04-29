import './About.scss';
import photo from '../../../assets/photo.jpg';
import { ReactComponent as LocationIcon } from '../../../assets/icons/location.svg';
import CloseButton from '../../../components/ui/CloseButton';

const About = ({ closeContactModal }: {closeContactModal: ()=> void}) => (
  <div className="about">
    <CloseButton onClick={closeContactModal} />
    <h2>About</h2>
    <div className="about-info">
      <div className="pic reveal">
        <div className="pic-crop">
          <img className="reveal-text" src={photo} alt="profile-pic" />
        </div>
        <div className="reveal-mask" aria-hidden />
      </div>
      <br />
      <div className="about-title reveal secondary">
        <h3 className="reveal-text">About me</h3>
        <div className="reveal-mask" aria-hidden />
      </div>
      <br />
      <p className="about-description">
        Hi! I&apos;m Jean, a
        {' '}
        <strong>French software developer</strong>
        {' '}
        based in
        {' '}
        <strong>Seoul</strong>
        .
        <br />
        I graduated from a French school engineering with a Master of Science degree.
        I worked for several Korean start-ups where I learned how to work
        {' '}
        <strong>independently</strong>
        {' '}
        but also in a
        {' '}
        <strong>team</strong>
        {' '}
        and successfully
        {' '}
        <strong>build</strong>
        {' '}
        something from the ground up.
        <br />
        I am looking for new
        {' '}
        <strong>exciting</strong>
        {' '}
        challenges and
        {' '}
        <strong>opportunities</strong>
        {' '}
        to support a new company to build their next
        {' '}
        <strong>big</strong>
        {' '}
        things.
      </p>
    </div>
    <div className="about-footer">
      <div className="reveal secondary">
        <p className="reveal-text">
          <LocationIcon />
          &nbsp;
          Seoul, South Korea
        </p>
        <div className="reveal-mask" aria-hidden />
      </div>
    </div>
  </div>
);

export default About;
