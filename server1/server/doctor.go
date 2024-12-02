package server

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

type doctor struct {
	Id         string
	Name       string
	Email      string
	Password   string
	Address    string
	Phone      string
	Department string
}

var doc []doctor

type department struct {
	Name string `json:"Name"`
}

type prescription struct {
	PrescriptionID   int    `json:"prescription_id"`
	Apid             int    `json:"apid"`
	Prescription     string `json:"prescription_text"`
	PrescriptionDate string `json:"prescription_date"`
	DoctorID         int    `json:"doctor_id"`
}

// Existing code for endpoints (GetDoctorEndPoint, GetDoctorByDepartment, etc.)

func GetDoctorEndPoint(w http.ResponseWriter, req *http.Request) {
	rows, er := db.Query("SELECT doctor_id,doctor_name,department,email FROM `doctor`")
	doc := []doctor{}
	if er == nil {

		var temp doctor
		for rows.Next() {
			rows.Scan(&temp.Id, &temp.Name, &temp.Department, &temp.Email)

			doc = append(doc, temp)
		}
	}
	json.NewEncoder(w).Encode(doc)
}

func GetDoctorByDepartment(w http.ResponseWriter, req *http.Request) {
	// Read the raw body for debugging
	body, err := io.ReadAll(req.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusInternalServerError)
		return
	}
	defer req.Body.Close()
	fmt.Printf("Raw request body: %s\n", string(body))

	// Re-open the body for decoding
	req.Body = io.NopCloser(bytes.NewBuffer(body))

	var department struct {
		Department string `json:"department"`
	}
	err = json.NewDecoder(req.Body).Decode(&department)
	if err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	fmt.Printf("department: %s\n", department.Department)

	rows, err := db.Query("SELECT doctor_id, doctor_name FROM doctor WHERE department = ?", department.Department)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var doctors []doctor
	for rows.Next() {
		var doc doctor
		rows.Scan(&doc.Id, &doc.Name)
		doctors = append(doctors, doc)
	}

	json.NewEncoder(w).Encode(doctors)
}

func GetDoctorDepartmentsEndPoint(w http.ResponseWriter, req *http.Request) {
	rows, err := db.Query("SELECT DISTINCT department FROM doctor")
	if err != nil {
		fmt.Println("Error fetching doctor departments:", err)
		http.Error(w, "Failed to fetch departments", http.StatusInternalServerError)
		return
	}

	var departments []department
	for rows.Next() {
		var dept department
		if err := rows.Scan(&dept.Name); err != nil {
			fmt.Println("Error scanning department row:", err)
			http.Error(w, "Error processing data", http.StatusInternalServerError)
			return
		}
		departments = append(departments, dept)
	}

	if err := json.NewEncoder(w).Encode(departments); err != nil {
		fmt.Println("Error encoding departments:", err)
		http.Error(w, "Error returning data", http.StatusInternalServerError)
	}
}

func DeleteDoctorEndPoint(w http.ResponseWriter, req *http.Request) {
	var p doctor
	err := json.NewDecoder(req.Body).Decode(&p)
	fmt.Println("Received Doctor ID to delete:", p.Id)

	if err != nil {
		http.Error(w, "Invalid request body: "+err.Error(), http.StatusBadRequest)
		return
	}

	result, execErr := db.Exec("DELETE FROM doctor WHERE doctor_id = ?", p.Id)
	if execErr != nil {
		http.Error(w, "Database execution error: "+execErr.Error(), http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "No doctor found with the given ID", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Doctor successfully deleted")
}

func AddDoctorEndPoint(w http.ResponseWriter, req *http.Request) {
	var k doctor

	err := json.NewDecoder(req.Body).Decode(&k)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if k.Name != "" && k.Email != "" && k.Password != "" {
		if isValid(k.Password) {
			rows, err := db.Query("INSERT INTO `doctor`(`doctor_name`, `email`, `password`, `address`, `phone`, `department`) VALUES('" + k.Name + "','" + k.Email + "','" + k.Password + "','" + k.Address + "','" + k.Phone + "','" + k.Department + "')")
			if err != nil {
				_ = rows
				fmt.Println(err)
				var reserr Error
				reserr = SetError(reserr, "Doctor Not Added")
				json.NewEncoder(w).Encode(reserr)
				return
			} else {
				fmt.Fprintf(w, "Success")
			}
		} else {
			var reserr Error
			reserr = SetError(reserr, "Password Doesnot Follow The Constraints")
			json.NewEncoder(w).Encode(reserr)
			return
		}
	} else {
		var reserr Error
		reserr = SetError(reserr, "Mandatory Field Cannot be empty")
		json.NewEncoder(w).Encode(reserr)
		return
	}
}
func DocAppointmentEndPoint(w http.ResponseWriter, req *http.Request) {
	var app []appointment
	var k doctor
	err := json.NewDecoder(req.Body).Decode(&k)
	fmt.Println("Received doctor data:", k) // Print the received doctor data for debugging

	if err == nil {
		rows, er := db.Query("SELECT name, description, day, contact, apid FROM appointment a, doctor d WHERE a.id = d.doctor_id AND d.doctor_id = '" + k.Id + "'")
		if er == nil {
			var temp appointment
			for rows.Next() {
				err := rows.Scan(&temp.Name, &temp.Description, &temp.Day, &temp.Contact, &temp.Apid)
				if err != nil {
					fmt.Println("Error scanning row:", err) // Print any scan errors
					continue
				}
				fmt.Println("Appointment data:", temp) // Print each appointment record
				app = append(app, temp)
			}
		} else {
			fmt.Println("Error executing query:", er) // Print any query errors
		}
	} else {
		var reserr Error
		reserr = SetError(reserr, "Failed To Fetch Appointments")
		json.NewEncoder(w).Encode(reserr)
		return
	}

	// Print the final result before encoding to JSON
	fmt.Println("Final list of appointments:", app)
	json.NewEncoder(w).Encode(app)
}

func GetPrescription(w http.ResponseWriter, req *http.Request) {
	var temp appointment
	err := json.NewDecoder(req.Body).Decode(&temp)
	if err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	// Use parameterized query for safety
	_, err = db.Exec("UPDATE appointment SET prescription = ? WHERE apid = ?", temp.Prescription, temp.Apid)
	if err != nil {
		fmt.Fprintf(w, "Failed to update appointment table")
		fmt.Println("Error updating appointment table:", err)
		return
	}

	// Retrieve the appointment date from the appointment table
	var appointmentDate string
	var doctorId string
	err = db.QueryRow("SELECT day, Id FROM appointment WHERE apid = ?", temp.Apid).Scan(&appointmentDate, &doctorId)
	if err != nil {
		fmt.Fprintf(w, "Failed to retrieve appointment date")
		fmt.Println("Error retrieving appointment date:", err)
		return
	}

	// Insert into the prescription table with the retrieved appointment date
	_, err = db.Exec("INSERT INTO prescriptions (apid, prescription_text, prescription_date, doctor_id) VALUES (?, ?, ?, ?) ",
		temp.Apid, temp.Prescription, time.Now().Format("2006-01-02"), doctorId)
	if err != nil {
		fmt.Fprintf(w, "Failed to insert into prescription table")
		fmt.Println("Error inserting into prescription table:", err)
		return
	}

	fmt.Fprintf(w, "Success")
}

func GetPrescriptionsHandler(w http.ResponseWriter, req *http.Request) {
	var temp struct {
		Apid int `json:"apid"`
	}
	err := json.NewDecoder(req.Body).Decode(&temp)
	if err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	fmt.Printf("Apid: %d\n", temp.Apid)

	rows, err := db.Query("SELECT prescription_id, prescription_text, prescription_date FROM prescriptions WHERE apid = ?", temp.Apid)
	if err != nil {
		http.Error(w, "Failed to fetch prescriptions", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var prescriptions []prescription
	for rows.Next() {
		var pres prescription
		if err := rows.Scan(&pres.PrescriptionID, &pres.Prescription, &pres.PrescriptionDate); err != nil {
			fmt.Println("Error scanning row:", err)
			http.Error(w, "Error processing data", http.StatusInternalServerError)
			return
		}
		prescriptions = append(prescriptions, pres)
	}

	if err := json.NewEncoder(w).Encode(prescriptions); err != nil {
		fmt.Println("Error encoding prescriptions:", err)
		http.Error(w, "Error returning data", http.StatusInternalServerError)
	}
}
