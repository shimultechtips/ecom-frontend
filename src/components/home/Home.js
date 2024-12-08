import { useEffect, useState } from "react";
import { addToCart } from "../../api/apiOrder";
import {
  getCategories,
  getFilteredProducts,
  getProducts,
} from "../../api/apiProduct";
import { isAuthenticated, userInfo } from "../../utils/auth";
import { showError, showSuccess } from "../../utils/messages";
import { prices } from "../../utils/prices";
import Layout from "../Layout";
import Card from "./Card";
import Carousel from "./Carousel/Carousel";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("descending");
  const [sortBy, setSortBy] = useState("createdAt");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    price: [],
  });
  const [skip, setSkip] = useState(limit);
  const [toggleSkipButton, setToggleSkipButton] = useState(false);
  const [query, setQuery] = useState();

  useEffect(() => {
    getProducts(sortBy, order, limit)
      .then((response) => {
        setProducts(response.data);
        setError(false);
      })
      .catch((err) => setError("Failed to load products!"));

    getCategories()
      .then((response) => {
        setError(false);
        setCategories(response.data);
      })
      .catch((err) => {
        setError("Failed To Load Categories!");
      });
  }, []);

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
        .then((response) => {
          setSuccess(true);
        })
        .catch((err) => {
          if (err.response) setError(err.response.data);
          else setError("Adding To Cart Failed!");
        });
    } else {
      setSuccess(false);
      setError("Please Login First!");
    }
  };

  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
    handleFilters(filters, event.target.value);
  };

  const handleChangeOrder = (event) => {
    setOrder(event.target.value);
    handleFilters(filters, event.target.value);
  };

  const handleFilters = (myFilters, filterBy) => {
    const newFilters = { ...filters };

    let newOrder = order;
    let newSortBy = sortBy;

    if (filterBy === "category") {
      newFilters[filterBy] = myFilters;
      setSkip(limit);
    }

    if (filterBy === "name") {
      newFilters[filterBy] = myFilters;
      setSkip(limit);
    }

    if (filterBy === "price") {
      const data = prices;
      let arr = [];
      for (let i in data) {
        if (data[i].id === parseInt(myFilters)) {
          arr = data[i].arr;
        }
      }
      newFilters[filterBy] = arr;
      setSkip(limit);
    }

    setFilters(newFilters);

    if (
      filterBy === "price" ||
      filterBy === "sold" ||
      filterBy === "total_rating" ||
      filterBy === "createdAt"
    ) {
      setSkip(limit);
      newSortBy = filterBy;
    }

    if (filterBy === "descending" || filterBy === "ascending") {
      setSkip(limit);
      newOrder = filterBy;
    }

    getFilteredProducts(0, limit, newFilters, newOrder, newSortBy)
      .then((response) => {
        setProducts(response.data);
        if (response.data.length === 0) {
          setToggleSkipButton(true);
          setSkip(limit);
        } else {
          setToggleSkipButton(false);
        }
        setError(false);
      })
      .catch((err) => {
        setError("Failed To Load Products!");
      });
  };

  const showFilters = () => {
    return (
      <div
        style={{
          padding: 10,
          border: "1px solid #ced4da",
          borderRadius: ".5rem",
          marginBottom: 10,
        }}
      >
        <div className=" pb-5">
          <Carousel />
        </div>
        <div className="row gy-3">
          <div className="col-lg-3 col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  Filter By Categories
                </h5>
                <ul className="list-unstyled mt-3 mb-0">
                  <CheckBox
                    handleFilters={(myFilters) =>
                      handleFilters(myFilters, "category")
                    }
                    categories={categories}
                  />
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">Filter By Price</h5>
                <div className="row mt-3">
                  <RadioBox
                    prices={prices}
                    handleFilters={(myFilters) =>
                      handleFilters(myFilters, "price")
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">Order</h5>
                <select
                  className="form-select mt-3"
                  value={order}
                  onChange={handleChangeOrder}
                >
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">Sort By</h5>
                <select
                  className="form-select mt-3"
                  value={sortBy}
                  onChange={handleChangeSortBy}
                >
                  <option value="price">Price</option>
                  <option value="sold">Sold</option>
                  <option value="total_rating">Review</option>
                  <option value="createdAt">Created</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  let setSkipNumber = () => {
    getFilteredProducts(skip, limit, filters, order, sortBy)
      .then((response) => {
        const newProducts = response.data.filter((newProduct) => {
          return !products.some(
            (existingProduct) => existingProduct._id === newProduct._id
          );
        });

        setProducts([...products, ...newProducts]);

        if (response.data.length === 0) {
          setToggleSkipButton(true);
          setSkip(limit);
        } else {
          setToggleSkipButton(false);
        }
        setError(false);
      })
      .catch((err) => {
        setError("Failed To Load Products!");
      });

    setSkip(skip + limit);
  };

  const search = () => {
    return (
      <input
        value={query}
        onChange={(e) => handleFilters(e.target.value, "name")}
        type="search"
        className="form-control my-1"
        placeholder="Search for a product..."
      />
    );
  };

  return (
    <Layout title="Home Page" className="container-fluid">
      <div className="container">
        <div className="col-12 col-lg-auto mb-2 mb-lg-2">{search()}</div>

        {categories && showFilters()}
        <div style={{ width: "100%" }}>
          {showError(error, error)}
          {showSuccess(success, "Added to cart successfully!")}
        </div>
        <div className="row">
          {products &&
            products.map((product) => (
              <Card
                handleAddToCart={handleAddToCart(product)}
                product={product}
                key={product._id}
              />
            ))}
        </div>
        <div className="d-flex align-items-center my-4 flex-column">
          {/* {toggleSkipButton ? (
          <p
            style={{ fontWeight: "bold", fontSize: 18 }}
            className="text-danger"
          >
            All Products Loaded...
          </p>
        ) : (
          ""
        )} */}

          <button
            className="btn btn-primary"
            disabled={toggleSkipButton}
            onClick={() => setSkipNumber()}
            style={{ width: "150px" }}
          >
            Load More...
          </button>
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
