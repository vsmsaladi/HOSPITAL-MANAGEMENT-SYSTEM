import React from "react";
import { Form, FormGroup, Row, Col, Label, Input, Button } from "reactstrap";
class LogIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
		};
		this.inputRef = React.createRef();
	}
	onTrigger = (event) => {
		this.props.fun(this.state.email, this.state.password);
		event.preventDefault();
	};
	componentDidMount() {
		this.inputRef.current.focus();
	}
	render() {
		return (
			// <div >
			// 	<FormGroup>
			// 		<Row>
			// 			<Col sm="0" md="2"></Col>
			// 			<Col sm="12" md="10">
			// 				<h1 style={{ fontFamily: "cursive" }}>Login</h1>
			// 			</Col>
			// 			<Col md="2">
			// 				<Label>Email</Label>
			// 			</Col>
			// 			<Col md="10">
			// 				<Input
			// 					innerRef={this.inputRef}
			// 					type="email"
			// 					onChange={(e) =>
			// 						this.setState({ email: e.target.value })
			// 					}
			// 				/>
			// 			</Col>
			// 		</Row>
			// 	</FormGroup>
			// 	<FormGroup>
			// 		<Row>
			// 			<Col md="2">
			// 				<Label>Password</Label>
			// 			</Col>
			// 			<Col md="10">
			// 				<Input
			// 					type="password"
			// 					onChange={(e) =>
			// 						this.setState({ password: e.target.value })
			// 					}
			// 				/>
			// 			</Col>
			// 		</Row>
			// 	</FormGroup>
			// 	<FormGroup>
			// 		<Row>
			// 			<Col md="2"></Col>
			// 			<Col md="10">
			// 				<Button
			// 					style={{ backgroundColor: "#343a40" }}
			// 					onClick={(e) => this.onTrigger(e)}
			// 				>
			// 					Log In
			// 				</Button>
			// 			</Col>
			// 		</Row>
			// 	</FormGroup>
			// </div>
			<div className="login-container">
				<div className="login-form">
					<FormGroup>
						<Row>
							<Col sm="12">
								<h1 style={{ fontFamily: "cursive", textAlign: "center" }}>Login</h1>
							</Col>
						</Row>
						<Row>
							<Col md="12">
								<Label>Email</Label>
								<Input
									innerRef={this.inputRef}
									type="email"
									onChange={(e) => this.setState({ email: e.target.value })}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col md="12">
								<Label>Password</Label>
								<Input
									type="password"
									onChange={(e) => this.setState({ password: e.target.value })}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col md="12" style={{ textAlign: "center" }}>
								<Button
									style={{ backgroundColor: "#343a40" }}
									onClick={(e) => this.onTrigger(e)}
								>
									Log In
								</Button>
							</Col>
						</Row>
					</FormGroup>
				</div>
			</div>

		);
	}
}
export default LogIn;
