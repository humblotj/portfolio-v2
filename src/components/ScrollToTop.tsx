import { FunctionComponent, useEffect } from 'react';
import {
  withRouter, RouteComponentProps, useLocation, useHistory,
} from 'react-router-dom';

const ScrollToTop: FunctionComponent<RouteComponentProps> = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    window.onpagehide = (event: PageTransitionEvent) => {
      if (!event.persisted) {
        window.scrollTo(0, 0);
        history.replace('work/jrello');
      }
    };
    return () => {
      window.onpagehide = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (null);
};

export default withRouter(ScrollToTop);
