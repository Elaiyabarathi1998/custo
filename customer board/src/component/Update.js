import React from 'react'
import '../App.css'
import axios from 'axios'
import './login.css'
import {API_URL} from '../Api/URL'
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import dayjs from 'dayjs';

function Update() {
    const [yourName,setYourName] = useState('');
    const [address,setAddress] = useState('');
    const [birthday,setBirthday] = useState('');
    const [mail,setMail] = useState('');
    const [id,setId] = useState('');
    const [yourNameError, setYourNameError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [birthdayError, setBirthdayError] = useState(false);
    const [mailError, setMailError] = useState(false);
    const navigate = useNavigate(); 
    const currentDate = dayjs().format('YYYY-MM-DD');

    const validateEmail = (email) => {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      return emailRegex.test(email);
  };


  const postData = async (e) => {
    e.preventDefault();
  
    if (
      yourName.length >= 6 &&
      yourName.length <= 18 &&
      address !== "" &&
      birthday !== "" &&
      mail !== "" &&
      validateEmail(mail)
    ) {
      try {
        await axios.put(API_URL+id, {
          yourName,
          address,
          birthday,
          mail,
        });
        navigate("/read");
        console.log("Form data submitted successfully!");
      } catch (error) {
        console.log(error);
      }
    } else {
      if (yourName.length < 6 || yourName.length > 18) {
        setYourNameError(true);
      }
      if (address === "") {
        setAddressError(true);
      }
      if (birthday === "") {
        setBirthdayError(true);
      }
      if (mail === "" || !validateEmail(mail)) {
        setMailError(true);
      }
    }
  };



  useEffect(()=>{
    setId(localStorage.getItem('id'))
    setYourName(localStorage.getItem('yourName'))
    setAddress(localStorage.getItem('address'))
    setBirthday(localStorage.getItem('birthday'))
    setMail(localStorage.getItem('mail'))
  },[])
  return (
    <div>
        <section className="register-block">
            <div className="container">
                <div className="row ">
                    <div className="col register-sec">
                        <h2 className="text-center">Re-Registration Dashboard</h2>
                        <form className="register-form" action="" >
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    onChange={event => setYourName
                                        (event.target.value)} type="text"
                                    placeholder='Enter your name'
                                    className="form-control" name={yourName} id="" />
                                {yourNameError && yourName === '' && <span className="text-danger" >
                                    *Name is required.
                                </span>}
                            </div>

                            <div className="form-group">
                                <label >Address</label>
                                <input onChange={event => setAddress
                                    (event.target.value)} type="text"
                                    placeholder='Enter your address'
                                    className="form-control" name={address} id="" />
                                {addressError && address === '' && <span className="text-danger" >
                                    *Address is required.
                                </span>}
                            </div>


                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input
                                    max={currentDate}
                                    onChange={event => setBirthday(dayjs(event.target.value).format('DD-MM-YYYY'))}
                                    type="date"
                                    placeholder="Enter Date"
                                    className="form-control"
                                    name={setBirthday}
                                    id=""
                                />
                                {birthdayError && birthday === '' && <span className="text-danger" >
                                    *Date of Birth is required.
                                </span>}
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    onChange={event => setMail(event.target.value)}
                                    type="email"
                                    placeholder="Enter your mail ID"
                                    className="form-control"
                                    name={mail}
                                    id=""
                                    required
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                />
                                {mailError && mail === '' && (
                                    <span className="text-danger">
                                        *Email is required.
                                    </span>
                                )}

                                {!validateEmail(mail) && mail !== '' && (
                                    <span className="text-danger">
                                        *Please enter a valid email address.
                                    </span>
                                )}


                            </div>


                            <div className="form-group">
                                <Button className="btn btn-login float-right"   inverted color='blue' onClick={postData}> Update </Button>

                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </section>

    </div>
)
}

export default Update




// import React, { useState, useEffect } from "react";
// import "../App.css";
// import axios from "axios";
// import "./login.css";
// import { API_URL } from "../Api/URL";
// import { useNavigate } from "react-router-dom";
// import { Button, Modal } from "semantic-ui-react";
// import dayjs from "dayjs";

// function Update() {
//   const [yourName, setYourName] = useState("");
//   const [address, setAddress] = useState("");
//   const [birthday, setBirthday] = useState("");
//   const [mail, setMail] = useState("");
//   const [id, setId] = useState("");
//   const [yourNameError, setYourNameError] = useState(false);
//   const [addressError, setAddressError] = useState(false);
//   const [birthdayError, setBirthdayError] = useState(false);
//   const [mailError, setMailError] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false); // Added modal state
//   const navigate = useNavigate();
//   const currentDate = dayjs().format("YYYY-MM-DD");

//   const validateEmail = (email) => {
//     const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
//     return emailRegex.test(email);
//   };

//   const openModal = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const postData = async (e) => {
//     e.preventDefault();

//     if (
//       yourName.length >= 6 &&
//       yourName.length <= 18 &&
//       address !== "" &&
//       birthday !== "" &&
//       mail !== "" &&
//       validateEmail(mail)
//     ) {
//       try {
//         await axios.put(API_URL + id, {
//           yourName,
//           address,
//           birthday,
//           mail,
//         });
//         navigate("/read");
//         console.log("Form data submitted successfully!");
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       if (yourName.length < 6 || yourName.length > 18) {
//         setYourNameError(true);
//       }
//       if (address === "") {
//         setAddressError(true);
//       }
//       if (birthday === "") {
//         setBirthdayError(true);
//       }
//       if (mail === "" || !validateEmail(mail)) {
//         setMailError(true);
//       }
//     }
//   };

//   useEffect(() => {
//     setId(localStorage.getItem("id"));
//     setYourName(localStorage.getItem("yourName"));
//     setAddress(localStorage.getItem("address"));
//     setBirthday(localStorage.getItem("birthday"));
//     setMail(localStorage.getItem("mail"));
//   }, []);

//   return (
//     <div>
//       <section className="register-block">
//         <div className="container">
//           <div className="row ">
//             <div className="col register-sec">
//               <h2 className="text-center">Re-Registration Dashboard</h2>
//               <form className="register-form" action="">
//                 <div className="form-group">
//                   <label>Name</label>
//                   <input
//                     onChange={(event) => setYourName(event.target.value)}
//                     type="text"
//                     placeholder="Enter your name"
//                     className="form-control"
//                     name={yourName}
//                     id=""
//                   />
//                   {yourNameError && yourName === "" && (
//                     <span className="text-danger">*Name is required.</span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label>Address</label>
//                   <input
//                     onChange={(event) => setAddress(event.target.value)}
//                     type="text"
//                     placeholder="Enter your address"
//                     className="form-control"
//                     name={address}
//                     id=""
//                   />
//                   {addressError && address === "" && (
//                     <span className="text-danger">*Address is required.</span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label>Date of Birth</label>
//                   <input
//                     max={currentDate}
//                     onChange={(event) =>
//                       setBirthday(
//                         dayjs(event.target.value).format("DD-MM-YYYY")
//                       )
//                     }
//                     type="date"
//                     placeholder="Enter Date"
//                     className="form-control"
//                     name={setBirthday}
//                     id=""
//                   />
//                   {birthdayError && birthday === "" && (
//                     <span className="text-danger">
//                       *Date of Birth is required.
//                     </span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     onChange={(event) => setMail(event.target.value)}
//                     type="email"
//                     placeholder="Enter your mail ID"
//                     className="form-control"
//                     name={mail}
//                     id=""
//                     required
//                     pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
//                   />
//                   {mailError && mail === "" && (
//                     <span className="text-danger">*Email is required.</span>
//                   )}

//                   {!validateEmail(mail) && mail !== "" && (
//                     <span className="text-danger">
//                       *Please enter a valid email address.
//                     </span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <Button
//                     className="btn btn-login float-right"
//                     inverted
//                     color="blue"
//                     onClick={openModal} // Open the modal on button click
//                   >
//                     Update
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Modal Component */}
//       <Modal open={modalOpen} onClose={closeModal}>
//         <Modal.Header>Update Options</Modal.Header>
//         <Modal.Content>
          
//       <section className="register-block">
//         <div className="container">
//           <div className="row ">
//             <div className="col register-sec">
//               <h2 className="text-center">Re-Registration Dashboard</h2>
//               <form className="register-form" action="">
//                 <div className="form-group">
//                   <label>Name</label>
//                   <input
//                     onChange={(event) => setYourName(event.target.value)}
//                     type="text"
//                     placeholder="Enter your name"
//                     className="form-control"
//                     name={yourName}
//                     id=""
//                   />
//                   {yourNameError && yourName === "" && (
//                     <span className="text-danger">*Name is required.</span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label>Address</label>
//                   <input
//                     onChange={(event) => setAddress(event.target.value)}
//                     type="text"
//                     placeholder="Enter your address"
//                     className="form-control"
//                     name={address}
//                     id=""
//                   />
//                   {addressError && address === "" && (
//                     <span className="text-danger">*Address is required.</span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label>Date of Birth</label>
//                   <input
//                     max={currentDate}
//                     onChange={(event) =>
//                       setBirthday(
//                         dayjs(event.target.value).format("DD-MM-YYYY")
//                       )
//                     }
//                     type="date"
//                     placeholder="Enter Date"
//                     className="form-control"
//                     name={setBirthday}
//                     id=""
//                   />
//                   {birthdayError && birthday === "" && (
//                     <span className="text-danger">
//                       *Date of Birth is required.
//                     </span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     onChange={(event) => setMail(event.target.value)}
//                     type="email"
//                     placeholder="Enter your mail ID"
//                     className="form-control"
//                     name={mail}
//                     id=""
//                     required
//                     pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
//                   />
//                   {mailError && mail === "" && (
//                     <span className="text-danger">*Email is required.</span>
//                   )}

//                   {!validateEmail(mail) && mail !== "" && (
//                     <span className="text-danger">
//                       *Please enter a valid email address.
//                     </span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <Button
//                     className="btn btn-login float-right"
//                     inverted
//                     color="blue"
//                     onClick={openModal} // Open the modal on button click
//                   >
//                     Update
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//         </Modal.Content>
//         <Modal.Actions>
//           <Button onClick={postData}>Save</Button>
//           <Button onClick={closeModal}>Cancel</Button>
//         </Modal.Actions>
//       </Modal>
//     </div>
//   );
// }

// export default Update;
