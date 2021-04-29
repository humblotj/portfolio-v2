import { createContext, ReactNode, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
  isContactModalOpen: false,
  isLoading: true,
  scrollTo: '',
  isInit: false,
};

export const StoreContext = createContext({
  store: initialState,
  dispatch: ({ type, payload }: {type: string, payload: any}) => {},
});

interface Props{
    children: ReactNode
}

const StoreProvider = ({ children }: Props) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
