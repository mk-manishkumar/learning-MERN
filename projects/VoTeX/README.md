# 🗳️ Voting System API  

A simple voting system where users can vote for candidates. 

## 🚀 Features  
- Publicly accessible list of candidates  
- Users can vote (login required)  
- Admins can add, update, and delete candidates  
- Live vote counting  

## 🛠️ Tech Stack  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose)  
- **Authentication**: JWT (JSON Web Token)  

## 🔧 Setup  
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-repo/voting-system.git
   cd voting-system
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Set up environment variables (`.env` file):  
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:  
   ```bash
   npm start
   ```
   
## 📌 API Routes  

### **Public Routes**  
- `GET /candidates` → List all candidates  

### **User Routes (Login Required)**  
- `POST /vote/:candidateID` → Vote for a candidate  

### **Admin Routes (Admin Login Required)**  
- `POST /candidates` → Add a candidate  
- `PUT /candidates/:candidateID` → Update a candidate  
- `DELETE /candidates/:candidateID` → Remove a candidate  

