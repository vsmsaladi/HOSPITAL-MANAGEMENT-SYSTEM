import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { SocialIcon } from "react-social-icons";
function PureFooter() {
	return (
		<div className="container footer">
			<div style={{ flex: "1" }}>
				<h2>TITANS</h2>
				<ul className="list-unstyled">
					{/* <li>
						<FontAwesomeIcon icon={faPhone} />
						+91 12345678 90
					</li>
					<li>
						<a href="https://gmail.com" style={{ color: "white" }}>
							<FontAwesomeIcon icon={faEnvelope} />{" "}
							contact@global.com
						</a>
					</li> */}
					<li>
						Vishal Anton
					</li>
					<li>
						Santosh Mohan Saladi
					</li>
					<li>
						Charan Kumar Gujjalapudi
					</li>
					<li>
						Sai Teja Reddy Adapala
					</li>
					<li>
						Venkata Mahalakshmi Vishnumolakala
					</li>
					<li>
						Mounika Muddy Paka
					</li>
				</ul>
			</div>
			<div style={{ flex: "1" }}>
				<h2>SPL FINAL PROJECT</h2>
				<p>University of North Carolina at Charlotte</p>
			</div>
			
		</div>
	);
}

export default PureFooter;
