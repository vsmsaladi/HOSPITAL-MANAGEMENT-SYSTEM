import React from "react";
import {
	Col,
	Nav,
	NavItem,
	NavLink,
	Row,
	Table,
	Input,
	Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
class GetAppointments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			appointments: [],
			searchTerm: "",
			isOpen: false,
		};
		this.handlePres = this.handlePres.bind(this);
	}
	componentDidMount() {
		console.log(Cookies.get("doc_id"));
		const headers = {
			authorization: Cookies.get("token"),
		};
		axios
		
			.post(
				"http://localhost:12347/docAppointment",
				{
					Id: Cookies.get("doc_id"),
				},
				{ headers: headers }
			)
			.then((res) => {
				console.log(res);
				try {
					this.setState({ appointments: res.data });
				} catch {
					this.setState({ appointments: undefined });
					console.log(this.state.appointments);
				}
			});
	}
	handlePres(appointment) {
		const headers = {
			authorization: Cookies.get("token"),
		};
		this.setState({ isOpen: false });
		console.log(this.state);
		console.log(appointment);
		axios
			.post(
				"http://localhost:12347/addPrescription",
				{
					Apid: appointment.Apid,
					Prescription: this.state.prescription,
				},
				{ headers: headers }
			)
			.then((res) => {
				alert(res.data);
			});
	}
	render() {
		return (
			<div>
				<Nav tabs>
					<NavItem>
						<NavLink active>
							<Link to="/doctorLogin">View Appointments</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link to="/doctorLogin/editDocProfile">
								Edit Profile
							</Link>
						</NavLink>
					</NavItem>
				</Nav>
				<Row>
					<Col className="mt-3" sm="3"></Col>
					<Col className="mt-3">
						<Input
							style={{ width: "50%" }}
							placeholder="Search..."
							type="text"
							onChange={(e) =>
								this.setState({ searchTerm: e.target.value })
							}
						/>
						<Table
							striped
							style={{
								width: "50%",
								"box-shadow": "2px 2px 4px 4px #CCCCCC",
								marginTop: "30px",
							}}
						>
							<thead>
								<th>Name</th>
								<th>Description</th>
								<th>Date</th>
								<th>Phone Number</th>
							</thead>
							{this.state.appointments && this.state.appointments.length > 0 ? (
								this.state.appointments
									.filter((appointment) => {
										if (this.state.searchTerm === "") {
											return appointment;
										} else if (
											appointment.Name.toLowerCase().includes(
												this.state.searchTerm.toLowerCase()
											)
										) {
											return appointment;
										}
									})
									.map((appointment) => {
										return (
											<tr>
												<td>{appointment.Name}</td>
												<td>
													{appointment.Description}
												</td>
												<td>{appointment.Day}</td>
												<td>{appointment.Contact}</td>
												{this.state.isOpen ? (
													<td></td>
												) : (
													<td>
														<Button
															style={{
																backgroundColor:
																	"green",
															}}
															onClick={() =>
																this.setState({
																	isOpen: true,
																})
															}
														>
															Prescribe
														</Button>
													</td>
												)}
												{this.state.isOpen ? (
													<td
														style={{
															columnWidth:
																"200px",
														}}
													>
														<Input
															type="text"
															onChange={(e) =>
																this.setState({
																	prescription:
																		e.target
																			.value,
																})
															}
														/>
														<Button
															style={{
																backgroundColor:
																	"green",
															}}
															className="mt-2"
															onClick={() =>
																this.handlePres(
																	appointment
																)
															}
														>
															Add
														</Button>
													</td>
												) : (
													<td></td>
												)}
											</tr>
										);
									})
							) : (
								<h1></h1>
							)}
						</Table>
					</Col>
				</Row>
			</div>
		);
	}
}
export default GetAppointments;



// import React from "react";
// import {
//     Col,
//     Nav,
//     NavItem,
//     NavLink,
//     Row,
//     Table,
//     Input,
//     Button,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
// } from "reactstrap";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";

// class GetAppointments extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             appointments: [],
//             searchTerm: "",
//             isModalOpen: false,
//             selectedAppointment: null,
//             prescriptions: [],
//             newPrescription: "",
//         };
//         this.handlePres = this.handlePres.bind(this);
//     }

//     componentDidMount() {
//         const headers = {
//             authorization: Cookies.get("token"),
//         };
//         axios
//             .post(
//                 "http://localhost:12347/docAppointment",
//                 {
//                     Id: Cookies.get("doc_id"),
//                 },
//                 { headers: headers }
//             )
//             .then((res) => {
//                 console.log(res);
//                 try {
//                     this.setState({ appointments: res.data });
//                 } catch {
//                     this.setState({ appointments: undefined });
//                     console.log(this.state.appointments);
//                 }
//             });
//     }

//     // Function to fetch existing prescriptions for a specific appointment
//     fetchPrescriptions(appointment) {
//         const headers = {
//             authorization: Cookies.get("token"),
//         };
//         axios
//             .post(
//                 "http://localhost:12347/getPrescriptions",
//                 {
//                     Apid: appointment.Apid,
//                 },
//                 { headers: headers }
//             )
//             .then((res) => {
//                 console.log("Existing prescriptions:", res.data);
//                 this.setState({
//                     prescriptions: res.data,
//                     selectedAppointment: appointment,
//                     isModalOpen: true,
//                 });
//             });
//     }

//     handlePres(appointment) {
//         const headers = {
//             authorization: Cookies.get("token"),
//         };
//         axios
//             .post(
//                 "http://localhost:12347/addPrescription",
//                 {
//                     Apid: appointment.Apid,
//                     Prescription: this.state.newPrescription,
//                 },
//                 { headers: headers }
//             )
//             .then((res) => {
//                 alert(res.data);
//                 this.setState({ isModalOpen: false, newPrescription: "" });
//                 // Optionally, refetch prescriptions to update the UI
//                 this.fetchPrescriptions(appointment);
//             });
//     }

//     render() {
//         return (
//             <div>
//                 <Nav tabs>
//                     <NavItem>
//                         <NavLink active>
//                             <Link to="/doctorLogin">View Appointments</Link>
//                         </NavLink>
//                     </NavItem>
//                     <NavItem>
//                         <NavLink>
//                             <Link to="/doctorLogin/editDocProfile">Edit Profile</Link>
//                         </NavLink>
//                     </NavItem>
//                 </Nav>
//                 <Row>
//                     <Col className="mt-3" sm="3"></Col>
//                     <Col className="mt-3">
//                         <Input
//                             style={{ width: "50%" }}
//                             placeholder="Search..."
//                             type="text"
//                             onChange={(e) =>
//                                 this.setState({ searchTerm: e.target.value })
//                             }
//                         />
//                         <Table
//                             striped
//                             style={{
//                                 width: "50%",
//                                 boxShadow: "2px 2px 4px 4px #CCCCCC",
//                                 marginTop: "30px",
//                             }}
//                         >
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Description</th>
//                                     <th>Date</th>
//                                     <th>Phone Number</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {this.state.appointments &&
//                                 this.state.appointments.length > 0 ? (
//                                     this.state.appointments
//                                         .filter((appointment) => {
//                                             if (this.state.searchTerm === "") {
//                                                 return appointment;
//                                             } else if (
//                                                 appointment.Name
//                                                     .toLowerCase()
//                                                     .includes(
//                                                         this.state.searchTerm.toLowerCase()
//                                                     )
//                                             ) {
//                                                 return appointment;
//                                             }
//                                         })
//                                         .map((appointment) => (
//                                             <tr key={appointment.Apid}>
//                                                 <td>{appointment.Name}</td>
//                                                 <td>{appointment.Description}</td>
//                                                 <td>{appointment.Day}</td>
//                                                 <td>{appointment.Contact}</td>
//                                                 <td>
//                                                     <Button
//                                                         style={{ backgroundColor: "green" }}
//                                                         onClick={() =>
//                                                             this.fetchPrescriptions(
//                                                                 appointment
//                                                             )
//                                                         }
//                                                     >
//                                                         Prescribe
//                                                     </Button>
//                                                 </td>
//                                             </tr>
//                                         ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="5">No appointments found</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </Table>
//                     </Col>
//                 </Row>

//                 {/* Modal for adding/viewing prescriptions */}
//                 <Modal isOpen={this.state.isModalOpen} toggle={() => this.setState({ isModalOpen: !this.state.isModalOpen })}>
//                     <ModalHeader toggle={() => this.setState({ isModalOpen: !this.state.isModalOpen })}>
//                         Prescriptions for {this.state.selectedAppointment ? this.state.selectedAppointment.Name : ""}
//                     </ModalHeader>
//                     <ModalBody>
//                         {this.state.prescriptions.length > 0 ? (
//                             <div>
//                                 <h5>Existing Prescriptions:</h5>
//                                 <ul>
//                                     {this.state.prescriptions.map((prescription, index) => (
//                                         <li key={index}>
//                                             {prescription.Text} (Date: {prescription.Date})
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ) : (
//                             <p>No prescriptions have been given for this appointment.</p>
//                         )}
//                         <Input
//                             type="text"
//                             placeholder="Add new prescription"
//                             value={this.state.newPrescription}
//                             onChange={(e) =>
//                                 this.setState({ newPrescription: e.target.value })
//                             }
//                         />
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button color="primary" onClick={() => this.handlePres(this.state.selectedAppointment)}>
//                             Add Prescription
//                         </Button>
//                         <Button color="secondary" onClick={() => this.setState({ isModalOpen: false })}>
//                             Cancel
//                         </Button>
//                     </ModalFooter>
//                 </Modal>
//             </div>
//         );
//     }
// }

// export default GetAppointments;
