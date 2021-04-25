import './About.scss';
import photo from '../../../assets/photo.jpg';
import { ReactComponent as LocationIcon } from '../../../assets/icons/location.svg';

const About = () => (
  <div className="about">
    <h2>About</h2>
    <div className="about-info">
      <img src={photo} alt="profile-pic" />
      <h3>About me</h3>
      <p>
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
      <a href="/">
        <LocationIcon />
        Seoul, South Korea
      </a>
    </div>
  </div>
);

export default About;
