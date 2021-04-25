import { useContext } from 'react';
import cx from 'classnames';

import { StoreContext } from '../context/StoreProvider';
import './Loading.scss';

const Loading = () => {
  const { store: { isLoading } } = useContext(StoreContext);

  return (
    <>
      <div className={cx('loading', { 'is-loading': isLoading })}>
        <div className="loader">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>

    </>
  );
};

export default Loading;
