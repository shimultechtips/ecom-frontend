import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <div className="container">
        <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
        <div className="d-flex justify-content-center">
          <a href="#" className="text-white mx-2">
            <i className="fab fa-facebook"></i> Facebook
          </a>
          <a href="#" className="text-white mx-2">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="#" className="text-white mx-2">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
