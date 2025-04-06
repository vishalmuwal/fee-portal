let isLogged = false; // Replace this with your actual authentication logic
let isAdmin = false; // Replace this with your actual role logic

const CORS_PROXY = "https://proxy.corsfix.com/?";
const STUDENT_DATA_API = "https://api.example.com/student_data"; // Replace with your actual API endpoint

const setLogged = (value) => {
  isLogged = value;
};

const setAdmin = (value) => {
  isAdmin = value;
};

export { isLogged, isAdmin, setLogged, setAdmin, CORS_PROXY, STUDENT_DATA_API };
