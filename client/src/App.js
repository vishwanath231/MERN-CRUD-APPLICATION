import React,{ useState, useEffect } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css';


const App = () => {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    
    const nameHandler = (e) => {
        setName(e.target.value);
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);

    }

    const submitHandler = (e) => {
        e.preventDefault();

        Axios.post('/api/user/new', {
            name: name,
            email: email
        })
        .then(() => {
            setData([...data,{
                name: name,
                email: email
            }])
        })

        e.target.reset();
    }


    useEffect(() => {
        Axios.get('/api/user')
        .then((response) => {
            setData(response.data.data);
        })
    }, [])


    const updateUser = (id, name, email) => {
        setShow(true);
        setUserId(id);
        setUserName(name);
        setUserEmail(email);
    }


    const deleteUser = (id) => {
        
        Axios.delete(`/api/user/delete/${id}`)
        .then(() => {
            setData(data.filter((val) => {
                return val._id !== id;
            }));
        });
    }


    const returnRegister = () => {
        setShow(false);
    }

    const updateHandler = (e) => {

        e.preventDefault();
        
        Axios.patch('/api/user/update',{
            "_id":userId,
            "name":name,
            "email":email
        })
        .then(() => {
            setData(data.map((val) => {
                return val._id === userId ? {
                    "_id":val.id,
                    "name":name,
                    "email":email                    
                } : val

            }))
            setShow(false);
        })

        e.target.reset();
    }


    return (
        <>
            <div className="container">
                <header>
                    <p>MERN 👉🏻 CRUD</p>
                </header>
                <div className="grid">
                    {
                        show ? (
                            <div className="from_container UPDATE">
                                <div className="title">Update</div>
                                <form className="form" onSubmit={updateHandler}>
                                    <input type="hidden" value={userId} />
                                    <div className="form__div">
                                        <label>Name</label>
                                        <input type="text" name="name" placeholder="Jhon Doe" onChange={nameHandler} />
                                    </div>
                                    <div className="form__div">
                                        <label>Email</label>
                                        <input type="email" name="email" placeholder="example@support.com" onChange={emailHandler} />
                                    </div>
                                    <button type="submit">Update</button>
                                    <div className="retrunRegister" onClick={returnRegister}>New Registration</div>
                                </form>
                                <p>Name : {userName}</p>
                                <p>Email : {userEmail}</p>
                            </div>
                            
                        ) : (
                            <div className="from_container REGISTER">
                                <div className="title">Register</div>
                                <form onSubmit={submitHandler} className="form">
                                    <div className="form__div">
                                        <label>Name</label>
                                        <input type="text" name="name" placeholder="Jhon Doe" onChange={nameHandler} required/>
                                    </div>
                                    <div className="form__div">
                                        <label>Email</label>
                                        <input type="email" name="email" placeholder="example@support.com" onChange={emailHandler} required/>
                                    </div>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        )
                    }


                    <div className="record__container">
                        <div className="title">Record</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>SNO</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item,index) => {
                                        return (
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td onClick={() => updateUser(item._id, item.name, item.email)}><FontAwesomeIcon icon={faPencilAlt} className="updateIcon"  /></td>
                                                <td onClick={()=> deleteUser(item._id)} ><FontAwesomeIcon icon={faTrash} className="deleteIcon" /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>


            

            
        </>
    )
}

export default App;
