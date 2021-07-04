import useSuspenseAnimation from '../../hooks/useSuspenseAnimation';

const NotFoundSuspense = () => {
  const component = useSuspenseAnimation(import('./NotFound'));

  return component;
};

export default NotFoundSuspense;
