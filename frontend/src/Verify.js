import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Verification() {
  //va confirmpassword = ""
  const [form, setForm] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = (req , res) => {
    // Check if the email is empty
    if (!form.email) {
      alert("Please enter your email.");
      return; // Stop further execution
    }
  
    // Check if the email is in a valid format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
        alert("Please enter a valid email address.");
        return; // Stop further execution
    }
    fetch("http://localhost:5050/api/otp/gen?source=login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((result) => {
        alert(" OTP has been sent to E-mail.");
        //res.redirect('/otp?source=login');
        navigate('/otp' ,  { state: { email: form.email } });
      })
      .catch((err) => console.log(err));
  };

  const emailexist = () => {
    // Check if the email is empty
    if (!form.email) {
      alert("Please enter your email.");
      return; // Stop further execution
    }
  
    // Check if the email is in a valid format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
        alert("Please enter a valid email address.");
        return; // Stop further execution
    }

    fetch("http://localhost:5050/api/forgot/ver", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
          // Email exists, call the sendOTP function
          alert("Account already exists with this Email.")
        } else {
          //alert("");
          sendOtp();
        }
      })
      .catch((err) => console.error(err));
};




  const handleSubmit = (e) => {
    e.preventDefault();
  };



  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center" >
      <div id="sign-up">
        <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
          <div>
            <img 
              class = "fit-picture"
            src="logo1.png" alt = "Billing360 Logo"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Verify Your Email-ID
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-box"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleInputChange}
                />
                <br></br>
                <br></br>
              </div>
           <br></br>
            <div class="center">
              <button 
                type="submit" 
                id="btn1"
                onClick={emailexist}
                
              >
                Send OTP
              </button>
              <br></br>
              <p className="mt-2 text-center text-sm text-gray-600" id="rememberme">
                Or{" "}
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Already Have an Account? <br></br><Link to="/">Sign in</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
        <footer id="footer">
          <span>Billing 360 &copy; 2024 Copyright All Rights Reserved.</span>
        </footer>
      </div>
      </div>
    </>
  );
}

export default Verification;
