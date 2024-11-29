

// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import {
//     Button,
//     Form,
//     FormGroup,
//     Input,
//     Label,
//     NavItem,
//     NavLink,
//     Nav,
//     Row,
//     Col,
// } from "reactstrap";
// import Cookies from "js-cookie";

// class BookAppointment extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             UserId: "",
//             Name: "",
//             Email: "",
//             Contact: "",
//             Age: "",
//             Day: "",
//             Description: "",
//             Id: "",
//             doctors: [],
//             departments: [],
//             selectedDepartment: "",
//         };
//         this.inputRef = React.createRef();
//     }

//     componentDidMount() {
//         // Focus on the first input field
//         this.inputRef.current.focus();

//         // Retrieve UserId from cookies or session storage
//         const token = Cookies.get("token");
//         if (token) {
//             const decoded = jwtDecode(token);
//             console.log(decoded.Id);
//             this.setState({ UserId: decoded.Id }); // Adjust the key based on your token's structure
//         }
//         console.log(this.state.UserId);

//         // Fetch departments
//         const headers = {
//             authorization: Cookies.get("token"),
//         };
//         axios
//             .get("http://localhost:12347/getDoctorDepartments", { headers })
//             .then((response) => {
//                 this.setState({ departments: response.data });
//             })
//             .catch((error) => {
//                 console.error("Error fetching departments:", error);
//             });
//     }

//     handleDepartmentChange = (e) => {
//         const departmentId = e.target.value;
//         this.setState({ selectedDepartment: departmentId });

//         const headers = {
//             authorization: Cookies.get("token"),
//         };
//         axios
//             .post(
//                 "http://localhost:12347/getDoctorByDepartment",
//                 { department: departmentId }, // Key matches Go struct tag
//                 { headers }
//             )
//             .then((response) => {
//                 this.setState({ doctors: response.data });
//             })
//             .catch((error) => {
//                 console.error("Error fetching doctors:", error);
//             });
//     };

//     handleDateChange = (e) => {
//         const date = e.target.value;
//         this.setState({ Day: date });
//     };

//     handleSubmit = (e) => {
//         e.preventDefault(); // Prevent default form submission

//         const headers = {
//             authorization: Cookies.get("token"),
//         };

//         // Include UserId and other form data
//         const appointmentData = {
//             UserId: this.state.UserId,
//             Name: this.state.Name,
//             Email: this.state.Email,
//             Contact: this.state.Contact,
//             Age: this.state.Age,
//             Day: this.state.Day,
//             Description: this.state.Description,
// 			TimeSlot: "12:00:00",
//             Id: this.state.Id,
//         };

//         console.log(appointmentData);
//         axios
//             .post("http://localhost:12347/bookAppointment", appointmentData, {
//                 headers,
//             })
//             .then((res) => {
//                 alert(res.data);
//             })
//             .catch((error) => {
//                 console.error("Error booking appointment:", error);
//             });
//     };

//     render() {
//         return (
//             <div>
//                 <Nav tabs>
//                     <NavItem>
//                         <NavLink>
//                             <Link to="/patientLogin">Doctor List</Link>
//                         </NavLink>
//                     </NavItem>
//                     <NavItem>
//                         <NavLink active>
//                             <Link to="/patientLogin/bookAppointment">
//                                 Book Appointment
//                             </Link>
//                         </NavLink>
//                     </NavItem>
//                     <NavItem>
//                         <NavLink>
//                             <Link to="/patientLogin/getPatientProfile">Edit Profile</Link>
//                         </NavLink>
//                     </NavItem>
//                     <NavItem>
//                         <NavLink>
//                             <Link to="/patientLogin/patientAppointments">View Appointments</Link>
//                         </NavLink>
//                     </NavItem>
//                 </Nav>
//                 <Row>
//                     <Col md="3"></Col>
//                     <Col md="6">
//                         <Form className="mt-3" onSubmit={this.handleSubmit}>
//                             <FormGroup>
//                                 <Label>Name *</Label>
//                                 <Input
//                                     innerRef={this.inputRef}
//                                     type="text"
//                                     value={sessionStorage.getItem("patientName") || this.state.Name}
//                                     onChange={(e) => this.setState({ Name: e.target.value })}
//                                 />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label>Email</Label>
//                                 <Input
//                                     type="email"
//                                     value={sessionStorage.getItem("patientEmail") || this.state.Email}
//                                     onChange={(e) => this.setState({ Email: e.target.value })}
//                                 />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label>Contact</Label>
//                                 <Input
//                                     type="text"
//                                     value={sessionStorage.getItem("patientContact") || this.state.Contact}
//                                     onChange={(e) => this.setState({ Contact: e.target.value })}
//                                 />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label>Age *</Label>
//                                 <Input
//                                     type="number"
//                                     onChange={(e) => this.setState({ Age: e.target.value })}
//                                 />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label>Department *</Label>
//                                 <Input type="select" onChange={this.handleDepartmentChange}>
//                                     <option value="">Select a department</option>
//                                     {this.state.departments.map((dept, index) => (
//                                         <option key={index} value={dept.Name}>
//                                             {dept.Name}
//                                         </option>
//                                     ))}
//                                 </Input>
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label>Doctor *</Label>
//                                 <Input
//                                     type="select"
//                                     onChange={(e) => this.setState({ Id: e.target.value })}
//                                 >
//                                     <option value="">Select a doctor</option>
//                                     {this.state.doctors.map((doctor) => (
//                                         <option key={doctor.doctor_id} value={doctor.doctor_id}>
//                                             {doctor.Name}
//                                         </option>
//                                     ))}
//                                 </Input>
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label>Date *</Label>
//                                 <Input type="date" onChange={this.handleDateChange} />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label>Description</Label>
//                                 <Input
//                                     type="textarea"
//                                     onChange={(e) => this.setState({ Description: e.target.value })}
//                                 />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Button color="primary" type="submit">
//                                     Submit
//                                 </Button>
//                             </FormGroup>
//                         </Form>
//                     </Col>
//                 </Row>
//             </div>
//         );
//     }
// }

// export default BookAppointment;

import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	NavItem,
	NavLink,
	Nav,
	Row,
	Col,
} from "reactstrap";
import Cookies from "js-cookie";
class BookAppointment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			UserId: "",
			Name: "",
			Email: "",
			Contact: "",
			Age: "",
			Day: "",
			Description: "",
			Id: "",
			doctors: [],
			departments: [],
			selectedDepartment: "",
			timeSlots: this.generateTimeSlots(), // Generate time slots
			selectedTimeSlot: "",
			unavailableSlots: [], // Holds unavailable slots
		};
		this.inputRef = React.createRef();
	}

	componentDidMount() {
		this.inputRef.current.focus();
		const token = Cookies.get("token");
		if (token) {
			const decoded = jwtDecode(token);
			this.setState({ UserId: decoded.Id });
		}

		const headers = { authorization: Cookies.get("token") };
		axios
			.get("http://localhost:12347/getDoctorDepartments", { headers })
			.then((response) => {
				this.setState({ departments: response.data });
			})
			.catch((error) => console.error("Error fetching departments:", error));
	}

	generateTimeSlots() {
		const slots = [];
		let start = new Date();
		start.setHours(9, 0, 0, 0); // 9:00 AM
		const end = new Date();
		end.setHours(16, 0, 0, 0); // 4:00 PM

		while (start < end) {
			slots.push(start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
			start.setMinutes(start.getMinutes() + 30);
		}
		return slots;
	}



	handleDepartmentChange = (e) => {
		const departmentId = e.target.value;
		this.setState({ selectedDepartment: departmentId });

		const headers = { authorization: Cookies.get("token") };
		axios
			.post(
				"http://localhost:12347/getDoctorByDepartment",
				{ department: departmentId },
				{ headers }
			)
			.then((response) => {
				this.setState({ doctors: response.data });
			})
			.catch((error) => console.error("Error fetching doctors:", error));

	};

	handleDateChange = (e) => {
		const date = e.target.value;
		console.log(this.state.doctors);
		this.setState({ Day: date });
	};

	handleTimeSlotChange = (e) => {
		const selectedTimeSlot = e.target.value;
		if (this.state.unavailableSlots.includes(selectedTimeSlot)) {
			alert("This time slot is already booked. Please select a different slot.");
		} else {
			this.setState({ selectedTimeSlot });
		}
	};

	// fetchUnavailableSlots = () => {
	// 	const { Id, Day } = this.state;
	// 	if (!Id || !Day) return;

	// 	const headers = { authorization: Cookies.get("token") };
	// 	console.log("id:", Id)
	// 	console.log("Day:", Day)
	// 	axios
	// 		.post(
	// 			"http://localhost:12347/getUnavailableSlots",
	// 			{ doctorId: Id, date: Day },
	// 			{ headers }
	// 		)
	// 		.then((response) => {
	// 			this.setState({ unavailableSlots: response.data });
	// 		})
	// 		.catch((error) => console.error("Error fetching unavailable slots:", error));
	// };

	convertTo24Hour(timeStr) {
		const [time, modifier] = timeStr.split(" ");
		let [hours, minutes] = time.split(":");
		if (modifier === "PM" && hours !== "12") {
			hours = parseInt(hours, 10) + 12;
		}
		if (modifier === "AM" && hours === "12") {
			hours = "00";
		}
		return `${hours}:${minutes}:00`;
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const headers = { authorization: Cookies.get("token") };
		const appointmentData = {
			UserId: this.state.UserId,
			Name: this.state.Name,
			Email: this.state.Email,
			Contact: this.state.Contact,
			Age: this.state.Age,
			Day: this.state.Day,
			TimeSlot: this.convertTo24Hour(this.state.selectedTimeSlot),
			Description: this.state.Description,
			Id: this.state.Id,
		};

		if (!this.state.selectedTimeSlot) {
			alert("Please select a time slot.");
			return;
		}
		console.log(appointmentData.TimeSlot)
		axios
			.post("http://localhost:12347/bookAppointment", appointmentData, { headers })
			.then((res) => {
				alert(res.data);
			})
			.catch((error) => {
				if (error.response && error.response.status === 409) {
					alert(error.response.data.error || "Time slot unavailable. Please choose a different slot.");
				} else {
					console.error("Error booking appointment:", error);
					alert("An error occurred while booking the appointment. Please try again.");
				}
			});
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
						<NavLink active>
							<Link to="/patientLogin/bookAppointment">
								Book Appointment
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link to="/patientLogin/getPatientProfile">Edit Profile</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link to="/patientLogin/patientAppointments">View Appointments</Link>
						</NavLink>
					</NavItem>
				</Nav>
				<Row>
					<Col md="3"></Col>
					<Col md="6">
						<Form className="mt-3" onSubmit={this.handleSubmit}>
							{/* Other form fields */}
							<FormGroup>
								<Label>Name *</Label>
								<Input
									innerRef={this.inputRef}
									type="text"
									value={sessionStorage.getItem("patientName") || this.state.Name}
									onChange={(e) => this.setState({ Name: e.target.value })}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Email</Label>
								<Input
									type="email"
									value={sessionStorage.getItem("patientEmail") || this.state.Email}
									onChange={(e) => this.setState({ Email: e.target.value })}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Contact</Label>
								<Input
									type="text"
									value={sessionStorage.getItem("patientContact") || this.state.Contact}
									onChange={(e) => this.setState({ Contact: e.target.value })}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Age *</Label>
								<Input
									type="number"
									onChange={(e) => this.setState({ Age: e.target.value })}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Department *</Label>
								<Input type="select" onChange={this.handleDepartmentChange}>
									<option value="">Select a department</option>
									{this.state.departments.map((dept, index) => (
										<option key={index} value={dept.Name}>
											{dept.Name}
										</option>
									))}
								</Input>
							</FormGroup>
							{/* <FormGroup>
								<Label>Doctor *</Label>
								<Input
									type="select"
									onChange={(e) => this.setState({ Id: e.target.value })}
								>
									<option value="">Select a doctor</option>
									{this.state.doctors.map((doctor) => (
										<option key={doctor.doctor_id} value={doctor.doctor_id}>
											{doctor.Name}
										</option>
									))}
								</Input>
							</FormGroup> */}
							<FormGroup>
								<Label>Doctor *</Label>
								<Input
									type="select"
									onChange={(e) => {
										const selectedName = e.target.value;
										console.log("Selected Doctor Name:", selectedName); // Debug log

										// Find the doctor with the matching name in the state
										const selectedDoctor = this.state.doctors.find(
											(doctor) => doctor.Name === selectedName
										);
										console.log(selectedDoctor)

										if (selectedDoctor) {
											console.log("Selected Doctor ID:", selectedDoctor.Id); // Debug log
											this.setState({ Id: selectedDoctor.Id });
										} else {
											console.log("Doctor not found"); // Debug log
										}
									}}
								>
									<option value="">Select a doctor</option>
									{this.state.doctors.map((doctor) => (
										<option key={doctor.doctor_id} value={doctor.Name}>
											{doctor.Name}
										</option>
									))}
								</Input>
							</FormGroup>


							<FormGroup>
								<Label>Date *</Label>
								<Input type="date" onChange={this.handleDateChange} />
							</FormGroup>
							<FormGroup>
								<Label>Description</Label>
								<Input
									type="textarea"
									onChange={(e) => this.setState({ Description: e.target.value })}
								/>
							</FormGroup>

							<FormGroup>
								<Label>Time Slot *</Label>
								<Input
									type="select"
									onChange={this.handleTimeSlotChange}
									value={this.state.selectedTimeSlot}
								>
									<option value="">Select a time slot</option>
									{this.state.timeSlots.map((slot, index) => (
										<option key={index} value={slot}>
											{slot}
										</option>
									))}
								</Input>
							</FormGroup>
							<FormGroup>
								<Button color="primary" type="submit">
									Submit
								</Button>
							</FormGroup>
						</Form>
					</Col>
				</Row>
			</div>
		);
	}
}

export default BookAppointment;
