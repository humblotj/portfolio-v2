import { useEffect } from 'react';
import { withRouter, RouteComponentProps, useLocation } from 'react-router-dom';

const ScrollToTop: React.FC<RouteComponentProps> = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.onpagehide = (event: PageTransitionEvent) => {
      if (!event.persisted) {
        window.scrollTo(0, 0);
      }
    };
    return () => {
      window.onpagehide = null;
    };
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default withRouter(ScrollToTop);
