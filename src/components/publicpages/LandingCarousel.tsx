//Implemented "Image Carousel" as a placeholder for featuring future projects
//Finalized design will be "Project Cards" (NOT IMAGES) with Project Name & Description
import { Carousel } from "react-bootstrap";
import "./Carousel.css";

function CarouselComponent() {
  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <Carousel>
          <Carousel.Item>
            <img
              className="carousel-image border rounded-5"
              src="/images/test.JPG"
              alt="First slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carousel-image border rounded-5"
              src="/images/test.JPG"
              alt="Second slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carousel-image border rounded-5"
              src="/images/test.JPG"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselComponent;
