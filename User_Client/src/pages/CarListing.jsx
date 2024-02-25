
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const CarListing = () => {
     const [users,setUsers] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3000')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    }, [])
  
  return (
    <section>
      <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
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
           <></>
          </Row>
        </Container>
      </section>
    </Helmet>
    </section>,
    <section>
      {
        users.map((user) => { 
          return <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image=""
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
          
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {user.name}
                  </Typography>
                </CardContent>
                <CardActions>
              <Button size="small">{ user.price}</Button>
                </CardActions>
              </Card>
        })
      }
      
    </section>
    
  );
};

export default CarListing;
