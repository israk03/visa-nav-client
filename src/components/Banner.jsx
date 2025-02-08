import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const Banner = () => {
  return (
    <div className="mb-8">
      <Carousel showThumbs={false} autoPlay interval={3000} infiniteLoop>
        <div>
          <img
            src="https://via.placeholder.com/1200x400?text=Welcome+to+Visa+Navigator"
            alt="Banner 1"
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/1200x400?text=Apply+for+your+Dream+Visa"
            alt="Banner 2"
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/1200x400?text=Fast+Visa+Processing"
            alt="Banner 3"
          />
        </div>
      </Carousel>
    </div>
  );
};
