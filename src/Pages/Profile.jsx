import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../Services/api";

export default function Profile() {

  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const auth = JSON.parse(localStorage.getItem("auth"));

    if(auth){
      setUser(auth.user);
      getBookings(auth.token);
    }

  }, []);



  const getBookings = async(token)=>{

    try{

      const {data} = await axios.get(
        `${API}api/booking/my-bookings`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      if(data.success){

        setBookings(data.bookings);

      }


    }catch(error){

      console.log(error);

    }

  };



  return (

    <div className="container py-5">


      <div className="card shadow mb-4">

        <div className="card-body">

          <h2>
            My Profile
          </h2>


          <hr/>


          <h5>
            Name: {user.name}
          </h5>


          <h5>
            Email: {user.email}
          </h5>


          <h5>
            Mobile: {user.mobile}
          </h5>


        </div>

      </div>




      <h2 className="mb-3">
        My Bookings
      </h2>



      {

        bookings.length === 0 ?

        (
          <div className="alert alert-info">
            No bookings found
          </div>
        )

        :

        bookings.map((booking)=>(


          <div 
            className="card shadow mb-3"
            key={booking._id}
          >


            <div className="card-body">


              <h4>
                {booking.service?.serviceName}
              </h4>


              <p>
                Amount:
                ₹{booking.amount}
              </p>


              <p>
                Date:
                {booking.bookingDate}
              </p>


              <p>
                Time:
                {booking.preferredTime}
              </p>


              <p>
                Address:
                {booking.address}
              </p>



              <span className="badge bg-primary">

                {booking.bookingStatus}

              </span>



            </div>


          </div>


        ))

      }



    </div>

  );

}