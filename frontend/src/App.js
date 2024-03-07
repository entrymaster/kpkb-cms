
import Dashboard from "./Dashboard.js";
import SignUp from "./SignUp.js";
import Inventory from "./Inventory.js";
import ContactUs from "./ContactUs.js";
import Invoice from  "./Invoice.js";
import PendingTransactions from "./Pending transaction.js";
import Register from "./Register.js"
import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/inventory" element={<Inventory/>}/>
                    <Route path="/invoice" element={<Invoice/>}/>
                    <Route path="/pendingTransactions" element={<PendingTransactions/>}/>
                    <Route path="/contactUs" element={<ContactUs/>}/>
                    <Route path="/register" element={<Register />} /> 
                </Routes>
            </Router>
        </>
    )
}

export default App;