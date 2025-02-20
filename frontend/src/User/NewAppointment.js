import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InlineWidget } from "react-calendly";
import './NewAppointment.css';

const NewAppointment = () => {
  const [hasPendingAppointment, setHasPendingAppointment] = useState(null);
  const [isBooked, setIsBooked] = useState(0);

  const [eventDataCalendly, setEventDataCalendly] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const checkPendingAppointment = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {navigate("/consult-oracle");return;}
        const response = await axios.post("http://localhost:5000/api/check-appointment", { authToken });
        setHasPendingAppointment(response.data.hasPendingAppointment);
      } catch (error) {
        console.error("Error checking appointment:", error);
        setHasPendingAppointment(false);
      }
    };
    checkPendingAppointment();
  }, [navigate]);

  useEffect(() => {
    if (hasPendingAppointment === false) {
      navigate("/consult-oracle");
    }
  }, [hasPendingAppointment, navigate]);

  useEffect(() => {
    const handleCalendlyEvent = (event) => {
      if (event.data.event === "calendly.event_scheduled") {
        fetchCalendlyEventData(event.data.payload.event.uri);
      }
    };

    window.addEventListener("message", handleCalendlyEvent);

    return () => {
      window.removeEventListener("message", handleCalendlyEvent);
    };
  }, []);

  const fetchCalendlyEventData = async (eventUrl) => {
    try {
        const response = await fetch(eventUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_CALENDLY_PAT}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        setEventDataCalendly(data.resource);
        if(data.resource){
          setIsBooked(1);
          setAppointmentBooked(data.resource);
        }

    } catch (error) {
        console.error("Error fetching Calendly event data:", error);
    }
};

  const setAppointmentBooked = async (eventDataCalendly) => {
      try {
        const authToken = localStorage.getItem("authToken");
        await axios.post("http://localhost:5000/api/set-appointment", {
          authToken,
          eventDataCalendly
       });
      } catch (error) {
        console.error("Error checking appointment:", error);
      } 
  }


  return (
    <>
    {isBooked === 1 ? (
      <>
      <div className="p-4">
        <div className="row d-flex justify-content-center text-center flex-column align-items-center">
          <h4>Your Meeting has been scheduled!</h4>
          <p>Please check your email with the details of your booking.</p>
        </div>
        <div className="row">
          <div className="d-flex justify-content-center align-items-center">
            <div className="meeting-confirmed p-3">
                <div className="row my-2">
                  <div className="fw-bold col-md-4">Creation Date</div>
                  <div className="col-md-6">
                    {(() => {
                      const dateObj = new Date(eventDataCalendly.created_at);
                      return `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()}`;
                    })()}
                  </div>
                </div>
                
                <div className="row my-2">
                  <div className="fw-bold col-md-4">Meeting Type</div>
                  <div className="col-md-6">{eventDataCalendly.location['type'] == 'google_conference' ? 'Google Conference' : ''}</div>
                </div>
                <div className="row my-2">
                  <div className="fw-bold col-md-4">Meeting Title</div>
                  <div className="col-md-6">{eventDataCalendly.name}</div>
                </div>
                <div className="row my-2">
                  <div className="fw-bold col-md-4">Meeting Date</div>
                  <div className="col-md-6">
                    {(() => {
                      const dateObj = new Date(eventDataCalendly.start_time);
                      return `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()}`;
                    })()}
                  </div>
                </div>
                <div className="row my-2">
                  <div className="fw-bold col-md-4">Meeting Time</div>
                  <div className="col-md-6">
                    {(() => {
                      const dateObj = new Date(eventDataCalendly.start_time);
                      return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                    })()}
                  </div>

                </div>
                <div className="row my-2">
                  <div className="fw-bold col-md-4">Status</div>
                  <div className="col-md-6">{eventDataCalendly.status}</div>
                </div>
                <div className="row my-2">
                  <div className="fw-bold col-md-4 mt-2">Google Meet Link</div>
                  <div className="col-md-6">
                  <div className="prb-2">
                    <div onClick={() => window.open(eventDataCalendly.location['join_url'], '_blank')}
                      style={{ cursor: 'pointer', color: 'white', textDecoration: 'none' }}>
                      Google Meet
                    </div>
                  </div>

                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      </>

    ) : (
      <>
        <div className="App">
          {hasPendingAppointment === null ? (
            <p>Loading...</p>
          ) : hasPendingAppointment ? (
            <InlineWidget url="https://calendly.com/mujtabashafqat0" />
          ) : (
            <p>Redirecting...</p>
          )}
        </div>
      </>
    )}
    </>
  );
};

export default NewAppointment;
