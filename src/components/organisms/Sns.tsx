import './Sns.scss';
import { ReactComponent as GitHubIcon } from '../../assets/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as CodepenIcon } from '../../assets/icons/codepen.svg';

const Sns: React.FC<{}> = () => (
  <ul className="sns">
    <li>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.linkedin.com/in/humblotj/"
        aria-label="LinkedIn"
      >
        <LinkedInIcon />
      </a>
    </li>
    <li>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/humblotj"
        aria-label="Github"
      >
        <GitHubIcon />
      </a>
    </li>
    <li>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://codepen.io/humblotj"
        aria-label="Codepen"
      >
        <CodepenIcon />
      </a>
    </li>
  </ul>
);

export default Sns;
