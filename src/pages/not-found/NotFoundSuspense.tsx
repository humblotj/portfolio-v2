import useLoadComponent from 'hooks/useLoadComponent';

const NotFoundSuspense = () => {
  const component = useLoadComponent(import('./NotFound'));

  return component;
};

export default NotFoundSuspense;
