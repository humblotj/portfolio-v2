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
  }, []);

  return (null);
};

export default withRouter(ScrollToTop);
