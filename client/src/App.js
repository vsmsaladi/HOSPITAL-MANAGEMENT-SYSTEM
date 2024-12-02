import { Switch, Route, Link } from "react-router-dom";
import { Row, Navbar, Nav, NavItem, NavbarText } from "reactstrap";
import Body from "./Components/body";
import "./App.css";
import admin from "./assets/admin.png";
import patient from "./assets/patient_bkp.jpg";
import doctor from "./assets/doctor_new.png";
import Footer from "./Components/footer";
import EntryRoutes from "./Routes/entryRoutes";
import PureBody from "./Components/PureBody";
import PureFooter from "./Components/PureFooter";
import logo from "./assets/titans_hospitals.webp"; // import the logo image

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<ul
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							padding: "20px",
							margin: "0",
							background: "linear-gradient(90deg, #3b5998, #242526)",
							color: "white",
							boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
						}}
					>
						<li style={{ flex: "1", display: "flex", alignItems: "center" }}>
							<img
								src={logo}
								alt="Logo"
								style={{
									width: "50px", // adjust the size as needed
									height: "50px", // adjust the size as needed
									marginRight: "10px",
								}}
							/>
							<span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
								Titans Hospitals
							</span>
						</li>
						<li style={{ textAlign: "right" }}>
							<Link
								style={{
									color: "white",
									fontWeight: "bold",
									textDecoration: "none",
									padding: "10px 20px",
									borderRadius: "5px",
									background: "#61dafb",
								}}
								to="/signUp"
							>
								New User? Sign Up!!
							</Link>
						</li>
					</ul>

					<div className="container">
						<PureBody role="Admin" src={admin} link="/adminLogin" />
						<PureBody
							role="Doctor"
							src={doctor}
							link="/doctorLogin"
						/>
						<PureBody
							role="Patient"
							src={patient}
							link="patientLogin"
						/>
					</div>
				</Route>
				<EntryRoutes />
			</Switch>
			<PureFooter />
		</div>
	);
}
export default App;
