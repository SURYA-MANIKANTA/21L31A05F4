import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function HomeScreen() {
  const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
  const categories = [
    "Phone",
    "Compani",
    "TV",
    "Earphone",
    "Tablet",
    "Charger",
    "Mouse",
    "Keyboard",
    "Bluetooth",
    "Pendrive",
    "Remote",
    "Speaker",
    "Headset",
    "Laptop",
    "PC",
  ];

  const [selectedCompany, setSelectedCompany] = useState("AMZ");
  const [selectedCategory, setSelectedCategory] = useState("Phone");
  const [top, setTop] = useState(10); // Number of products to fetch
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tok =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxOTc0OTg2LCJpYXQiOjE3MjE5NzQ2ODYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImRjMjA4ZGM4LWRjMGMtNDJhMC1iYzI1LWQ5NzVmZmMyOGMxNCIsInN1YiI6InBhZ290aWdvcGFsMTQzQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IlZpZ25hbidzIEluc3RpdHV0ZSBJbmZvcm1hdGlvbiBUZWNobm9sb2d5IiwiY2xpZW50SUQiOiJkYzIwOGRjOC1kYzBjLTQyYTAtYmMyNS1kOTc1ZmZjMjhjMTQiLCJjbGllbnRTZWNyZXQiOiJTdHF2UmVyRUJxd1dXQnpTIiwib3duZXJOYW1lIjoiU3VyeWEgTWFuaWthbnRhIiwib3duZXJFbWFpbCI6InBhZ290aWdvcGFsMTQzQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxTDMxQTA1RjQifQ.ewMI2mSoKpsw5cK_xeN75I8Mjxpg_41VHAtB1EYUItk";
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, status } = await axios.get(
          `http://20.244.56.144/test/companies/${selectedCompany}/categories/${selectedCategory}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
          {
            headers: { Authorization: `Bearer ${tok}` },
          }
        );
        if (status !== 200) {
          throw new Error("Network response is not there");
        }
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCompany, selectedCategory, top, minPrice, maxPrice]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="company" className="form-label">
              <strong>Company:</strong>
            </label>
            <select
              id="company"
              className="form-select"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <div className="col">
            <label htmlFor="category" className="form-label">
              <strong>Category:</strong>
            </label>
            <select
              id="category"
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="top" className="form-label">
              <strong>Number of Products:</strong>
            </label>
            <input
              id="top"
              type="number"
              className="form-control"
              value={top}
              min="1"
              onChange={(e) => setTop(e.target.value)}
            />
          </div>

          <div className="col">
            <label htmlFor="minPrice" className="form-label">
              <strong>Min Price:</strong>
            </label>
            <input
              id="minPrice"
              type="number"
              className="form-control"
              value={minPrice}
              min="1"
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div className="col">
            <label htmlFor="maxPrice" className="form-label">
              <strong>Max Price:</strong>
            </label>
            <input
              id="maxPrice"
              type="number"
              className="form-control"
              value={maxPrice}
              min="1"
              max="10000"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">Error: {error}</p>}
        {data.length > 0 && (
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>
                  <strong>Product Name</strong>
                </th>
                <th>
                  <strong>Price</strong>
                </th>
                <th>
                  <strong>Rating</strong>
                </th>
                <th>
                  <strong>Discount</strong>
                </th>
                <th>
                  <strong>Availability</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr key={index}>
                  <td>
                    <span className="text-primary fw-bold">
                      {product.productName}
                    </span>
                  </td>
                  <td>${product.price}</td>
                  <td>{product.rating}</td>
                  <td>{product.discount}%</td>
                  <td>{product.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
