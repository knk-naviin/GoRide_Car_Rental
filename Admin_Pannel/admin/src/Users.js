import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from 'axios'

function Users() {
    const [users,setUsers] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3000')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    },[])

const handleDelete =(id) =>{
    axios.delete('http://localhost:3000/deleteUser/'+id)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/createUser" className='btn btn-success'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>CarName</th>
                            <th>Brand</th>
                            <th>Rating</th>
                            <th>Model</th>
                            <th>Price</th>
                            <th>Speed</th>
                            <th>Gps</th>
                            <th>SeatType</th>
                            <th>CarType</th>
                            <th>Descprition</th>
                            <th>Image</th>

</tr>
                        
                    
                    </thead>
                    <body>
                        {
                            users.map((user)=>{
                                return  <tr>
                                     <td>{user.name}</td>
                                     <td>{user.brand}</td>
                                    <td>{user.rating}</td>                                     
                                     <td>{user.model}</td>
                                     <td>{user.price}</td>
                                     <td>{user.speed}</td>
                                     <td>{user.gps}</td>
                                     <td>{user.seatType}</td>
                                    <td>{user.carType}</td>
                                    <td>{user.desc}</td>
                                    <td>{user.image}</td>

                                     <td>
                                         <Link to={`/update/${user._id}`} className="btn btn-success">Update</Link>
                                     <button className="btn btn-danger" onClick={(e)=>handleDelete(user._id)}>Delete</button>
                                     </td>
                                 </tr>
                             })
                        }
                    </body>
                </table>
                
            </div>     
        </div>
    )
}

export default Users;