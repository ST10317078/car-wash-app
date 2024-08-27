import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig"; // Import Firestore
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import emailjs from 'emailjs-com';
import "./Dashboard.css"; // Add styles for your dashboard

const Dashboard = () => {
  const [planType, setPlanType] = useState("individual"); // Default plan type
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [numCars, setNumCars] = useState(1); // Default number of cars
  const [totalPrice, setTotalPrice] = useState(200); // Default price for single wash
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    calculatePrice();
  }, [planType, numCars]); // Recalculate price when plan type or number of cars changes

  const calculatePrice = () => {
    let pricePerWash = 200;
    let price;

    if (planType === "individual") {
      // Single wash price
      price = pricePerWash;
    } else {
      // Family plan: Calculate base price for all cars
      price = numCars * pricePerWash;

      // Apply a 10% discount per additional car
      if (numCars > 1) {
        const discount = (numCars - 1) * 0.1 * pricePerWash; // 10% discount for each extra car
        price -= discount;
      }
    }

    setTotalPrice(price);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
  
    if (!bookingDate || !bookingTime || !phoneNumber) {
      setError("Please complete all required fields.");
      return;
    }
  
    try {
      const bookingsRef = collection(db, "bookings");
  
      // Check for availability of the selected time slot
      const timeSlotQuery = query(
        bookingsRef,
        where("date", "==", bookingDate),
        where("time", "==", bookingTime)
      );
      const timeSlotSnapshot = await getDocs(timeSlotQuery);
  
      if (!timeSlotSnapshot.empty) {
        setError("The selected time slot is already booked. Please choose a different time slot.");
        return;
      }
  
      // Check for maximum number of washes for the selected day
      const dayQuery = query(
        bookingsRef,
        where("date", "==", bookingDate)
      );
      const daySnapshot = await getDocs(dayQuery);
  
      if (daySnapshot.size >= 10) {
        setError("The schedule is full for the selected day. Please choose a different day.");
        return;
      }
  
      // Proceed with booking
      await addDoc(bookingsRef, {
        date: bookingDate,
        time: bookingTime,
        planType,
        numCars,
        totalPrice,
        phoneNumber
      });
  
      setError(""); // Clear error
      setSuccess(`Booking confirmed! Your total price is ${totalPrice} Rands.`);
  
      // Send booking confirmation email to admin
      await sendBookingEmail({ bookingDate, bookingTime, planType, numCars, totalPrice, phoneNumber });
  
    } catch (error) {
      console.error("Error making the booking:", error); // Log detailed error
      setError("Error making the booking. Please check your input and try again.");
    }
  };

  const sendBookingEmail = async (bookingDetails) => {
    const templateParams = {
      to_name: 'Admin',
      from_name: 'Car Wash Service',
      message: `
      A new car wash booking has been made with the following details:
      - Date: ${bookingDetails.bookingDate}
      - Time: ${bookingDetails.bookingTime}
      - Plan Type: ${bookingDetails.planType}
      - Number of Cars: ${bookingDetails.numCars}
      - Total Price: ${bookingDetails.totalPrice} Rands
      - Phone Number: ${bookingDetails.phoneNumber}
    `
    };

    try {
      await emailjs.send('service_2cze3zq', 'template_qcc09zo', templateParams, 'sV3ti73_cabpngeZv');
    } catch (error) {
      console.error("Error sending email:", error);
      setError("Error sending confirmation email. Please contact support.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <form onSubmit={handleBooking}>
        <h2>Book Your Wash</h2>
        
        <label>
          Booking Date:
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />
        </label>
        
        <label>
          Booking Time:
          <input
            type="time"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            required
          />
        </label>
        
        <div className="form-group">
          <label>
            Plan Type:
            <select
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
            >
              <option value="individual">Individual</option>
              <option value="family">Family</option>
            </select>
          </label>
        </div>

        {planType === "family" && (
          <div className="form-group">
            <label>
              Number of Cars:
              <input
                type="number"
                value={numCars}
                min="1"
                onChange={(e) => setNumCars(parseInt(e.target.value, 10))}
              />
            </label>
          </div>
        )}

        <div className="form-group">
          <label>
            Phone Number:
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Total Price: {totalPrice} Rands
          </label>
        </div>

        <button type="submit">Submit Booking</button>

        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        {success && <p className="success-message">{success}</p>} {/* Display success message */}
      </form>
    </div>
  );
};

export default Dashboard;
