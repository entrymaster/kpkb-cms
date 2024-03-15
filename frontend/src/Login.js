import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import "./Login.css";
import ReactLoading from "react-loading";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);

  const handleInputChange = (e) => {
    const maxLength = 25; // Maximum allowed length
    const name = e.target.name;
    const value = e.target.value.slice(0, maxLength); // Truncate the input if it exceeds maxLength
    setForm({ ...form, [name]: value });
  };

  const authCheck = () => {
    setTimeout(() => {
      fetch("http://localhost:5050/api/login/log/get")
        .then((response) => response.json())
        .then((data) => {
          alert("Successfully Login");
          localStorage.setItem("user", JSON.stringify(data));
          authContext.signin(data._id, () => {
            navigate("/dashboard");
          });
        })
        .catch((err) => {
          alert("Wrong credentials, Try again");
          console.log(err);
        });
    }, 3000);
  };

  const loginUser = (e) => {
    e.preventDefault();
    setShowLoading(true); // Show loading animation on button click

    // Perform your authentication logic here
    authCheck();

    // Simulate loading delay for 3 seconds (replace with actual authentication logic)
    setTimeout(() => {
      setShowLoading(false); // Hide loading animation after 3 seconds
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center" class="center2">
        <div className="flex justify-center">
          {/* <img src={require("../assets/signup.jpg")} alt="" /> */}
        </div>
        <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
          <div class="shift">
            <img
              class="fit-picture"
              src="logo1.png"
              //alt="Your Company"
            />
            <h2 className="logintext">
              login to your account
            </h2>

          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                  value={form.email}
                  onChange={handleInputChange}
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
                  placeholder="Password"
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
                onClick={loginUser}
              >
                {showLoading ? (
                  <div className="loading-indicator">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <div className="loading-overlay">
                      <ReactLoading type="spin" color="#000" height={50} width={50} />
                    </div>
                    </span>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
              </div>
              <br></br>
              <div class="shift4">
              <div className="text-sm" class="center2">
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  <Link to="/forgotverify"> Forgot your password?</Link>
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




// // import { LockClosedIcon } from "@heroicons/react/20/solid";
// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthContext from "./AuthContext";
// import "./Login.css";
// import ReactLoading from "react-loading";

// function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });
//   const [showLoading, setShowLoading] = useState(false); 
//   const authContext = useContext(AuthContext);
//   const navigate = useNavigate();


//   const handleInputChange = (e) => {
//     const maxLength = 25; // Maximum allowed length
//     const name = e.target.name;
//     const value = e.target.value.slice(0, maxLength); // Truncate the input if it exceeds maxLength
//     setForm({ ...form, [name]: value });
//   };

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

//   const loginUser = (e) => {
//     // Cannot send empty data
//     if (form.email === "" || form.password === "") {
//       alert("To login user, enter details to proceed...");
//     } else {
//       fetch("http://localhost:5050/api/login/log/in", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(form),
//       })
//         .then((result) => {
//           console.log("User login", result);
//         })
//         .catch((error) => {
//           console.log("Something went wrong ", error);
//         });
//     }
//     authCheck();
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

  
//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 h-screen  items-center place-items-center" class="center2">
//         <div className="flex justify-center" >
//           {/* <img src={require("../assets/signup.jpg")} alt="" /> */}
//         </div>
//         <div className="w-full max-w-md space-y-8 p-10 rounded-lg" >
//           <div class="shift">
//             <img
//             class="fit-picture"
//               src="logo1.png"
//               //alt="Your Company"
//             />
//             <h2 className="logintext">
//               login to your account
//             </h2>

//           </div>
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             {/* <input type="hidden" name="remember" defaultValue="true" /> */}
//             <div className="-space-y-px rounded-md shadow-sm" id="sign-in">
//               <div>
//                 <input
//                   id="email-address"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="input-box2"
//                   placeholder="Email address"
//                   value={form.email}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <br></br>
//               <div>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   className="input-box2"
//                   placeholder="Password"
//                   value={form.password}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between" class="center2">
//               <div className="flex items-center" class="shift2">
//                 <input
                   
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                 />
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 block text-sm text-gray-900"
//                 >
//                   Remember me
//                 </label>
//               </div>

              
//             </div>

//             <div id="center2" class="shift3"> 
//               <button
//                 type="submit"
//                 id="btn2"
//                 className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                 onClick={loginUser}
//               >
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   {/* <LockClosedIcon
//                     className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
//                     aria-hidden="true"
//                   /> */}
//                 </span>
//                 Sign in
//               </button>
//               </div>
//               <br></br>
//               <div class="shift4">
//               <div className="text-sm" class="center2">
//                 <span
//                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                   <Link to="/forgotverify"> Forgot your password?</Link>
//                 </span>
//               </div>
//               <p className="mt-2 text-center text-sm text-gray-600" class="shift5">
//                 Or{" "}
//                 <span
//                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                   Don't Have an Account, Please{" "}
//                   <Link to="/register"> Register now </Link>
//                 </span>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;
