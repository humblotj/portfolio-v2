import './Footer.scss';
import { ReactComponent as GitHubIcon } from '../assets/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../assets/icons/linkedin.svg';
import { ReactComponent as CodepenIcon } from '../assets/icons/codepen.svg';

const Footer: React.FC<{}> = () => (
  <footer>
    <ul>
      <li>
        <a href="https://www.linkedin.com/in/humblotj/" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
      </li>
      <li>
        <a href="https://github.com/humblotj" aria-label="GitHub">
          <GitHubIcon />
        </a>
      </li>
      <li>
        <a href="https://codepen.io/humblotj" aria-label="CodePen">
          <CodepenIcon />
        </a>
      </li>
    </ul>
    <p>© 2021 Jean Humblot</p>
  </footer>
);

export default Footer;
