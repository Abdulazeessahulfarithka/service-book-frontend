import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaTools,
  FaStar,
  FaBroom,
} from "react-icons/fa";

import API from "../Services/api";
import "./Home.css";
import TechnicianSection from "../Components/TechnicianSection";

export default function Home() {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getAllServices();
  }, []);


  const getAllServices = async () => {
    try {

      const { data } = await axios.get(
        `${API}api/service/getservice`
      );


      if (data.success) {
        setServices(data.services);
      }


    } catch (error) {

      console.log(
        "Service Fetch Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <>


      {/* Hero Section */}

      <section className="hero-section">

        <div className="container-fluid text-center">

          <h1>
            Book Trusted Home Services
          </h1>


          <p className="lead text-muted">
            Verified professionals for every household need.
          </p>



          <Link
            to="/services"
            className="btn btn-primary btn-lg mt-3 rounded-pill px-5"
          >
            Explore Services
          </Link>


        </div>


      </section>




      {/* Services Section */}

      <section className="service-section">


        <h2 className="text-center mb-5 fw-bold">
          Popular Services
        </h2>



        {
          loading ? (

            <h4 className="text-center">
              Loading Services...
            </h4>


          ) : (


            <div className="row g-4">


              {
                services.slice(0,4).map((service)=>(


                  <div
                    className="col-xl-3 col-lg-4 col-md-6"
                    key={service._id}
                  >


                    <div className="card shadow border-0 rounded-4 h-100 overflow-hidden service-card">


                      {
                        service.image && (

                          <img
                            src={service.image}
                            alt={service.serviceName}
                            className="card-img-top"
                          />

                        )
                      }



                      <div className="card-body d-flex flex-column text-center">


                        <h5 className="fw-bold">

                          {service.serviceName}

                        </h5>



                        <p className="text-muted">

                          {service.category}

                        </p>




                        <p className="small flex-grow-1">

                          {service.description}

                        </p>




                        <h4 className="text-success">

                          ₹{service.serviceCharge}

                        </h4>




                        <Link

                          to={`/booking/${service._id}`}

                          className="btn btn-primary rounded-pill mt-3 booking-btn"

                        >

                          Book Now

                        </Link>



                      </div>


                    </div>


                  </div>



                ))
              }



            </div>


          )
        }


      </section>

{/* Technicians */}

<TechnicianSection />



      {/* Why Choose Us */}


      <section className="why-section bg-primary text-white">


        <div className="container-fluid text-center">


          <h2 className="fw-bold">
            Why Choose Us?
          </h2>




          <div className="row mt-5">



            <div className="col-md-4 mb-4">

              <FaTools size={45}/>

              <h5 className="mt-3">
                Verified Professionals
              </h5>


              <p>
                Experienced technicians you can trust.
              </p>

            </div>





            <div className="col-md-4 mb-4">

              <FaStar size={45}/>

              <h5 className="mt-3">
                Top Rated Services
              </h5>


              <p>
                Quality service with customer ratings.
              </p>

            </div>





            <div className="col-md-4 mb-4">

              <FaBroom size={45}/>

              <h5 className="mt-3">
                Affordable Pricing
              </h5>


              <p>
                Best price for professional services.
              </p>

            </div>



          </div>



        </div>


      </section>



    </>
  );
}