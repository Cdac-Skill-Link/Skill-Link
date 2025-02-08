import React from "react";

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
         
        </div>
        <div className="row">
  {props.data
    ? props.data.map((d, i) => (
      <a href="ServiceForm" key={`${d.name}-${i}`} style={{ textDecoration: "none" }}>
        <div 
          className="col-md-4 service-box"
        >
          <div className="service-desc">
            {/* <img src={d.img} alt={d.name} /> */}
            <h3>{d.name}</h3>
            <p>{d.text}</p>
          </div>
        </div>
      </a>
    ))
    : "loading"}
</div>

<style>
  {`
    .service-box {
      transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
      border-radius: 10px;
      padding: 15px;
    }

    .service-box:hover {
      // background-color: #6084FD;
      transform: scale(1.02);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    // .service-desc img {
    //   width: 100%;
    //   border-radius: 10px;
    // }

    .service-desc h3, .service-desc p {
      text-align: center;
      color: #333;
    }
  `}
</style>
      </div>
    </div>
  );
};
