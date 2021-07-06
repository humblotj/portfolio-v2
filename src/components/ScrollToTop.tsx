import { FunctionComponent, useEffect } from 'react';
import { withRouter, RouteComponentProps, useLocation } from 'react-router-dom';

const ScrollToTop: FunctionComponent<RouteComponentProps> = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.onpagehide = (event: PageTransitionEvent) => {
      if (!event.persisted) {
        // window.scrollTo(0, 0);
        // console.log(window.scrollTo(0, 0));
      }
    };
    return () => {
      window.onpagehide = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (null);
};

export default withRouter(ScrollToTop);
