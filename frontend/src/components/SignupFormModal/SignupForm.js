//external imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";

//internal imports
import './SignupForm.css';
import * as sessionActions from "../../store/session";
import DemoUserButton from "../DemoUserButton";


function SignupForm({setShowModal}) {
  const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const [errEmail, setErrEmail] = useState("");
  const [errUsername, setErrUsername] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    let errorsToPrint = [];
    setErrEmail("");
    setErrUsername("");
    setErrPassword("");
    setErrConfirmPassword("");

    const regexPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$');
    const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    const errorConditions = [
      !email.includes('@'),
      (username.length < 4 || username.length > 30),
      !password || !regexPassword.test(password),
      password !== confirmPassword,
      regexEmail.test(username),
    ];

    if (errorConditions[0])
      {setErrEmail('Please provide a valid email.')}
    if (errorConditions[1])
      {setErrUsername('Username must have between 4 to 30 characters.')}
    if (errorConditions[2])
      {setErrPassword("Password must be minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character.")}
    if (errorConditions[3])
      {setErrConfirmPassword('Confirm Password does not match Password.')}
    if (errorConditions[4])
      {setErrUsername('Username cannot be an email.')}

    if (!errorsToPrint.length && errorConditions.every(condition => condition === false)) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, confirmPassword }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(errorsToPrint);
  };

  return (
    <div className="form-container">
      <form className="form-container__inputs" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li className="errors" key={idx}>{error}</li>)}
        </ul>
        <h2>Sign Up</h2>

        <div className='form-input-container'>
          <div className={errEmail ? 'form-input--error': 'form-input'}>
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
              />
            </label>
          </div>
          <div className='form-frontend-error'>{errEmail}</div>
        </div>

        <div className='form-input-container'>
          <div className={errUsername ? 'form-input--error': 'form-input'}>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // required
              />
            </label>
          </div>
          <div className='form-frontend-error'>{errUsername}</div>
        </div>

        <div className='form-input-container'>
          <div className={errPassword ? 'form-input--error': 'form-input'}>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
              />
            </label>
          </div>
          <div className='form-frontend-error'>{errPassword}</div>
        </div>

        <div className='form-input-container'>
          <div className={errConfirmPassword ? 'form-input--error': 'form-input'}>
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                // required
              />
            </label>
          </div>
          <div className='form-frontend-error'>{errConfirmPassword}</div>
        </div>

        <button className="btn-primary" type="submit">Sign Up</button>
        <DemoUserButton />
      </form>
      <div className='form-container__side-section'>
          <div className='form-container__side-X' onClick={() => setShowModal(false)}>
            <i className="fas fa-times" />
          </div>
          <img className='form-container__side-image' alt="quill" src="/images/stx-198-lorehold-apprentice.jpeg" />
          <div className='form-container__side-image-caption'>
            <p>Lorehold Apprentice, illustrated by Manuel Castañón</p>
            <p>From Magic: the Gathering, by Wizards of the Coast</p>
          </div>
      </div>
    </div>
  );
}

export default SignupForm;