import { Link } from "react-router-dom";
import { Nav, Navbar, NavbarText, NavItem } from "reactstrap";
import logo from "../assets/titans_hospitals.webp"; // import the logo image

export default function LoginNav({ msg }) {
	return (
		<Navbar style={{ backgroundColor: "#242526" }} expand="md">
			<Nav className="mr-auto" navbar>

				<NavItem
					style={{
						color: "white",
						padding: "20px",
						fontSize: "20px",
					}}
				>
					<Link
						style={{ textDecoration: "none", color: "white" }}
						to="/"
					>
						<img
							src={logo}
							alt="Logo"
							style={{
								width: "50px", // adjust the size as needed
								height: "50px", // adjust the size as needed
								marginRight: "10px",
							}}
						/>
						Home
					</Link>
				</NavItem>
			</Nav>

			{msg ? (
				<></>
			) : (
				<NavbarText>
					<Link to="/signUp" style={{ color: "white" }}>
						New User? SignUp!!
					</Link>
				</NavbarText>
			)}
		</Navbar>
	);
}
