import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [developers] = useState([
    { id: 1, name: "ABHISHEK", degree: "M.TECH", profession: "SAP CONSULTANT" },
    { id: 2, name: "RITESH", degree: "M.TECH", profession: "STORAGE ADMINISTRATOR" },
    { id: 3, name: "ANUBHAW", degree: "M.TECH", profession: "SAP PM" },
    { id: 4, name: "SUMAN", degree: "M.TECH", profession: "MULESOFT DEVELOPER" },
    { id: 5, name: "MANISH", degree: "BCA", profession: "SOFTWARE ENGINEER" },
    { id: 6, name: "RAVI", degree: "BCA", profession: "SALES MAN" },
    { id: 7, name: "RAHUL", degree: "B.TECH", profession: "BLOCKCHAIN ENGINEER" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDevelopers, setFilteredDevelopers] = useState(developers);

  useEffect(() => {
    const results = developers.filter((dev) => Object.values(dev).some((val) => val.toString().toUpperCase().includes(searchTerm.toUpperCase())));
    setFilteredDevelopers(results);
  }, [searchTerm, developers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-500 py-5">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-3xl font-bold text-white">Developer List</h1>
          <div className="flex justify-center mt-4">
            <input type="search" placeholder="Search by names, degrees or professions..." className="w-full md:w-96 px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={handleSearch} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-3 px-4 bg-gray-100 text-left font-medium text-gray-700">SR NO.</th>
                <th className="py-3 px-4 bg-gray-100 text-left font-medium text-gray-700">NAME</th>
                <th className="py-3 px-4 bg-gray-100 text-left font-medium text-gray-700">DEGREE</th>
                <th className="py-3 px-4 bg-gray-100 text-left font-medium text-gray-700">PROFESSION</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevelopers.length > 0 ? (
                filteredDevelopers.map((developer) => (
                  <tr key={developer.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">{developer.id}</td>
                    <td className="py-3 px-4 border-b">{developer.name}</td>
                    <td className="py-3 px-4 border-b">{developer.degree}</td>
                    <td className="py-3 px-4 border-b">{developer.profession}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
