import React, { useEffect, useState } from "react";

const DynamicCarousel = () => {
  const images = [
    "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJCbG9jay1iX2NvbmZpZ1wvMFwvMTEzLVdpSF9XZWJNLXgwbWFxdC5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjQ4LCJoZWlnaHQiOjQ3NywiZml0Ijoib3V0c2lkZSJ9fX0=",
    "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJCbG9jay1iX2NvbmZpZ1wvMFwvMTEzLVdpSF9XZWIyLWNsbjA5ci5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjQ4LCJoZWlnaHQiOjQ3NywiZml0Ijoib3V0c2lkZSJ9fX0=",
    "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJCbG9jay1iX2NvbmZpZ1wvMFwvMTEzLTUtZmt3amdtLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDgsImhlaWdodCI6NDc3LCJmaXQiOiJvdXRzaWRlIn19fQ==",
    "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJCbG9jay1iX2NvbmZpZ1wvMFwvMTEzLTI2Njd4OTUwLXBxZjFuOS5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjQ4LCJoZWlnaHQiOjQ3NywiZml0Ijoib3V0c2lkZSJ9fX0=",
    "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJCbG9jay1iX2NvbmZpZ1wvMFwvMTEzLVdpSF9XZWIzLWJ5OGtqNC5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjQ4LCJoZWlnaHQiOjQ3NywiZml0Ijoib3V0c2lkZSJ9fX0=",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <img
              src={image}
              className="d-block w-100"
              alt={`Slide ${index + 1}`}
            />
            {/* <div className="carousel-caption d-none d-md-block">
              <h5>{`Slide ${index + 1}`}</h5>
              <p>{`This is the description for slide ${index + 1}`}</p>
            </div> */}
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
          )
        }
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={() =>
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        }
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default DynamicCarousel;
