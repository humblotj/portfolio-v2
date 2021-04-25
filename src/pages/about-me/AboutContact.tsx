import { useContext } from 'react';
import Modal from 'react-modal';
import CloseButton from '../../components/ui/CloseButton';
import { StoreContext } from '../../context/StoreProvider';

import './AboutContact.scss';
import About from './components/About';
import Contact from './components/Contact';

Modal.setAppElement('body');

const AboutContact = () => {
  const { store: { isContactModalOpen }, dispatch } = useContext(StoreContext);

  const closeContactModal = () => dispatch({ type: 'SET_CONTACT_MODAL_OPEN', payload: false });

  return (
    <>
      {isContactModalOpen && (
      <Modal
        overlayClassName="modal-overlay"
        className="modal-content"
        isOpen={isContactModalOpen}
      >
        <CloseButton onClick={closeContactModal} />
        <About />
        <Contact />
      </Modal>
      )}
    </>
  );
};

export default AboutContact;
