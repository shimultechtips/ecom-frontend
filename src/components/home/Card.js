import React from "react";
import { Link } from "react-router-dom";
import { API } from "../../utils/config";

const Card = ({ product, handleAddToCart }) => {
  const imgStyle = {
    height: "250px",
    objectFit: "cover",
    borderRadius: "0.5rem 0.5rem 0 0",
  };

  return (
    <div className="col-md-6 col-xs-12 col-lg-4 col-xl-3 mb-4">
      <div className="card shadow-sm h-100">
        {product && product._id ? (
          <img
            src={`${API}/product/photo/${product._id}`}
            alt={product.name}
            style={imgStyle}
            className="card-img-top"
          />
        ) : (
          <div
            style={{
              height: "250px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f8f9fa",
              borderRadius: "0.5rem 0.5rem 0 0",
            }}
          >
            <span>No Image Available</span>
          </div>
        )}

        <div className="card-body d-flex flex-column">
          <h5
            className="card-title text-truncate"
            title={product.name}
            style={{ minHeight: "3rem" }}
          >
            {product.name}
          </h5>
          <p className="mb-1">
            <strong>Price:</strong> &#2547; {product.price}
          </p>
          <p className="mb-1">
            {product.quantity > 0 ? (
              <span className="badge bg-success">In Stock</span>
            ) : (
              <span className="badge bg-danger">Out of Stock</span>
            )}
          </p>
          <p className="mb-1">
            <strong>Sold:</strong> {product.sold} Items
          </p>
          <p className="mb-1">
            <strong>Category:</strong>{" "}
            {product.category.name || "Uncategorized"}
          </p>
          <p className="mb-3">
            <strong>Rating:</strong>{" "}
            {product.total_rating !== 0 && product.total_rating !== undefined
              ? `${product.total_rating.toFixed(2)} / 5`
              : "Not Rated Yet"}
          </p>

          <div className="mt-auto">
            <Link to={`/product/${product._id}`}>
              <button className="btn btn-warning btn-sm w-100 mb-2">
                View Product
              </button>
            </Link>
            {product.quantity > 0 && (
              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-sm w-100"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
