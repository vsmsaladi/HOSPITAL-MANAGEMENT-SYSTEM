package server

import (
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func MyRouter() {
	// Initialising Router
	router := mux.NewRouter()

	// Enabling CORS
	header := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"*"})

	// Creating the Database connection
	createConnection()

	// Get and Edit Profile End Point Handlers
	router.HandleFunc("/getProfile", IsAuthorized(GetProfileEndPoint)).Methods("POST")
	router.HandleFunc("/editProfile", IsAuthorized(EditProfileEndPoint)).Methods("POST")

	// Patient End Point Handlers
	router.HandleFunc("/getPatient", IsAuthorized(GetPatientEndPoint)).Methods("GET", "OPTIONS")
	router.HandleFunc("/deletePatient", IsAuthorized(DeletePatientEndPoints)).Methods("POST", "OPTIONS")
	router.HandleFunc("/addPatient", IsAuthorized(AddPatientEndPoint)).Methods("POST")
	router.HandleFunc("/bookAppointment", IsAuthorized(AddAppointment)).Methods("POST")
	router.HandleFunc("/patientAppointment", IsAuthorized(PatientAppointment)).Methods("POST")

	// Feedback End Point Handlers
	router.HandleFunc("/getFeedback", IsAuthorized(GetFeedbackEndPoint)).Methods("GET")

	// Doctor End Point Handlers
	router.HandleFunc("/getDoctor", IsAuthorized(GetDoctorEndPoint)).Methods("GET")
	router.HandleFunc("/deleteDoctor", DeleteDoctorEndPoint).Methods("POST", "OPTIONS")
	router.HandleFunc("/addDoctor", IsAuthorized(AddDoctorEndPoint)).Methods("POST")
	router.HandleFunc("/docAppointment", IsAuthorized(DocAppointmentEndPoint)).Methods("POST")
	router.HandleFunc("/addPrescription", IsAuthorized(GetPrescription)).Methods("POST")

	// New Routes for Dynamic Department, Doctor, and Time Slot Functionality
	router.HandleFunc("/getDoctorByDepartment", IsAuthorized(GetDoctorByDepartment)).Methods("POST", "OPTIONS")
	router.HandleFunc("/getAvailableTimeSlots", IsAuthorized(GetAvailableTimeSlots)).Methods("POST", "OPTIONS")
	router.HandleFunc("/getPrescriptions", IsAuthorized(GetPrescriptionsHandler)).Methods("POST", "OPTIONS")

	router.HandleFunc("/getDoctorDepartments", IsAuthorized(GetDoctorDepartmentsEndPoint)).Methods("GET")

	// Login End Point Handler
	router.HandleFunc("/login", LoginEndPoint).Methods("POST", "OPTIONS")

	// Department End Point Handler
	router.HandleFunc("/getDepartment", IsAuthorized(GetDepartmentEndPoint)).Methods("GET")
	router.HandleFunc("/deleteDepartment", IsAuthorized(DelteDepartmentEndPoint)).Methods("POST")
	router.HandleFunc("/addDepartment", IsAuthorized(AddDepartmentEndPoint)).Methods("POST")

	// HTTP Server
	http.ListenAndServe(":12347", handlers.CORS(header, methods, origins)(router))
}
