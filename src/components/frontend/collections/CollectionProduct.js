import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../../layouts/frontend/Navbar";

const CollectionProduct = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const { slug } = useParams();
  useEffect(() => {
    axios.get(`/api/fetchProducts/${slug}`).then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.product_data.product);
        setCategory(res.data.category_data.category);
        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Warning", res.data.message, "error");
      }
    });
  }, []);

  if (loading) {
    return <h2>Loading ...</h2>;
  } else {
    var showCategoryList = "";
    showCategoryList = product.map((item, idx) => {
      return (
        <div className="col-md-4" key={idx}>
          <div className="card">
            <Link to="">
              <img src="" className="w-100" alt="item.name" />
            </Link>
            <div className="card-body">
              <Link to={`/collection/${item.slug}`}>
                <h5>{item.name}</h5>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <Navbar />
      <div className="py-3-warning">
        <div className="container">
          <h6>Category/ Product Name</h6>
        </div>
      </div>
      <div className="py-3-warning">
        <div className="container">
          {/* <div className="row">{showProductList}</div> */}
        </div>
      </div>
    </div>
  );
};

export default CollectionProduct;
