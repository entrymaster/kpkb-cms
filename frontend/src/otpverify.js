import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Verification() {
  //va confirmpassword = ""
  const [form, setForm] = useState({
    email: "",
    otp: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

//   const verifyOtp = () => {
//     fetch("http://localhost:5050/api/otp/ver", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(form),
//     })
//       .then((result) => {
//         console.log(result)
//         alert("OTP VERIFIED.");
//         navigate('/register');
//         // if (result) {
//         //     alert("OTP VERIFIED.");
//         //     navigate('/register');
//         //   } else {
//         //     // Handle the case where the OTP verification was not successful
//         //     alert("OTP verification failed.");
//         //     navigate('/verify');
//         //   }
//       })
//       .catch((err) => console.log(err));
//   };

const verifyOtp = () => {
    fetch("http://localhost:5050/api/otp/ver", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          // If HTTP status is 200, navigate to '/register'
          alert("OTP VERIFIED.");
          navigate('/register');
        } else {
          // If HTTP status is not 200, navigate to '/verify'
          alert("OTP verification failed.");
          navigate('/otp');
        }
      })
      .catch((err) => {
        console.error("Error during OTP verification:", err);
        // Handle the error and navigate to '/verify' or display an error message
        navigate('/otp');
      });
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
              Verify OTP
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
              <input
                id="otp-input"
                name="otp"
                type="text"
                autoComplete="off"  // Disable autocomplete for OTP inputs
                required
                className="input-box"
                placeholder="Enter 6-digit OTP"
                value={form.otp}
                onChange={handleInputChange}
                pattern="[0-9]{6}"  // Set the pattern to accept only 6 digits
                />
                <br></br>
                <br></br>
              </div>
            <br></br>
            <br></br>
            <div className="flex items-center justify-between" class="center">
              <div className="flex items-center" id="rememberme">
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                    I Agree to the Terms & Conditons
                </label>
                <input type="checkbox" id="rememberMe" name="rememberMe"></input>
              </div>
            </div>  
           <br></br>
            <div class="center">
              <button 
                type="submit" 
                id="btn1"
                onClick={verifyOtp}
              >
                VERIFY OTP
              </button>
              <br></br>
              <p className="mt-2 text-center text-sm text-gray-600" id="rememberme">
                Or{" "}
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Already Have an Account? <Link to="/">Sign in</Link>
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
