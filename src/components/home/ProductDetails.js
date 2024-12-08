import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../../api/apiOrder";
import { getProductDetails } from "../../api/apiProduct";
import { isAuthenticated, userInfo } from "../../utils/auth";
import { API } from "../../utils/config";
import { showError, showSuccess } from "../../utils/messages";
import Layout from "../Layout";
import Reviews from "./Reviews/Reviews";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [totalRating, setTotalRating] = useState();

  const { id } = useParams();

  const handleAddToCart = (product) => () => {
    if (isAuthenticated()) {
      setError(false);
      setSuccess(false);
      const user = userInfo();
      const cartItem = {
        user: user._id,
        product: product._id,
        price: product.price,
      };

      addToCart(user.token, cartItem)
        .then(() => setSuccess(true))
        .catch((err) => {
          if (err.response) setError(err.response.data);
          else setError("Adding to cart failed!");
        });
    } else {
      setSuccess(false);
      setError("Please login first!");
    }
  };

  useEffect(() => {
    getProductDetails(id)
      .then((response) => {
        setProduct(response.data);
        setTotalRating(response.data.total_rating);
      })
      .catch(() => setError("Failed to load product details"));
  }, [id]);

  return (
    <Layout title="Product Details">
      <div className="container my-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-light p-2 rounded">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="#">Product</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.category ? product.category.name : ""}
            </li>
          </ol>
        </nav>

        {/* Notifications */}
        <div>
          {showSuccess(success, "Item added to cart!")}
          {showError(error, error)}
        </div>

        {/* Product Details */}
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card shadow-sm border-0">
              {product && product._id ? (
                <img
                  src={`${API}/product/photo/${product._id}`}
                  alt={product.name}
                  className="card-img-top rounded"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-light rounded"
                  style={{ height: "400px" }}
                >
                  <span>No Image Available</span>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-text">
                  <strong>Price:</strong> &#2547; {product.price}
                </p>
                <p className="card-text">
                  {product.quantity ? (
                    <span className="badge bg-success">In Stock</span>
                  ) : (
                    <span className="badge bg-danger">Out of Stock</span>
                  )}
                </p>
                <p className="card-text">
                  <strong>Sold:</strong> {product.sold} Items
                </p>
                <p className="card-text">
                  <strong>Category:</strong>{" "}
                  {product.category && product.category.name}
                </p>
                <p className="card-text">
                  <strong>Rating:</strong>{" "}
                  {totalRating !== 0 && totalRating !== undefined
                    ? `${totalRating.toFixed(2)} / 5.00`
                    : "Not Rated Yet!"}
                </p>
                <p className="card-text">
                  <strong>Description:</strong> {product.description}
                </p>
                {product.quantity && (
                  <button
                    className="btn btn-primary btn-md w-100"
                    onClick={handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-4">
          <Reviews
            setTotalRatingFunc={(total_rating) => setTotalRating(total_rating)}
            productId={id}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
