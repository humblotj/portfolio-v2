import './Footer.scss';
import { ReactComponent as GitHubIcon } from '../assets/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../assets/icons/linkedin.svg';
import { ReactComponent as CodepenIcon } from '../assets/icons/codepen.svg';

const Footer = () => (
  <footer>
    <ul>
      <li>
        <a href="https://www.linkedin.com/in/jean-h-25b1871a0/" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
      </li>
      <li>
        <a href="https://github.com/humblotj" aria-label="Github">
          <GitHubIcon />
        </a>
      </li>
      <li>
        <a href="https://codepen.io/humblotj" aria-label="Codepen">
          <CodepenIcon />
        </a>
      </li>
    </ul>
    <p>© 2021 Jean Humblot</p>
  </footer>
);

export default Footer;
