import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../Services/api";

export default function Booking() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);


  const [booking, setBooking] = useState({
    customerName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    bookingDate: "",
    preferredTime: "",
    problemDescription: "",
  });



  useEffect(() => {
    getService();
  }, []);



  // Get Service Details
  const getService = async () => {

    try {

      const { data } = await axios.get(
        `${API}api/service/getservice/${id}`
      );


      if(data.success){
        setService(data.service);
      }


    } catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }

  };




  const handleChange = (e)=>{

    setBooking({
      ...booking,
      [e.target.name]: e.target.value
    });

  };





  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{


      const auth = JSON.parse(
        localStorage.getItem("auth")
      );



      if(!auth){

        alert("Please Login First");
        navigate("/login");
        return;

      }



      const {data} = await axios.post(

        `${API}api/booking/create`,

        {

          user: auth.user._id,

          service: service._id,

          customerName: booking.customerName,

          mobile: booking.mobile,

          email: booking.email,

          address: booking.address,

          city: booking.city,

          pincode: booking.pincode,

          bookingDate: booking.bookingDate,

          preferredTime: booking.preferredTime,

          problemDescription: booking.problemDescription,

          amount: service.serviceCharge

        },


        {

          headers:{

            Authorization:`Bearer ${auth.token}`

          }

        }


      );



      if(data.success){

        alert("Booking Created Successfully");

        navigate("/profile");

      }
      else{

        alert(data.message);

      }



    }

    catch(error){

      console.log(
        error.response?.data || error
      );

      alert("Booking Failed");

    }


  };





  if(loading){

    return (
      <h3 className="text-center mt-5">
        Loading...
      </h3>
    );

  }





  return (

    <div className="container py-5">

      <div className="row">


        <div className="col-md-5">


          <div className="card shadow">


            <img
              src={service.image}
              className="card-img-top"
              alt={service.serviceName}
            />



            <div className="card-body">


              <h3>
                {service.serviceName}
              </h3>


              <p>
                {service.description}
              </p>



              <h5 className="text-success">
                ₹{service.serviceCharge}
              </h5>


            </div>


          </div>


        </div>





        <div className="col-md-7">


          <form onSubmit={handleSubmit}>


            <input
              type="text"
              name="customerName"
              className="form-control mb-3"
              placeholder="Customer Name"
              value={booking.customerName}
              onChange={handleChange}
              required
            />



            <input
              type="text"
              name="mobile"
              className="form-control mb-3"
              placeholder="Mobile Number"
              value={booking.mobile}
              onChange={handleChange}
              required
            />



            <input
              type="email"
              name="email"
              className="form-control mb-3"
              placeholder="Email"
              value={booking.email}
              onChange={handleChange}
              required
            />



            <textarea
              name="address"
              className="form-control mb-3"
              placeholder="Address"
              value={booking.address}
              onChange={handleChange}
              required
            />



            <input
              type="text"
              name="city"
              className="form-control mb-3"
              placeholder="City"
              value={booking.city}
              onChange={handleChange}
              required
            />



            <input
              type="text"
              name="pincode"
              className="form-control mb-3"
              placeholder="Pincode"
              value={booking.pincode}
              onChange={handleChange}
              required
            />



            <input
              type="date"
              name="bookingDate"
              className="form-control mb-3"
              value={booking.bookingDate}
              onChange={handleChange}
              required
            />



            <input
              type="text"
              name="preferredTime"
              className="form-control mb-3"
              placeholder="Preferred Time (10:00 AM)"
              value={booking.preferredTime}
              onChange={handleChange}
              required
            />



            <textarea
              name="problemDescription"
              className="form-control mb-3"
              placeholder="Describe Your Problem"
              value={booking.problemDescription}
              onChange={handleChange}
              required
            />



            <button className="btn btn-primary w-100">
              Confirm Booking
            </button>


          </form>


        </div>


      </div>


    </div>

  );

}