
import "../App.css";
import "./login.css";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);

        setTimeout(() => {
          setLoading(false);
          navigate("/dashboard");
        }, 3000); // Transition delay of 3 seconds (3000 milliseconds)
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <section className="register-block">
      <div className="container">
        <div className="row ">
          <div className="col register-sec">
            <h2 className="text-center">Login</h2>
            <form className="register-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="Enter your mail Id"
                  className="form-control"
                />
                {email === "" && (
                  <span className="text-danger">mail Id is required.</span>
                )}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  type="password"
                />
                {password === "" && (
                  <span className="text-danger">Password is required.</span>
                )}
              </div>
              <div className="form-group">
                <button className="btn btn-login float-right" type="submit">
                  {loading ? "Loading..." : "Login"}
                </button>
                {error && <span>*Email or Wrong password</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
