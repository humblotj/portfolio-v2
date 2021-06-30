import './CloseButton.scss';

interface Props {
    onClick?: () => void
}

const CloseButton = ({ onClick = () => {} }: Props) => (
  <button type="button" className="close-button" onClick={onClick} aria-label="close">
    <span aria-hidden />
    <span aria-hidden />
  </button>
);

export default CloseButton;
