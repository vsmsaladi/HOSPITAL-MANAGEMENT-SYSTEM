package server

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
)

type appointment struct {
	UserId       string
	Name         string
	Description  string
	Day          string
	Contact      string
	Apid         int
	Prescription string
	Id           string
	Email        string
	Age          string
	TimeSlot     string
}

// UnavailableSlotsRequest represents the request body
type UnavailableSlotsRequest struct {
	DoctorID string `json:"doctorId"`
	Date     string `json:"date"` // Format: YYYY-MM-DD
}

// UnavailableSlotsResponse represents the response body
type UnavailableSlotsResponse struct {
	UnavailableSlots []string `json:"unavailableSlots"`
}

func AddAppointment(w http.ResponseWriter, req *http.Request) {
	var temp appointment
	err := json.NewDecoder(req.Body).Decode(&temp)

	if err == nil {
		// Check if the time slot is already booked
		checkQuery := `SELECT COUNT(*) FROM appointment WHERE id = ? AND day = ? AND Time = ?`
		var count int
		err = db.QueryRow(checkQuery, temp.Id, temp.Day, temp.TimeSlot).Scan(&count)
		if err != nil {
			http.Error(w, "Database query error", http.StatusInternalServerError)
			return
		}
		if count > 0 {
			http.Error(w, "Time slot already booked", http.StatusConflict)
			return
		}

		rows, err := db.Query(
			"INSERT INTO appointment (UserId, Name, Email, Contact, Age, Day, Time, Description, Id, Prescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			temp.UserId, temp.Name, temp.Email, temp.Contact, temp.Age, temp.Day, temp.TimeSlot, temp.Description, temp.Id, nil,
		)

		if err == nil {
			_ = rows
			fmt.Fprintf(w, "Success")
		} else {
			fmt.Println(err)
			fmt.Fprintf(w, "Failed")
		}
	}
}

func GetAvailableTimeSlots(w http.ResponseWriter, req *http.Request) {
	var request struct {
		DoctorId string `json:"doctorId"`
		Date     string `json:"date"`
		UserId   string `json:"userId"`
	}
	fmt.Printf("Received payload: %+v\n", request)

	json.NewDecoder(req.Body).Decode(&request)

	// Query to get booked time slots for the doctor on the selected date
	rows, err := db.Query("SELECT time_slot, user_id FROM appointment WHERE doctor_id = ? AND date = ?", request.DoctorId, request.Date)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	// Collect booked slots and check if booked by the current user
	bookedSlots := make(map[string]bool)
	bookedByUser := make(map[string]bool)
	for rows.Next() {
		var slot, userId string
		rows.Scan(&slot, &userId)
		bookedSlots[slot] = true
		if userId == request.UserId {
			bookedByUser[slot] = true
		}
	}

	// Define all possible time slots (30-min intervals)
	allSlots := []string{
		"09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
		"12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
		"15:00", "15:30", "16:00",
	}

	// Prepare the response by marking slots as disabled and if booked by the user
	var response []map[string]interface{}
	for _, slot := range allSlots {
		response = append(response, map[string]interface{}{
			"time":         slot,
			"disabled":     bookedSlots[slot],
			"bookedByUser": bookedByUser[slot], // Include if the user has booked this slot
		})
	}

	// Encode the response as JSON
	json.NewEncoder(w).Encode(response)
}

//	func PatientAppointment(w http.ResponseWriter, req *http.Request) {
//		var temp appointment
//		var res = []appointment{}
//		err := json.NewDecoder(req.Body).Decode(&temp)
//		if err == nil {
//			rows, er := db.Query("select name,prescription,email,apid from appointment where UserId='" + temp.UserId + "'")
//			if er == nil {
//				var k appointment
//				for rows.Next() {
//					rows.Scan(&k.Name, &k.Prescription, &k.Email, &k.Apid)
//					res = append(res, k)
//				}
//				json.NewEncoder(w).Encode(res)
//			} else {
//				fmt.Fprintf(w, "Failed")
//			}
//		}
//	}
func PatientAppointment(w http.ResponseWriter, req *http.Request) {
	var temp appointment
	var res = []appointment{}
	err := json.NewDecoder(req.Body).Decode(&temp)
	if err == nil {
		rows, er := db.Query("SELECT name, prescription, email, apid FROM appointment WHERE UserId='" + temp.UserId + "'")
		if er == nil {
			var k appointment
			for rows.Next() {
				var prescription sql.NullString // Use sql.NullString for handling NULL values
				err := rows.Scan(&k.Name, &prescription, &k.Email, &k.Apid)
				if err != nil {
					fmt.Println("Error scanning row:", err)
					continue
				}

				// Set the prescription value, handling the NULL case
				if prescription.Valid {
					k.Prescription = prescription.String
				} else {
					k.Prescription = "" // Set to empty string if NULL
				}

				res = append(res, k)
			}

			// Send the response back to the client
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(res)
		} else {
			fmt.Println("Error querying database:", er)
			http.Error(w, "Failed to fetch data", http.StatusInternalServerError)
		}
	} else {
		fmt.Println("Error decoding request body:", err)
		http.Error(w, "Invalid request", http.StatusBadRequest)
	}
}
