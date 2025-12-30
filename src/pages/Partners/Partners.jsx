import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Partners.css";

// 1) Put your logos in: src/assets/partners/
// 2) Update these imports to match your filenames
import lenovoLogo from "../../assets/images/partners/lenovo.png";
import microsoftLogo from "../../assets/images/partners/microsoft.png";

// Example imports (replace with your actual list from Logos-1.docx exports)
import logoaws from "../../assets/images/partners/aws.png";
import logofortinet from "../../assets/images/partners/fortinet.png";
import logoruckus from "../../assets/images/partners/ruckus.png";
import logoServiceNow from "../../assets/images/partners/ServiceNow.png";
import logoNetgear from "../../assets/images/partners/Netgear.png";
import logoBarco from "../../assets/images/partners/Barco.png";
import logoBarracuda from "../../assets/images/partners/Barracuda.png";
import logoBitdefender from "../../assets/images/partners/Bitdefender.png";
import logoCisco from "../../assets/images/partners/Cisco.png";
import logoextremenetworks from "../../assets/images/partners/extremenetworks.png";
import logoOwlLabs from "../../assets/images/partners/OwlLabs.jpg";
import logoBroadcom from "../../assets/images/partners/Broadcom.jpg";
import logoCloudflare from "../../assets/images/partners/Cloudflare.png";
import logoconnectwise from "../../assets/images/partners/connectwise.png";
import logoEkahaubyOokla from "../../assets/images/partners/Ekahau-by-Ookla.jpg";
import logoHewlettPackardEnterprise from "../../assets/images/partners/HewlettPackardEnterprise.png";
import logoHPEJuniperNetworking from "../../assets/images/partners/HPEJuniperNetworking.png";
import logoNutanix from "../../assets/images/partners/Nutanix.png";


const Partners = () => {
  const navigate = useNavigate();

  const topPartners = [
    { name: "Lenovo", logo: lenovoLogo },
    { name: "Microsoft", logo: microsoftLogo },
  ];

  const partners = [
    { name: "AmazonWebServices", logo: logoaws },
    { name: "Fortinet", logo: logofortinet },
    { name: "Ruckus", logo: logoruckus },
    { name: "ServiceNow", logo: logoServiceNow },
    { name: "Netgear", logo: logoNetgear },
    { name: "Barco", logo: logoBarco },
    { name: "Barracuda", logo: logoBarracuda },
    { name: "Bitdefender", logo: logoBitdefender },
    { name: "Cisco", logo: logoCisco },
    { name: "extreme networks", logo: logoextremenetworks },
    { name: "Owl Labs", logo: logoOwlLabs },
    { name: "Broadcom", logo: logoBroadcom },
    { name: "Cloudflare", logo: logoCloudflare },
    { name: "connectwise", logo: logoconnectwise },
    { name: "Ekahau by Ookla", logo: logoEkahaubyOokla },
    { name: "Hewlett Packard Enterprise", logo: logoHewlettPackardEnterprise },
    { name: "HPE Juniper Networking", logo: logoHPEJuniperNetworking },
    { name: "Nutanix", logo: logoNutanix},
    
  ];

  return (
    <div className="partnersPage">
     
      {/* SECTION 3: Dark split hero */}
      <section className="partnersSplit">
        <div className="partnersSplit__left">
          <p className="partnersKicker">OUR PARTNERS</p>
          <h2 className="partnersSplit__title">
            Digital Transformation
            <br />
            Begins with the Right
            <br />
            Partnerships
          </h2>
          <p className="partnersSplit__text">
            We partner with proven technology leaders to deliver advanced solutions that support modern IT
            environments across networking, cloud, and cybersecurity.
          </p>
        </div>

        <div className="partnersSplit__right" />
      </section>
      {/* SECTION 2: Our Partners (light) */}
      <section className="partnersLight">
        <div className="partnersContainer">
          <h2 className="partnersH2">Our Partners</h2>

          <div className="partnersTopGrid">
            {topPartners.map((p) => (
              <article key={p.name} className="partnerCard">
                <div className="partnerCard__logoWrap">
                  <img className="partnerCard__logo" src={p.logo} alt={p.name} />
                </div>

                <div className="partnerCard__meta">
                  <p className="partnerCard__name">{p.name}</p>
                  <span className="partnerCard__arrow">▶</span>
                  <span className="partnerCard__underline" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 4: Logo grid (light) */}
      <section className="partnersGridSection">
        <div className="partnersContainer">
          <div className="partnersRule" />
          <div className="partnersGrid">
            {partners.map((p) => (
              <article key={p.name} className="logoTile">
                <div className="logoTile__box">
                  <img className="logoTile__img" src={p.logo} alt={p.name} />
                </div>
                <div className="logoTile__footer">
                  <span className="logoTile__name">{p.name.toUpperCase()}</span>
                  <span className="logoTile__cta">
                    <span className="logoTile__arrow">▶</span>
                    <span className="logoTile__line" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* SECTION 1: LET'S MEET banner */}
      <section className="partnersMeet">
        <div className="partnersMeet__overlay" />
        <div className="partnersMeet__content">
          <h1 className="partnersMeet__title">Let’s Meet</h1>
          <p className="partnersMeet__text">
            For more information about working with ALG Data Guard, give us a call or send us an email.
            We’re here to help in any way.
          </p>
          <button className="partnersBtn partnersBtn--orange" onClick={() => navigate("/contact")}>
            ENGAGE WITH AN EXPERT
          </button>
        </div>
      </section>
    </div>
  );
};

export default Partners;
