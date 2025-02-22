import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import paymentImg from "../../images/payment.jpeg";
import Select from 'react-select';
import CountryList from 'react-select-country-list';
import ErrorBox from "../../ErrorBox";
import "./StripePage.css";
import { IoIosArrowBack } from "react-icons/io";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import {jwtDecode} from 'jwt-decode';

const StripePage = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [price, setPrice] = useState(0);

  const fetchPriceData = async () => {
    try {
      const response = await axios.get('/api/price-data');
      const matchingPlan = response.data.price_details.find(plan => plan.pricing_id === parseInt(id));

        if (matchingPlan) {
          setPrice(matchingPlan.price); // Set the price state
        } else {
          console.warn("No matching pricing plan found.");
        }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const checkPendingAppointment = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {navigate("/consult-oracle");return;}
      const response = await axios.post("/api/check-paid", { authToken });
      if(response.data.hasPendingAppointment == true){
        navigate('/consult-oracle');
        return;
      } 
    } catch (error) {
      console.error("Error checking appointment:", error);
    }
  };

  useEffect(() => {
    fetchPriceData();
    checkPendingAppointment();
  }, []);
  

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState(null);

  const countries = CountryList().getData();

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption);
  };

  const validateInputs = () => {
    if (!name || !email || !address || !city || !postalCode || !country) {
      setError("Please fill in all required fields.");
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Invalid email address.");
      return false;
    }
    return true;
  };

  const getUserIdFromToken = (token) => {
    try {
      if (!token) return null;
  
      const decodedToken = jwtDecode(token);
      return decodedToken.user_id; // Extract user_id from the token
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
  
    if (!validateInputs() || !stripe || !elements) return;
  
    setLoading(true);
    const cardElement = elements.getElement(CardElement);
  
    try {
      const response = await fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price, currency: "usd" }) // Fixed price object
      });
  
      if (!response.ok) throw new Error("Failed to create PaymentIntent");
  
      const { clientSecret } = await response.json();
  
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
            email,
            address: { line1: address, city, postal_code: postalCode, country: country.value }
          }
        }
      });
  
      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        // setSuccess("Payment successful! Thank you for your purchase.");
  

        const authToken = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
        const userId = getUserIdFromToken(authToken);

        // Send payment details to backend
        await axios.post("/api/save-payment", {
          user_id: userId,
          paymentIntentId: result.paymentIntent.id,  // Stripe Payment Intent ID
          amount: price,
          pricing_id: id,
          currency: "usd",
          name,
          email,
          address,
          city,
          postalCode,
          country: country.label,  // Sending country name
        });
  
        navigate('/user', { state: { defaultPage: "Bookings" } });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="stripe-page">
      <div className="payment-form">
        <div className="row h-21row m-0 p-0">
          <div className="col-md-5 p-0 overflow-hidden h-21">
            <div className="payment-img-cont">
              <img src={paymentImg} className="payment-img" alt="Payment" />
              <div className="price">${price}</div>
              <div className="back-price cursor-pointer"
              onClick = {() =>{navigate('/consult-oracle')}} 
              > <IoIosArrowBack className="mb-1 "/> Cancel Payment</div>
            </div>
          </div>
          <div className="col-md-7 set-height-sp">
            <div className="p-4 py-4">
              <h4>Fill in your credit card details</h4>
              {error && <ErrorBox message={error} show={true} onClose={() => setError(null)} />}
              {success && <ErrorBox message={success} show={true} onClose={() => setSuccess(null)} green={1} />}
              <form className="mt-5" onSubmit={handleSubmit}>
                <div className="input-field">
                  <label className="w-25 pt-2">Full Name</label>
                  <input className="w-75 form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="input-field">
                  <label className="w-25 pt-2">Email</label>
                  <input className="w-75 form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-field">
                  <label className="w-25 pt-2">Address</label>
                  <input className="w-75 form-control" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="input-field">
                  <label className="w-25 pt-2">City</label>
                  <input className="w-75 form-control" type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div className="input-field">
                  <label className="w-25 pt-2">Postal Code</label>
                  <input className="w-75 form-control" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                </div>
                <div className="input-field">
                  <label className="w-25 pt-2">Country</label>
                  <Select className="w-75" options={countries} value={country} onChange={handleCountryChange} placeholder="Select your country" />
                </div>
                <div className="border-top py-1 mt-3">
                  <label className="w-25 pt-2">Card Details</label>
                  <CardElement className="my-3" options={{
                    style: { base: { fontSize: "16px", color: "#424770" }, invalid: { color: "#9e2146" } }
                  }} />
                </div>
                <div className="d-flex justify-content-center mt-3">

                <div className="prb-2">
                  <div className="" onClick={handleSubmit} disabled={loading || !stripe}>
                    {loading ? "Processing…" : "Pay Now"}
                  </div>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePage;