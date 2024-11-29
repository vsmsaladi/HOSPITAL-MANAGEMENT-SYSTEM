import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink, Table } from "reactstrap";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
class PatientAppointments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appointments: [],
			UserId: "",
		};
	}

	async componentDidMount() {
		const headers = {
			authorization: Cookies.get("token"),
		};

		// Retrieve and decode the token
		const token = Cookies.get("token");
		if (token) {
			const decoded = jwtDecode(token);
			console.log(decoded); // Log decoded token
			this.setState({ UserId: decoded.Id }, () => {
				// Ensure UserId is logged after state update
				console.log("UserId from state:", this.state.UserId);

				// Fetch patient appointments only after state is updated
				this.fetchAppointments(headers, decoded.Id);
			});
		}
	}

	fetchAppointments = async (headers, userId) => {
		try {
			const response = await axios.post(
				"http://localhost:12347/patientAppointment",
				{ UserId: userId },
				{ headers }
			);
			console.log(response);
			this.setState({ appointments: response.data });
		} catch (error) {
			console.error("Error fetching appointments:", error);
		}
	};

	render() {
		return (
			<div>
				<Nav tabs>
					<NavItem>
						<NavLink>
							<Link to="/patientLogin">Doctor List</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link to="/patientLogin/bookAppointment">
								Book Appointment
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link to="/patientLogin/getPatientProfile">
								Edit Profile
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink active>
							<Link to="/patientLogin/patientAppointments">
								View Appointments
							</Link>
						</NavLink>
					</NavItem>
				</Nav>
				<Table>
					<thead>
						<tr>
							<th>Application Id</th>
							<th>Name</th>
							<th>Email</th>
							<th>Prescription</th>
						</tr>
					</thead>
					<tbody>
						{this.state.appointments.map((appointment) => (
							<tr key={appointment.Apid}>
								<td>{appointment.Apid}</td>
								<td>{appointment.Name}</td>
								<td>{appointment.Email}</td>
								<td>{appointment.Prescription}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default PatientAppointments;
