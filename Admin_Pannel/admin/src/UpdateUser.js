import React, { useState ,useEffect} from "react";
import{useParams,useNavigate} from "react-router-dom"
import axios from 'axios'

function UpdateUsers() {

    const {id} = useParams()
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
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:3000/getUser/'+id)
        .then(result => {console.log(result)
            setName(result.data.name)
            setBrand(result.data.brand)
            setRating(result.data.rating)
            setModel(result.data.model)
            setPrice(result.data.price)
            setSpeed(result.data.speed)
            setGps(result.data.gps)
            setSeatType(result.data.seatType)
            setCarType(result.data.carType)
            setDesc(result.data.desc)
        })
        .catch(err => console.log(err))
    },[])

    const Update=(e) =>{
        e.preventDefault();
        axios.put('http://localhost:3000/update/'+id,{name,brand,rating,model,price,speed,gps,seatType,carType,desc})
        .then(result => {console.log(result)
        navigate('/')
        })
        .catch(err=>console.log(err))
    }


    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Update}>
        <h2>Update User</h2>
        <div className='mb-2'>
        <label htmlFor="">Name</label>
        <input type="text" placeholder='Enter Name' className='form-control' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
       <div className='mb-2'>
        <label htmlFor="">Brand</label>
        <input type="text" placeholder='Enter brand' className='form-control' value={brand} onChange={(e) => setBrand(e.target.value)}/>
        </div>
        <div className='mb-2'>
        <label htmlFor="">Rating</label>
        <input type="text" placeholder='Enter rating' className='form-control' value={rating} onChange={(e) => setRating(e.target.value)}/>
        </div>
        <div className='mb-2'>
        <label htmlFor="">Model</label>
        <input type="text" placeholder='Enter Model' className='form-control' value={model} onChange={(e) => setModel(e.target.value)}/>
        </div>
        <div className='mb-2'>
        <label htmlFor="">Price</label>
        <input type="text" placeholder='Enter Price' className='form-control' value={price} onChange={(e) => setPrice(e.target.value)}/>
        </div>
        <div className='mb-2'>
        <label htmlFor="">Speed</label>
        <input type="text" placeholder='Enter Speed' className='form-control' value={speed} onChange={(e) => setSpeed(e.target.value)}/>
        </div>
        <div className='mb-2'>
        <label htmlFor="">Gbs</label>
        <input type="text" placeholder='Enter Gps' className='form-control' value={gps} onChange={(e) => setGps(e.target.value)}/>
        </div>
        <div className='mb-2'>
        <label htmlFor="">Seat Type</label>
        <input type="text" placeholder='Enter SeatType' className='form-control' value={seatType} onChange={(e) => setSeatType(e.target.value)}/>
        </div>
        <div className='mb-2'>
        <label htmlFor="">Car Type</label>
        <input type="text" placeholder='Enter car Type' className='form-control' value={carType} onChange={(e) => setCarType(e.target.value)}/>
        </div>
         <div className='mb-2'>
        <label htmlFor="">Description</label>
        <input type="text" placeholder='Enter Descprition' className='form-control' value={desc} onChange={(e) => setDesc(e.target.value)}/>
        </div>
        <button className='btn btn-success'>Update</button>
        </form>
        </div>
        </div>
    )
}

export default UpdateUsers;