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
        based in Seoul.
        <br />
        I specialize in front-end development – building
        {' '}
        <strong>
          efficient, interactive,
          modern, performant
        </strong>
        , and
        {' '}
        <strong>scalable</strong>
        {' '}
        projects –
        but also like experimenting with new backend technologies.
        <br />
        I am open to new technologies and development opportunities.
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
