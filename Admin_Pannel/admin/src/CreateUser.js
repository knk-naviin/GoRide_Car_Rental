import React, { useState } from "react";
import axios from 'axios'

function CreateUsers() {
    const [name,setName] = useState()
    const [brand,setBrand] = useState()
    const [rating, setRating] = useState()
    const [model, setModel] = useState()
    const [price, setPrice] = useState()
    const [speed, setSpeed] = useState()
    const [gps, setGps] = useState()
    const [seatType, setSeatType] = useState()
    const [carType, setCarType] = useState()
    const [desc, setDesc] = useState()
    const [image, setImage] = useState()

    function convertToBase64(e) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
          setImage(reader.result);
      };
      reader.onerror = error => {
          console.log("Error: ", error);
      }; 
  }

  const Submit = (e) => {
      e.preventDefault();
      const imageData = image ? image.split(',')[1] : null;
      axios.post("http://localhost:3000/createUser", {

          name,
          brand,
          rating,
          model,
          price,
          speed,
          gps,
          seatType,
          carType,
          desc,
          image: imageData // Extracting base64 data without the data URL prefix
      })
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Submit}>
        <h2>Add User</h2>
        <div className='mb-2'>
        <label htmlFor="">Car Name</label>
        <input type="text" placeholder='Enter Name' className='form-control' onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='mb-2'>
        <label htmlFor="">Brand</label>
        <input type="text" placeholder='Enter brand' className='form-control' onChange={(e) => setBrand(e.target.value)}/>
        </div>
        <div className='mb-2'>
        <label htmlFor="">Rating</label>
        <input type="text" placeholder='Enter rating' className='form-control' onChange={(e) => setRating(e.target.value)}/>
        </div>
        <div className='mb-2'>
        <label htmlFor="">Model</label>
        <input type="text" placeholder='Enter Model' className='form-control' onChange={(e) => setModel(e.target.value)}/>
        </div>
        <div className='mb-2'>
        <label htmlFor="">Price</label>
        <input type="text" placeholder='Enter Price' className='form-control' onChange={(e) => setPrice(e.target.value)}/>
        </div>
        <div className='mb-2'>
        <label htmlFor="">Speed</label>
        <input type="text" placeholder='Enter Speed' className='form-control' onChange={(e) => setSpeed(e.target.value)}/>
        </div>
        <div className='mb-2'>
        <label htmlFor="">Gbs</label>
        <input type="text" placeholder='Enter Gps' className='form-control' onChange={(e) => setGps(e.target.value)}/>
        </div>
        <div className='mb-2'>
        <label htmlFor="">Seat Type</label>
        <input type="text" placeholder='Enter SeatType' className='form-control' onChange={(e) => setSeatType(e.target.value)}/>
        </div>
        <div className='mb-2'>
        <label htmlFor="">Car Type</label>
        <input type="text" placeholder='Enter car Type' className='form-control' onChange={(e) => setCarType(e.target.value)}/>
        </div>
         <div className='mb-2'>
        <label htmlFor="">Description</label>
        <input type="text" placeholder='Enter Descprition' className='form-control' onChange={(e) => setDesc(e.target.value)}/>
        </div>
        <div className='mb-2'>
                        <label htmlFor="">Image</label>
                        <input accept="image" type="file" onChange={convertToBase64} className='form-control' />
                        {image && <img width={100} height={100} src={image} alt="Selected Image" />}
                    </div>
        <button className='btn btn-success'>Submit</button>
        </form>
        </div>
        </div>
    )
}

export default CreateUsers;


