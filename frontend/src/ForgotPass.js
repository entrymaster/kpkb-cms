// import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import { Link, useNavigate , Navigate, useLocation} from "react-router-dom";
import AuthContext from "./AuthContext";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const maxLength = 25; // Maximum allowed length
    const name = e.target.name;
    const value = e.target.value.slice(0, maxLength); // Truncate the input if it exceeds maxLength
    setForm({ ...form, [name]: value });
  };

  
  const location = useLocation();
  const { email } = location.state || {}; // Destructure email from location state
  form.email = email;
//   const authCheck = () => {
//     setTimeout(() => {
//       fetch("http://localhost:5050/api/login/log/get")
//         .then((response) => response.json())
//         .then((data) => {
//           alert("Successfully Login");
//           localStorage.setItem("user", JSON.stringify(data));
//           authContext.signin(data._id, () => {
//             navigate("/dashboard");
//           });
//         })
//         .catch((err) => {
//           alert("Wrong credentials, Try again")
//           console.log(err);
//         });
//     }, 3000);
//   };

  const forgotpass = (e) => {
    // Cannot send empty data
    //form.email = email;
    if (form.email === "" || form.password === "") {
      alert("To change password, enter details to proceed...");
    } else {
        // console.log(form.password)
        // console.log(form.email)
      fetch("http://localhost:5050/api/forgot/for", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((result) => {
          alert("Successfully changed password");
          console.log("Successfully changed password", result);
          navigate("/")
        })
        .catch((error) => {
          console.log("Something went wrong ", error);
        });
    }
    //authCheck();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  };
if (!(location.state && location.state.email)) {
    return <Navigate to="/forgotverify" replace/>;
}
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen  items-center place-items-center" class="center2">
        <div className="flex justify-center" >
          {/* <img src={require("../assets/signup.jpg")} alt="" /> */}
        </div>
        <div className="w-full max-w-md space-y-8 p-10 rounded-lg" >
          <div class="shift">
            <img
            class="fit-picture"
              src="logo1.png"
              //alt="Your Company"
            />
            <h2 className="logintext">
              Change your Password
            </h2>

          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div className="-space-y-px rounded-md shadow-sm" id="sign-in">
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-box2"
                  placeholder="Email address"
                  //value={form.email}
                  value={email || ''} // Set value to email received from location state
                  disabled // Disable input to prevent user modification
                  //onChange={handleInputChange}
                />
              </div>
              <br></br>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input-box2"
                  placeholder="New Password"
                  value={form.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between" class="center2">
              <div className="flex items-center" class="shift2">
                <input
                   
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              
            </div>

            <div id="center2" class="shift3"> 
              <button
                type="submit"
                id="btn2"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={forgotpass}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  /> */}
                </span>
                Change Password
              </button>
              </div>
              <br></br>
              <div class="shift4">
              <div className="text-sm" class="center2">
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                </span>
              </div>
              <p className="mt-2 text-center text-sm text-gray-600" class="shift5">
                Or{" "}
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Don't Have an Account, Please{" "}
                  <Link to="/register"> Register now </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
