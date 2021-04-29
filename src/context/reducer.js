const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTACT_MODAL_OPEN':
      if (window.innerWidth < 768) {
        document.body.style.overflow = action.payload ? 'hidden' : null;
      }
      return {
        ...state,
        isContactModalOpen: action.payload,
      };
    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_SCROLL_TO':
      return {
        ...state,
        scrollTo: action.payload,
      };
    case 'ON_INIT':
      return {
        ...state,
        isInit: true,
      };
    default:
      return state;
  }
};

export default reducer;
