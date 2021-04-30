/* eslint-disable no-param-reassign */
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

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

const WorkPreviewCarousel = ({ items }: Props) => (
  <div className="work-preview-carousel">
    <div className="work-preview-carousel-inner">

      <Slider
        slidesToShow={1}
        infinite={false}
      >
        {PreviewItem(items)}
      </Slider>
    </div>
    <div className="project-controls">
      <BackArrow>Previous Work</BackArrow>
      <BackArrow direction="right">Next Work</BackArrow>
    </div>
  </div>

);

export default WorkPreviewCarousel;
