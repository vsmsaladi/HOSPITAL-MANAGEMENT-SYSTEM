// import React from "react";

// import {
// 	Button,
// 	Collapse,
// 	Nav,
// 	Navbar,
// 	NavbarText,
// 	NavbarToggler,
// 	NavItem,
// } from "reactstrap";
// import { NavLink } from "react-router-dom";
// class NavBar extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			active: "Department",
// 		};
// 	}
// 	handleClick(e) {
// 		this.setState({ active: e.target.innerHTML });
// 	}
// 	render() {

// 		return (
// 			<div>
// 				<Navbar style={{ backgroundColor: "#242526" }} dark expand="md">
// 					<NavbarToggler
// 						onClick={() =>
// 							this.setState((prevState) => ({
// 								isOpen: !prevState.isOpen,
// 							}))
// 						}
// 					/>
// 					<Collapse isOpen={this.state.isOpen} navbar>
// 						<Nav className="mr-auto" navbar>
// 							<div className="mynav">
// 								<NavLink
// 									active
// 									activeStyle={{ color: "#61dafb" }}
// 									exact
// 									to="/adminLogin"
// 								>
// 									Departments
// 								</NavLink>
// 							</div>
// 							<NavItem className="mynav">
// 								<NavLink
// 									activeStyle={{ color: "#61dafb" }}
// 									to="/adminLogin/addDoctor"
// 								>
// 									Doctors
// 								</NavLink>
// 							</NavItem>
// 							<NavItem className="mynav">
// 								<NavLink
// 									activeStyle={{ color: "#61dafb" }}
// 									to="/adminLogin/addPatient"
// 								>
// 									Patients
// 								</NavLink>
// 							</NavItem>
// 							<NavItem className="mynav">
// 								<NavLink
// 									activeStyle={{ color: "#61dafb" }}
// 									to="/adminLogin/getFeedback"
// 								>
// 									View Feedback
// 								</NavLink>
// 							</NavItem>
// 							<NavItem className="mynav">
// 								<NavLink
// 									activeStyle={{ color: "#61dafb" }}
// 									to="/adminLogin/getProfile"
// 								>
// 									Profile
// 								</NavLink>
// 							</NavItem>
// 						</Nav>

// 						<NavbarText>
// 							<Button
// 								color="danger"
// 								onClick={() => this.props.fun()}
// 							>
// 								Logout
// 							</Button>
// 						</NavbarText>
// 					</Collapse>
// 				</Navbar>
// 			</div>
// 		);
// 	}
// }
// export default NavBar;
import React from "react";
import {
	Button,
	Collapse,
	Nav,
	Navbar,
	NavbarText,
	NavbarToggler,
	NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import "./NavBar.css"; // Add custom CSS for enhanced styling

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
	}

	toggleNavbar = () => {
		this.setState((prevState) => ({
			isOpen: !prevState.isOpen,
		}));
	};

	render() {
		return (
			<div>
				<Navbar className="custom-navbar" dark expand="md">
					<NavbarToggler onClick={this.toggleNavbar} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="me-auto" navbar>
							<NavItem>
								<NavLink className="nav-link" exact to="/adminLogin">
									Departments
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="nav-link" to="/adminLogin/addDoctor">
									Doctors
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="nav-link" to="/adminLogin/addPatient">
									Patients
								</NavLink>
							</NavItem>
							
							<NavItem>
								<NavLink className="nav-link" to="/adminLogin/getProfile">
									Profile
								</NavLink>
							</NavItem>
						</Nav>

						{/* Align the Logout Button to the right */}
						<NavbarText className="ms-auto">
							<Button
								color="danger"
								className="logout-btn"
								
								onClick={() => this.props.fun()}
							>
								Logout
							</Button>
						</NavbarText>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

export default NavBar;
