import React from 'react';

function SignUp()
{
    function redirectToNewPage() {
        // Redirect to the new page when the button is clicked
        window.location.href = "SignIn.html";
    }
    return(<div id="sign-up">
    <img className="fit-picture" src="logo1.png" alt="Billing360 Logo" />
    <br />
    <br /> <br />
    <h1> SIGN UP </h1>
    <br />
    <br />
    <input type="string" className="input-box" placeholder="First Name" />
    <input type="string" className="input-box" placeholder="Last Name" />
    <br />
    <br />
    <input type="string" className="input-box" placeholder="GST No." />
    <input type="string" className="input-box" placeholder="Shop No." />
    <br />
    <br />
    <input type="string" className="input-box" placeholder="Shop Address" />
    <br />
    <br />
    <input type="string" className="input-box" placeholder="Password" />
    <input type="string" className="input-box" placeholder="Confirm Password" />
    <br /> <br />
    <br /> <br />
    <button id="btn2" onclick="redirectToNewPage()">
      {" "}
      SIGN UP
    </button>
    <br /> <br />
    <style
      dangerouslySetInnerHTML={{
        __html:
          "\n            #btn2{\n            padding: 1rem; \n            font-size: 1.25rem;\n            color: #fff;\n            border-radius: 1rem;\n            border: none;\n            text-align: center;\n            background-color:rgb(44, 44, 131);\n            }\n        "
      }}
    />
    <br /> <br /> <br />
    <footer id="footer">
      <span>Billing 360 © 2024 Copyright All Rights Reserved.</span>
    </footer>
  </div>   
    )
}
export default SignUp;