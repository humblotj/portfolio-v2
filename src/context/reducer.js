const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTACT_MODAL_OPEN':
      return {
        ...state,
        isContactModalOpen: action.payload,
      };
    case 'SET_IS_LOADING':
      console.log(action);
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
