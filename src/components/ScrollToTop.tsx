import { FunctionComponent, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Scrollbar from 'smooth-scrollbar';

import useScrollbar from '../hooks/useScrollbar';

const ScrollToTop: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const { onDestroyScrollbar, onInitScrollbar } = useScrollbar();

  useEffect(() => {
    const unlisten = history.listen(() => {
      const bodyScrollbar = Scrollbar.get(document.body);
      if (bodyScrollbar) {
        bodyScrollbar.scrollTo(0, 0);
        onDestroyScrollbar();
        onInitScrollbar();
      } else {
        window.scrollTo(0, 0);
      }
    });
    window.onbeforeunload = () => {
      const bodyScrollbar = Scrollbar.get(document.body);
      if (bodyScrollbar) {
        bodyScrollbar.scrollTo(0, 0);
        onDestroyScrollbar();
      } else {
        window.scrollTo(0, 0);
      }
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
