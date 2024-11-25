package server

import (
	"encoding/json"
	"fmt"
	"net/http"
)
type Auth struct{
	Email string 
	Password string
	Role string
}
type User struct{
	User_id string
	Name string
}
type Token struct {
	Role        string `json:"role"`
	Email       string `json:"email"`
	TokenString string `json:"token"`
}

type Error struct {
	IsError bool   `json:"isError"`
	Message string `json:"message"`
}

// func LoginEndPoint(w http.ResponseWriter, req *http.Request) {
//     var p Auth
//     var temp User
//     var auth bool

//     err := json.NewDecoder(req.Body).Decode(&p)
//     if err != nil {
//         http.Error(w, err.Error(), http.StatusBadRequest)
//         return
//     }
//     fmt.Println("P:", p)

//     // Securely construct the SQL query
//     query := fmt.Sprintf("SELECT %s_id, %s_name FROM %s WHERE email = ? AND password = ?", p.Role, p.Role, p.Role)
//     rows, er := db.Query(query, p.Email, p.Password)
//     if er != nil {
//         fmt.Println("Database query error:", er)
//         http.Error(w, "Internal server error", http.StatusInternalServerError)
//         return
//     }
//     defer rows.Close()
// 	fmt.Println("rows:", rows)

	
//     // Check if rows exist
//     if !rows.Next() {
//         var err Error
//         err = SetError(err, "Username or Password is incorrect")
//         w.Header().Set("Content-Type", "application/json")
//         json.NewEncoder(w).Encode(err)
//         return
//     }

//     // Scan the row data
//     if err := rows.Scan(&temp.User_id, &temp.Name); err != nil {
//         fmt.Println("Error scanning row:", err)
//         http.Error(w, "Internal server error", http.StatusInternalServerError)
//         return
//     }

//     auth = true
//     fmt.Println("Temp:", temp)

//     // Check if the temp.Name is populated
//     if temp.Name == "" {
//         var err Error
//         err = SetError(err, "Username or Password is incorrect")
//         w.Header().Set("Content-Type", "application/json")
//         json.NewEncoder(w).Encode(err)
//         return
//     }

//     validToken, err := GenerateJWT(temp.Name, temp.User_id, p.Role, auth)
//     if err != nil {
//         http.Error(w, "Internal server error", http.StatusInternalServerError)
//         return
//     }

//     var token Token
//     token.Email = p.Email
//     token.TokenString = validToken
//     w.Header().Set("Content-Type", "application/json")
//     json.NewEncoder(w).Encode(token)
// }

func LoginEndPoint(w http.ResponseWriter, req *http.Request){
	var p Auth
	var temp User;
	var auth bool;
    err := json.NewDecoder(req.Body).Decode(&p)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
	fmt.Println("P:", p)
	rows,er:=db.Query("SELECT "+p.Role+"_id,"+p.Role+"_name FROM "+p.Role+" where email=\""+p.Email+"\" and password=\""+p.Password+"\"");

	if(er!=nil){
		fmt.Println(er);
		auth=false;
	}else{
		
		for rows.Next(){
		rows.Scan(&temp.User_id,&temp.Name);
		}
		auth=true;
		
	}
	fmt.Println("rows:", rows)
	fmt.Println("temp:", temp)
	if(temp.Name==""){
		var err Error
		err = SetError(err, "Username or Password is incorrect")
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(err)
		return
	}
	validToken, err := GenerateJWT(temp.Name,temp.User_id,p.Role,auth);
  
	if err != nil {
	
		return
	}
	var token Token
	token.Email = p.Email;
	token.TokenString = validToken
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(token)
}



