import './Laptop.scss';
import { ReactComponent as MacbookCover } from '../assets/macbook-cover.svg';
import { ReactComponent as MacbookTop } from '../assets/macbook-top.svg';
import { ReactComponent as MacbookBottom } from '../assets/macbook-bottom.svg';

interface Props {
  src: string
}

const Laptop = ({ src }: Props) => (
  <div className="mockup mockup-macbook loaded opened">
    <div className="part top">
      <MacbookTop className="top" />
      <MacbookCover className="cover" />
      <img className="video" src={src} alt="" />
    </div>
    <div className="part bottom">
      <MacbookCover className="cover" />
      <MacbookBottom className="bottom" />
    </div>
  </div>
);

export default Laptop;
