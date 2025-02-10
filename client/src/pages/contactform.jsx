import React from "react";
import axios from "axios";
import { useState } from "react";

const Contact = () => {
  const [receiver_email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function sendEmail(e) {
    e.preventDefault();
    if (receiver_email === "" || subject === "" || message === "") {
      return alert("Please fill in all fields");
    } else {
      try {
        let result = await axios.post("maytakahashi-github-io-server-4di2urfpq.vercel.app", { // Use the correct deployed server URL
          receiver_email: receiver_email,
          subject: subject,
          message: message,
        });
        console.log(result.data);
        return alert("Email sent");
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        return alert("An error occurred");
      }
    }
  }

  return (
    <main>
      <section className="contact">
        <h1>Contact Us</h1>
        <h2>Send us an email, *Please Include Your Email Address In The Message!*</h2>
        <div className="contact-form">
          <form className="form-container" onSubmit={sendEmail}>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
              placeholder="Email"
            ></input>
            <input
              type="text"
              id="subject"
              onChange={(e) => setSubject(e.target.value)}
              name="subject"
              required
              placeholder="Subject"
            ></input>
            <textarea
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              required
              placeholder="Message"
            ></textarea>
            <button className="submit-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;