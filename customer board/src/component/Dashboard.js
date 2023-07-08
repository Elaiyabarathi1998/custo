import React, { useState,useEffect, useRef } from "react";
import "../App.css";
import axios from "axios";
import "./login.css";
import { API_URL } from "../Api/URL";
import { useNavigate } from "react-router-dom";
import { Button, Dimmer, Loader } from "semantic-ui-react";
import dayjs from "dayjs";

function Dashboard() {
    const [yourName, setYourName] = useState("");
    const [address, setAddress] = useState("");
    const [birthday, setBirthday] = useState("");
    const [mail, setMail] = useState("");
    const [yourNameError, setYourNameError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [birthdayError, setBirthdayError] = useState(false);
    const [mailError, setMailError] = useState(false);
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate();
    const currentDate = dayjs().format("YYYY-MM-DD");
    const yourNameRef = useRef(null);

    const validateEmail = (email) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        return emailRegex.test(email);
    };

    const postData = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        if (
            yourName.length >= 6 &&
            yourName.length <= 18 &&
            address !== "" &&
            birthday !== "" &&
            mail !== "" &&
            validateEmail(mail)
        ) {
            try {
                await axios.post(API_URL, {
                    yourName,
                    address,
                    birthday,
                    mail,
                });
                setTimeout(() => {
                    setLoading(false); // Stop loading after delay
                    navigate("/read");
                    console.log("Form data submitted successfully!");
                }, 3000); // Transition delay of 3 seconds (3000 milliseconds)
            } catch (error) {
                console.log(error);
                setLoading(false); // Stop loading in case of error
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
            setLoading(false); // Stop loading if form validation fails
        }
    };

    useEffect(() => {
        yourNameRef.current.focus(); // Set focus on the name input field when the component mounts
    }, []);

    const handleNameChange = (event) => {
        const value = event.target.value;
        const onlyAlphabets = /^[a-zA-Z\s]*$/; // Regular expression to match only alphabets and spaces
        if (value.match(onlyAlphabets) || value === "") {
            setYourName(value);
        }
    };
    return (
        <div>
            <section className="register-block">
                <div className="container">
                    <div className="row ">
                        <div className="col register-sec">
                            <h2 className="text-center">Registration Dashboard</h2>
                            <form className="register-form" action="">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        ref={yourNameRef} // Set the ref on the name input field
                                        onChange={handleNameChange}
                                        type="text"
                                        placeholder="Enter your name"
                                        className="form-control"
                                        value={yourName}
                                        name={yourName}
                                        id=""
                                    />
                                    {yourNameError && yourName === "" && (
                                        <span className="text-danger">
                                            *Name is required.
                                        </span>
                                    )}
                                    {yourName.length < 6 && (
                                        <span className="text-danger">
                                            *Name must be at least 6 characters long.
                                        </span>
                                    )}
                                    {yourName.length > 16 && (
                                        <span className="text-danger">
                                            *Name can't exceed 16 characters.
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        onChange={(event) => setAddress(event.target.value)}
                                        type="text"
                                        placeholder="Enter your address"
                                        className="form-control"
                                        value={address}
                                        id=""
                                    />
                                    {addressError && address === "" && (
                                        <span className="text-danger">
                                            *Address is required.
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Date of Birth</label>
                                    <input
                                        max={currentDate}
                                        onChange={(event) =>
                                            setBirthday(dayjs(event.target.value).format("DD-MM-YYYY"))
                                        }
                                        type="date"
                                        placeholder="Enter Date"
                                        className="form-control"
                                        name={setBirthday}
                                        id=""
                                    />
                                    {birthdayError && birthday === "" && (
                                        <span className="text-danger">
                                            *Date of Birth is required.
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        onChange={(event) => setMail(event.target.value)}
                                        type="email"
                                        placeholder="Enter your mail ID"
                                        className="form-control"
                                        name={mail}
                                        id=""
                                        required
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    />
                                    {mailError && mail === "" && (
                                        <span className="text-danger">*Email is required.</span>
                                    )}

                                    {!validateEmail(mail) && mail !== "" && (
                                        <span className="text-danger">
                                            *Please enter a valid email address.
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <Button
                                        className="btn btn-login float-right"
                                        inverted
                                        color="blue"
                                        onClick={postData}
                                    >
                                        {loading ? (
                                            <Dimmer active inverted>
                                                <Loader></Loader>
                                            </Dimmer>
                                        ) : (
                                            "Submit"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
