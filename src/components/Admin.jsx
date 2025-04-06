import Header from "./Header";
import { useState, useEffect } from "react";
import { STUDENT_DATA_API, CORS_PROXY } from "./utils/constants.js";
import StudentTable from "./StudentTable.jsx";
import { dummyData } from "./utils/mockData.jsx";

const Admin = () => {
  const [searchText, setSearchText] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    // Simulate fetching data
    setStudentData(dummyData);
    setFilteredData(dummyData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter the student data based on the search text
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = studentData.filter((student) =>
        student.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText, studentData]);

  return (
    <div>
      <Header />
      <div className="admin-body">
        <div className="search">
          <input
            type="text"
            placeholder="Search for students..."
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
        <StudentTable initialData={filteredData} />
      </div>
    </div>
  );
};

export default Admin;
