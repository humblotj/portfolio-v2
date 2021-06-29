import { FunctionComponent, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const ScrollToTop: FunctionComponent<RouteComponentProps> = ({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
    return () => {
      unlisten();
      window.onbeforeunload = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (null);
};

export default withRouter(ScrollToTop);
