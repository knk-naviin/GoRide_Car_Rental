import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import Tesla from "../assets/all-images/cars-img/tesla.jpg";
import carData from "../assets/data/carData";

import "./../styles/carList.css";

const CarListing = () => {
  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col className="d-flex" lg="10">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>
            {carData.map((item) => (
              <Col>
                <div class="card ">
                  <img src={Tesla} alt="Denim Jeans" />
                  <h1>Tailored Jeans</h1>
                  <p class="price">$19.99</p>
                  <p>Some text about the jeans..</p>
                  <p>
                    <button className="book-btn">Book Now</button>
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
