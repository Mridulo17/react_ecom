import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const EditProduct = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productInput, setProductInput] = useState({
    category_id: "",
    slug: "",
    name: "",
    descrip: "",

    meta_title: "",
    meta_keyword: "",
    meta_descrip: "",

    selling_price: "",
    orginal_price: "",
    qty: "",
    brand: "",
    featured: "",
    popular: "",
    status: "",
  });

  const [picture, setPicture] = useState([]);
  const [errorlist, setError] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setProductInput({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };
  const [allcheckbox, setCheckboxes] = useState([]);
  const handleCheckbox = (e) => {
    e.persist();
    setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
  };

  const { id } = useParams();
  useEffect(() => {
    axios.get(`/api/all-category`).then((res) => {
      if (res.data.status === 200) {
        setCategoryList(res.data.category);
      }
    });

    axios.get(`/api/edit-product/${id}`).then((res) => {
      if (res.data.status === 200) {
        setProductInput(res.data.product);
        setCheckboxes(res.data.product);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        navigate("/admin/view-product");
      }
      setLoading(false);
    });
  }, []);
  const updateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("category_id", productInput.category_id);
    formData.append("slug", productInput.slug);
    formData.append("name", productInput.name);
    formData.append("descrip", productInput.descrip);
    formData.append("meta_title", productInput.meta_title);
    formData.append("meta_keyword", productInput.meta_keyword);
    formData.append("meta_descrip", productInput.meta_descrip);
    formData.append("selling_price", productInput.selling_price);
    formData.append("orginal_price", productInput.orginal_price);
    formData.append("qty", productInput.qty);
    formData.append("brand", productInput.brand);
    formData.append("featured", allcheckbox.featured ? "1" : "0");
    formData.append("popular", allcheckbox.popular ? "1" : "0");
    formData.append("status", allcheckbox.status ? "1" : "0");

    axios.post(`/api/product-update/${id}`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        console.log(allcheckbox);
        setError([]);
      } else if (res.data.status === 422) {
        swal("All field mandatory", "", "error");
        // setProductInput({ ...productInput, error_list: res.data.errors });
        setError(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        navigate("/admin/view-product");
      }
    });
  };
  if (loading) {
    return <h4>Edit Product Loading ...</h4>;
  }
  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Edit Product
            <Link
              to="/admin/view-product"
              className="btn btn-primary btn-sm float-end"
            >
              View Product
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={updateProduct} encType="multipart/form-data">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Home
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="seotags-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#seotags"
                  type="button"
                  role="tab"
                  aria-controls="seotags"
                  aria-selected="false"
                >
                  Seo Tags
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="otherdetails-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#otherdetails"
                  type="button"
                  role="tab"
                  aria-controls="otherdetails"
                  aria-selected="false"
                >
                  Other Details
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane card-body border fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="form-group mb-3">
                  <label>Select Category</label>
                  <select
                    name="category_id"
                    onChange={handleInput}
                    value={productInput.category_id}
                    className="form-control"
                  >
                    <option value="">Select Category</option>
                    {categoryList.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <small className="text-danger">{errorlist.category_id}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    onChange={handleInput}
                    value={productInput.slug}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.slug}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={productInput.name}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.name}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Description</label>
                  <textarea
                    name="descrip"
                    onChange={handleInput}
                    value={productInput.descrip}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div
                className="tab-pane card-body border fade"
                id="seotags"
                role="tabpanel"
                aria-labelledby="seotags-tab"
              >
                <div className="form-group mb-3">
                  <label>Meta Title</label>
                  <input
                    type="text"
                    name="meta_title"
                    onChange={handleInput}
                    value={productInput.meta_title}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.meta_title}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Keywords</label>
                  <textarea
                    name="meta_keyword"
                    onChange={handleInput}
                    value={productInput.meta_keyword}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Description</label>
                  <textarea
                    name="meta_descrip"
                    onChange={handleInput}
                    value={productInput.meta_descrip}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div
                className="tab-pane card-body border fade"
                id="otherdetails"
                role="tabpanel"
                aria-labelledby="otherdetails-tab"
              >
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label>Selling Price</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.selling_price}
                      name="selling_price"
                    />
                    <small className="text-danger">
                      {errorlist.selling_price}
                    </small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Orginal Price</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.orginal_price}
                      name="orginal_price"
                    />
                    <small className="text-danger">
                      {errorlist.orginal_price}
                    </small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Quantity</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.qty}
                      name="qty"
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Brand</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.brand}
                      name="brand"
                    />
                  </div>
                  <div className="col-md-8 form-group mb-3">
                    <label>Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleImage}
                      name="image"
                    />
                    <img
                      src={`http://127.0.0.1:8000/${productInput.image}`}
                      width="50px"
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Featured (checked=show)</label>
                    <input
                      type="checkbox"
                      className="w-50 h-50"
                      onChange={handleCheckbox}
                      defaultChecked={
                        allcheckbox.featured === 1 ? "true" : false
                      }
                      name="featured"
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Popular (checked=show)</label>
                    <input
                      type="checkbox"
                      className="w-50 h-50"
                      name="popular"
                      onChange={handleCheckbox}
                      defaultChecked={
                        allcheckbox.popular === 1 ? "true" : false
                      }
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Status (checked=hidden)</label>
                    <input
                      type="checkbox"
                      className="w-50 h-50"
                      name="status"
                      onChange={handleCheckbox}
                      defaultChecked={allcheckbox.status === 1 ? "true" : false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary px-4 mt-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
