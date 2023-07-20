import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewProduct = () => {
  const [loading, setLoading] = useState(true);
  const [viewProduct, setViewProduct] = useState([]);

  useEffect(() => {
    document.title = "View Product";
    axios.get(`/api/product-view`).then((res) => {
      if (res.status === 200) {
        setViewProduct(res.data.products);
      }
      setLoading(false);
    });
  }, []);

  var display_productdata = "";
  if (loading) {
    return <h4>Product Loading ...</h4>;
  } else {
    var prodStatus = "";
    display_productdata = viewProduct.map((item) => {
      if (item.status == "0") {
        prodStatus = "Shown";
      } else if (item.status == "1") {
        prodStatus = "Hidden";
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.category.name}</td>
          <td>{item.name}</td>
          <td>{item.selling_price}</td>
          <td>
            <img
              src={`http://localhost:8000/${item.image}`}
              width="50px"
              alt={item.name}
            />
          </td>
          <td>
            <Link
              to={`/admin/edit-product/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>{prodStatus}</td>
        </tr>
      );
    });
  }

  return (
    <div className="card px-4 mt-3">
      <div className="card-header">
        <h4>
          View Product
          <Link
            to="/admin/add-product"
            className="btn btn-success btn-sm float-end"
          >
            Add Product
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Category Name</th>
                <th scope="col">Product Name</th>
                <th scope="col">Selling Price</th>
                <th scope="col">Image</th>
                <th scope="col">Edit</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>{display_productdata}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
