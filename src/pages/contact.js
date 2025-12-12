
import React from 'react';

function Contact() {
    return (
        <div className="static-page-container">
            <h2>Contact Us</h2>
            <p>We'd love to hear from you! Reach out to us via:</p>
            <div className="contact-details">
                <p>Email: support@carrentalsystem.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Dream Car Lane, Luxury City, CA 90210</p>
            </div>
            {/* You can add a Contact Form here that POSTs to a Spring Boot endpoint */}
        </div>
    );
}

export default Contact;