import './Sns.scss';
import { ReactComponent as GitHubIcon } from '../../assets/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as CodepenIcon } from '../../assets/icons/codepen.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/mail.svg';
import { codepen, github, linkedin, mail } from '../../utils/utils';

const Sns: React.FC<{}> = () => (
  <ul className="sns">
    <li>
      <a target="_blank" rel="noreferrer" href={linkedin} aria-label="LinkedIn">
        <LinkedInIcon />
      </a>
    </li>
    <li>
      <a target="_blank" rel="noreferrer" href={github} aria-label="Github">
        <GitHubIcon />
      </a>
    </li>
    <li className="codepen">
      <a target="_blank" rel="noreferrer" href={codepen} aria-label="Codepen">
        <CodepenIcon />
      </a>
    </li>
    <li>
      <a href={'mailto:' + mail} aria-label="Mail">
        <MailIcon />
      </a>
    </li>
  </ul>
);

export default Sns;
