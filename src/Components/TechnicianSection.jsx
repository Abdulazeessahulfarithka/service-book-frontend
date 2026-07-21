import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import API from "../Services/api";


export default function TechnicianSection() {

  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getTechnicians();
  }, []);


  const getTechnicians = async () => {

    try {

      const { data } = await axios.get(
        `${API}api/technician/all`
      );


      if(data.success){
        setTechnicians(data.technicians);
      }


    } catch(error){

      console.log(
        "Technician Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <section className="service-section">


      <h2 className="text-center mb-5 fw-bold">
        Our Trusted Professionals
      </h2>



      {
        loading ?

        (
          <h4 className="text-center">
            Loading Technicians...
          </h4>
        )

        :

        (

        <div className="row g-4">


        {
          technicians.slice(0,4).map((tech)=>(


            <div
              className="col-xl-3 col-lg-4 col-md-6"
              key={tech._id}
            >


              <div className="card shadow border-0 rounded-4 h-100">


                <img
                  src={tech.image}
                  alt={tech.name}
                  className="card-img-top"
                  style={{
                    height:"250px",
                    objectFit:"cover"
                  }}
                />



                <div className="card-body text-center">


                  <h5 className="fw-bold">
                    {tech.name}
                  </h5>


                  <p className="text-muted">
                    {tech.specialization}
                  </p>



                  <p>
                    <FaStar className="text-warning"/>
                    {" "}
                    {tech.rating}
                  </p>



                  <p>
                    {tech.experience} Experience
                  </p>



                  <p>
                    {tech.completedJobs} Jobs Completed
                  </p>



                  <Link
                    to={`/technician/${tech._id}`}
                    className="btn btn-primary rounded-pill w-100"
                  >
                    View Profile
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

  );
}