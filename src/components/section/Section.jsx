import React from "react";
import styles from "./section.module.css";
import Image from "next/image";

function Section() {
  return (
    <div className={styles.font}>
      <div className={styles.section}>
        <div className={styles.title}>
          <h1>
            Your virtual event manager to help organize any type of event or
            activity
          </h1>
          <h5>
            Our appointment management software is fit for professionals,
            service-based local businesses, and mid-large enterprises
          </h5>
        </div>
        <div className={styles.categories}>
          <div className={styles.category}>
            <Image
              className={styles.image}
              src="/health.png"
              alt=""
              height={80}
              width={80}
            />
            <h4>Health & Wellness</h4>
            <p>Wellness, Spa, Massage Therapist</p>
          </div>
          <div className={styles.category}>
            <Image
              className={styles.image}
              src="/education.png"
              alt=""
              height={80}
              width={80}
            />
            <h4>Educational Events</h4>
            <p>Colleges, Universities, Schools & Tutoring</p>
          </div>
          <div className={styles.category}>
            <Image
              className={styles.image}
              src="/webinar.png"
              alt=""
              height={80}
              width={80}
            />
            <h4>Corporate Events & Webinars</h4>
            <p>Doctors, Dentists, Chiropractors, Opticians</p>
          </div>
          <div className={styles.category}>
            <Image
              className={styles.image}
              src="/fitness.png"
              alt=""
              height={80}
              width={80}
            />
            <h4>Fitness and Recreation</h4>
            <p>Health Clubs & Gyms, Personal Trainers, Yoga</p>
          </div>
          <div className={styles.category}>
            <Image
              className={styles.image}
              src="/charity.png"
              alt=""
              height={80}
              width={80}
            />
            <h4>Nonprofits & Charities</h4>
            <p>Hair Salons, Barbershops, Nail Salon, Tattoo Studios</p>
          </div>
          <div className={styles.category}>
            <Image
              className={styles.image}
              src="/prof.png"
              alt=""
              height={80}
              width={80}
            />
            <h4>Professional Services</h4>
            <p>Photography Studios, Business Coaching, Driving Schools</p>
          </div>
          <div className={styles.category}>
            <Image
              className={styles.image}
              src="/trip.png"
              alt=""
              height={80}
              width={80}
            />
            <h4>Trips & Group Tours</h4>
            <p>Government Offices, Volunteer Scheduling</p>
          </div>
          <div className={styles.category}>
            <Image
              className={styles.image}
              src="/services.png"
              alt=""
              height={80}
              width={80}
            />
            <h4>Other Services</h4>
            <p>
              Retail Stores, Meeting Scheduling, City Tours, Interview
              Scheduling
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;
