import Employee from "../models/Employee.js";

export const getEmployees = async (req, res, next) => {
  try {
     const employees = await Employee.find({}); // Fetch all employees
    console.log("Employees fetched from DB:", employees); // Debugging
    return res.json(employees);
  } catch (err) {
    console.error("Error in getEmployees:", err);
    return next(err);
  }
};

export default Employee;

// (other controller functions unchanged, just exported)
