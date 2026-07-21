import React, { useEffect, useState } from "react";
import API from "../Services/api";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Service() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchServices();
  }, []);

 
const fetchServices = async () => {
  try {
    const { data } = await axios.get(`${API}api/service/getservice`);

    if (data.success) {
      setServices(data.services);
      setFilteredServices(data.services);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    const result = services.filter((service) =>
      service.serviceName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredServices(result);
  }, [search, services]);

  return (
    <div className="container py-5">

      <h2 className="text-center mb-4">
        Our Services
      </h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search Service..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">

        {filteredServices.map((service) => (

          <div
            className="col-md-4 mb-4"
            key={service._id}
          >

            <div className="card h-100 shadow">

              <img
                src={service.image}
                alt={service.serviceName}
                className="card-img-top"
              />

              <div className="card-body">

                <h5>{service.serviceName}</h5>

                <p>{service.category}</p>

                <p>
                  ₹{service.serviceCharge}
                </p>

                <Link
                  to={`/booking/${service._id}`}
                  className="btn btn-primary"
                >
                  Book Now
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}