import './WorkDetailLinks.scss';

import { ReactComponent as AppStoreIcon } from 'assets/icons/appstore.svg';
import { ReactComponent as PlayStoreIcon } from 'assets/icons/playstore.svg';
import Button from 'components/atoms/Button';
import { WorkDetailProps } from 'interface';

interface Props {
  work: WorkDetailProps;
}

const WorkDetailLinks = ({ work }: Props) => {
  const { links, repoUrl } = work;

  const goTo = (url: string) => window.open(url, '_blank');

  const getStoresLink = () => (
    <div>
      {links?.ios && (
        <a href={links.ios} target="_blank" rel="noreferrer" data-testid="ios">
          <AppStoreIcon />
        </a>
      )}
      {links?.android && (
        <a
          href={links.android}
          target="_blank"
          rel="noreferrer"
          data-testid="android"
        >
          <PlayStoreIcon />
        </a>
      )}
    </div>
  );

  const getWebLink = () => (
    <>
      {links?.web && (
        <Button key={links.web} onClick={() => goTo(links.web as string)}>
          Visit Site
        </Button>
      )}
    </>
  );

  const getGitHubLink = () => (
    <>
      {!!repoUrl && (
        <Button color="secondary" onClick={() => goTo(repoUrl)}>
          View Code
        </Button>
      )}
    </>
  );

  return (
    <div className="work-links">
      {(links?.android || links?.ios) && getStoresLink()}
      <div>
        {getWebLink()}
        {getGitHubLink()}
      </div>
    </div>
  );
};

export default WorkDetailLinks;
