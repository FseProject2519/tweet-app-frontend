import React, { useState } from "react";
import "./Auth.css";
import { logIn, signUp } from "../../actions/AuthActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UilUsersAlt } from '@iconscout/react-unicons'
import { forgotPassword, resetPassword, verifyOtp } from "../../api/AuthRequests";

const Auth = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    contactNumber: "",
    otp: "",
    passwordReset: "",
    confirmPasswordReset: ""
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [action, setAction] = useState("LogIn");
  const [isOtp, setIsOtp] = useState(false);
  const [otpMsg, setOtpMsg] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetMsg, setPasswordResetMsg] = useState("");

  const [data, setData] = useState(initialState);

  const [confirmPassword, setConfirmPassword] = useState(true);
  const [forgotPassMsg, setForgotPassMsg] = useState("");
  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPassword(confirmPassword);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const forgotPass = async (isResendOtp) => {
    let forgotPasswordResponse = await forgotPassword(data.userId)
    if (isResendOtp) {
      setForgotPassMsg("OTP has been resent")
    } else {
      setForgotPassMsg(forgotPasswordResponse.data)
      if (forgotPasswordResponse.data.includes("registered email")) {
        setIsOtp(true)
      } else {
        setData({ ...data, 'userId': "" })
      }
    }
  }

  const verifyToken = async () => {
    let otpData = {
      otp: data.otp
    }
    let otpResponse = await verifyOtp(data.userId, otpData)
    setForgotPassMsg("")
    setData({ ...data, 'otp': "" });
    if (otpResponse.data.includes("successfully")) {
      setIsPasswordReset(true)
      setIsOtp(false)
      setOtpMsg("")
    } else {
      setOtpMsg(otpResponse.data)
    }

  }

  const resetPass = async () => {
    let passwordResetObject = {}
    if (data.passwordReset === data.confirmPasswordReset) {
      passwordResetObject["password"] = data.passwordReset
      passwordResetObject["confirmPassword"] = data.confirmPasswordReset
      let pwdResetResponse = await resetPassword(data.userId, passwordResetObject)
      setPasswordResetMsg(pwdResetResponse.data)
      setIsOtp(false)
      setIsPasswordReset(false)
      setOtpMsg("")
      setForgotPassMsg("")
      setData({ initialState })
      setAction("LogIn")
    } else {
      setPasswordResetMsg("Passwords are not matching")
    }
  }

  const resendOtp = () => {
    forgotPass(true)
    setOtpMsg("")
  }

  // Form Submission
  const handleSubmit = (e) => {
    setConfirmPassword(true);
    e.preventDefault();
    if (action === "SignUp") {
      data.password === data.confirmPassword
        ? dispatch(signUp(data, navigate))
        : setConfirmPassword(false);
    } else if (action === "LogIn") {
      dispatch(logIn(data, navigate));
    } else if (action === "ForgotPassword" && isOtp) {
      verifyToken()
    } else if (action === "ForgotPassword" && isPasswordReset) {
      resetPass()
    } else if (action === "ForgotPassword") {
      forgotPass(false)
    }
  };

  return (
    <div className="Auth" data-test="Auth-Test">
      {/* left side */}

      <div className="a-left">
        <UilUsersAlt className="logo" />

        <div className="Webname">
          <h1>TweetApp</h1>
        </div>
      </div>

      {/* right form side */}

      <div className="a-right">
        <form className={forgotPassMsg !== "" ? "infoForm forgotPass authFormFp" : "infoForm authForm"} onSubmit={handleSubmit}>
          {action === "ForgotPassword" ? (<h3>Password Reset</h3>) :
            <h3>{action === "SignUp" ? "Register" : "Login"}</h3>
          }
          {
            forgotPassMsg !== "" && (
              < div className="forgotPass">
                {forgotPassMsg}
              </div>
            )
          }
          {
            otpMsg !== "" && (
              < div className="forgotPass">
                {otpMsg}
              </div>
            )
          }
          {
            passwordResetMsg !== "" && (
              < div className="forgotPass">
                {passwordResetMsg}
              </div>
            )
          }

          {(action === "ForgotPassword" && !isOtp && !isPasswordReset) && (
            <div >
              <input
                required
                type="text"
                placeholder="User Id"
                className="infoInput"
                name="userId"
                value={data.userId}
                onChange={handleChange}
              />
            </div>
          )}
          {(action === "ForgotPassword" && isOtp) && (
            <div>
              <input
                required
                type="password"
                placeholder="Enter your OTP"
                className="infoInput"
                name="otp"
                value={data.otp}
                onChange={handleChange}
              />
            </div>
          )}
          {action === "SignUp" && (
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
              />
            </div>
          )}
          {!(action === "ForgotPassword") && (
            <div>
              <input
                required
                type="text"
                placeholder="User Id"
                className="infoInput"
                name="userId"
                value={data.userId}
                onChange={handleChange}
              />
            </div>
          )}
          {!(action === "ForgotPassword") && (
            < div >
              <input
                required
                type="password"
                className="infoInput"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              {action === "SignUp" && (
                <input
                  required
                  type="password"
                  className="infoInput"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
              )}
            </div>
          )}
          {((action === "ForgotPassword") && isPasswordReset) && (
            < div >
              <input
                required
                type="password"
                className="infoInput"
                placeholder="Password"
                name="passwordReset"
                value={data.passwordReset}
                onChange={handleChange}
              />
            </div>
          )}
          {((action === "ForgotPassword") && isPasswordReset) && (

            <div>
              <input
                required
                type="password"
                className="infoInput"
                name="confirmPasswordReset"
                placeholder="Confirm Password"
                value={data.confirmPasswordReset}
                onChange={handleChange}
              />
            </div>
          )}
          {(action === "LogIn") && (<div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setAction("ForgotPassword");
              }}
            >
              Forgot Password
            </span>
          </div>)
          }
          {action === "SignUp" && (
            <div>
              <input
                required
                type="email"
                className="infoInput"
                placeholder="e-Mail"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                className="infoInput"
                name="contactNumber"
                placeholder="Contact No."
                onChange={handleChange}
              />
            </div>
          )}
          {!(action === "ForgotPassword") && (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                alignSelf: "flex-end",
                marginRight: "5px",
                display: confirmPassword ? "none" : "block",
              }}
            >
              *Confirm password is not same
            </span>
          )}
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setAction((action === "SignUp" || action === "ForgotPassword") ? "LogIn" : "SignUp");
                setForgotPassMsg("")
                setOtpMsg("")
                setPasswordResetMsg("")
                setIsOtp(false)
                setIsPasswordReset(false)
              }}
            >
              {(action === "ForgotPassword")
                ? "Remember Password? Login"
                : (action === "SignUp")
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign up"}
            </span>
            {(action === "ForgotPassword" && isOtp) && (<span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={resendOtp}
            >
              Resend OTP
            </span>
            )}
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : action === "SignUp" ? "SignUp" : action === "ForgotPassword" ? "Submit" : "Login"}
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default Auth;
