import "./Carousel.css";

const Carousel = () => {
  return (
    <div
      id="projectCarousel"
      className="carousel slide custom-carousel"
      data-bs-ride="carousel"
      style={{ border: "3px solid black" }}
    >
      {/* Indicators. Need to be dynamically changed based on number of reports passed in */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#projectCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#projectCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
      </div>

      {/* Images in carousel. Need to be dynamically changed based on reports passed in */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="src/assets/sample1.jpg"
            className="d-block w-100"
            alt="sample1"
          ></img>
          <div className="carousel-caption d-none d-md-block">
            <h5>Report 1</h5>
            <p>Description: Report 1</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="src/assets/sample2.jpg"
            className="d-block w-100"
            alt="sample2"
          ></img>
          <div className="carousel-caption d-none d-md-block">
            <h5>Report 2</h5>
            <p>Description: Report 2</p>
          </div>
        </div>
      </div>

      {/* Next/prev buttons in carousel. Need to be dynamically changed based on number of reports passed in */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#projectCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#projectCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
