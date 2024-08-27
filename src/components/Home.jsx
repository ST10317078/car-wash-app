// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Home.css"; // We'll add styles here
import bannerImage from "../assets/banner.webp"; // Adjust the path based on your folder structure

const Home = () => {
  const reviews = [
    {
      name: "Margaret Bokaba",
      rating: 5,
      comment: "Excellent service! Highly recommend!",
    },
    {
      name: "Tsepho Dikgang",
      rating: 4,
      comment: "Good experience overall, will use again.",
    },
    // Add more reviews here
  ];

  return (
    <div className="home-container">
      {/* Banner Image */}
      <section className="banner-section">
        <img src={bannerImage} alt="Banner" className="banner-image" />
        <div className="banner-text">
          <h1>Your Car Deserves the Best</h1>
          <p>Experience premium car care with our reliable and eco-friendly service.</p>
          <Link to="/Signup" className="cta-button">Book Your Wash Now</Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <div className="about-content">
          <div className="about-item">
            <h3>Eco-Friendly Products</h3>
            <p>We use top-quality, biodegradable cleaning products that are safe for your vehicle and the environment.</p>
          </div>
          <div className="about-item">
            <h3>Easy to Schedule</h3>
            <p>Book online, choose your preferred time slot, and we’ll come to you or you come to us. It’s that simple.</p>
          </div>
          <div className="about-item">
            <h3>Professional Service</h3>
            <p>Our trained technicians ensure that every car is treated with utmost care and attention.</p>
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="services-section">
        <h2>Our Services</h2>
        <ul>
          <li>Exterior Wash: Shine and protect your car’s exterior.</li>
          <li>Interior Cleaning: Deep cleaning and detailing.</li>
          <li>Full Package: Complete wash and detailing.</li>
          <li>Monthly Subscription: Unlimited washes for one flat fee.</li>
        </ul>
      </section>

      {/* Special Offers */}
      <section className="special-offers">
        <h2>Special Offers</h2>
        <div className="offer-cards">
          <div className="offer-card">
            <h3>First Wash Free!</h3>
            <p>Sign up today and get your first wash on us.</p>
          </div>
          <div className="offer-card">
            <h3>Family Plan</h3>
            <p>Save on multiple cars with our family subscription plan.</p>
          </div>
          <div className="offer-card">
            <h3>Referral Discount</h3>
            <p>Refer a friend and both receive 10% off your next wash.</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="reviews-section">
        <h2>Customer Reviews</h2>
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <h3>{review.name}</h3>
              <p className="rating">Rating: {review.rating} / 5</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>Address: 123 Car Wash Lane, City, Province</p>
        <p>Phone: (123) 456-7890</p>
        <p>Email: info@carwashservice.com</p>
        <Link to="/Signup" className="cta-button">Contact Us</Link>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Your Car Wash Business. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
