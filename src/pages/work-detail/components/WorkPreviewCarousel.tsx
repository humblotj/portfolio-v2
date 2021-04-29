import { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import './WorkPreviewCarousel.scss';
import image from '../../../assets/test.jpeg';
import BackArrow from '../../../components/ui/BackArrow';

interface Props {
  items: string[],
}

const PreviewItem = (items: string[]) => items.map((item, i) => (
  <div className="wrap" data-value={i + 1}>
    <img src={image} alt="" draggable={false} />
  </div>
));

const WorkPreviewCarousel = ({ items }: Props) => {
  const [activeIndex] = useState(0);

  return (
    <div className="work-preview-carousel">
      <div className="work-preview-carousel-inner">
        <AliceCarousel
          activeIndex={activeIndex}
          disableDotsControls
          items={PreviewItem(items)}
        />
        <div className="project-controls">
          <BackArrow>Previous Work</BackArrow>
          <BackArrow direction="right">Next Work</BackArrow>
        </div>
      </div>
    </div>

  );
};

export default WorkPreviewCarousel;
