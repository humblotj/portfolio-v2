import './WorkDetailLinks.scss';
import { WorkDetailProps } from '../../../interface';
import Button from '../../../components/atoms/Button';
import { ReactComponent as PlayStoreIcon } from '../../../assets/icons/playstore.svg';
import { ReactComponent as AppStoreIcon } from '../../../assets/icons/appstore.svg';

interface Props {
  work: WorkDetailProps;
}

const WorkDetailLinks = ({ work }: Props) => {
  const { links, repoUrl } = work;

  const goTo = (url: string) => window.open(url, '_blank');

  return (
    <div className="work-links">
      {!!Object.keys(links || {}).length && (
        <>
          {(links.android || links.ios) && (
            <div>
              {links.ios && (
                <a
                  href={links.ios}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="ios"
                >
                  <AppStoreIcon />
                </a>
              )}
              {links.android && (
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
          )}
          {links.web && (
            <div>
              <Button key={links.web} onClick={() => goTo(links.web as string)}>
                Visit Site
              </Button>
              {repoUrl && (
                <Button color="secondary" onClick={() => goTo(repoUrl)}>
                  View Code
                </Button>
              )}
            </div>
          )}
        </>
      )}
      {repoUrl && !links?.web && (
        <Button color="secondary" onClick={() => goTo(repoUrl)}>
          View Code
        </Button>
      )}
    </div>
  );
};

export default WorkDetailLinks;
