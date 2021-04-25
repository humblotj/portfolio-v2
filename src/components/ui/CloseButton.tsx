import './CloseButton.scss';

interface Props {
    onClick?: () => void
}

const CloseButton = ({ onClick = () => {} }: Props) => (
  <button type="button" className="close-button" onClick={onClick}>
    <span />
    <span />
  </button>
);

export default CloseButton;
