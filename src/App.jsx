import { useState } from "react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import "./App.css";
import FormInput from "./components/FormInput";
import SuccessPage from "./components/SuccessPage";

// Country and city data
const countries = [
  { value: "india", label: "India", cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"] },
  { value: "usa", label: "USA", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"] },
  { value: "uk", label: "UK", cities: ["London", "Manchester", "Birmingham", "Liverpool", "Edinburgh"] },
];

function Form() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    countryCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    panNumber: "",
    aadharNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [cities, setCities] = useState([]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
        if (!value.trim()) error = "First name is required";
        break;
      case "lastName":
        if (!value.trim()) error = "Last name is required";
        break;
      case "username":
        if (!value.match(/^[A-Za-z0-9]{3,16}$/)) error = "Username should be 3-16 characters and shouldn't include any special character!";
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "password":
        if (!value.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/)) error = "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!";
        break;
      case "phoneNumber":
        if (!value.match(/^\d{10}$/)) error = "Please enter a valid 10-digit phone number";
        break;
      case "country":
        if (!value) error = "Please select a country";
        break;
      case "city":
        if (!value) error = "Please select a city";
        break;
      case "panNumber":
        if (!value.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) error = "Please enter a valid PAN number (e.g., ABCDE1234F)";
        break;
      case "aadharNumber":
        if (!value.match(/^\d{12}$/)) error = "Please enter a valid 12-digit Aadhar number";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.firstName.trim()) newErrors.firstName = "First name is required";
    if (!values.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!values.username.match(/^[A-Za-z0-9]{3,16}$/)) newErrors.username = "Username should be 3-16 characters and shouldn't include any special character!";
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!values.password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/)) newErrors.password = "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!";
    if (!values.phoneNumber.match(/^\d{10}$/)) newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    if (!values.country) newErrors.country = "Please select a country";
    if (!values.city) newErrors.city = "Please select a city";
    if (!values.panNumber.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) newErrors.panNumber = "Please enter a valid PAN number (e.g., ABCDE1234F)";
    if (!values.aadharNumber.match(/^\d{12}$/)) newErrors.aadharNumber = "Please enter a valid 12-digit Aadhar number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validateField(name, value);
    if (name === "country") {
      const selectedCountry = countries.find(c => c.value === value);
      setCities(selectedCountry ? selectedCountry.cities : []);
      setValues(prev => ({ ...prev, city: "" }));
    }
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      errorMessage: touched.firstName && errors.firstName,
      label: "First Name",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      errorMessage: touched.lastName && errors.lastName,
      label: "Last Name",
      required: true,
    },
    {
      id: 3,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: touched.username && errors.username,
      label: "Username",
      required: true,
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: touched.email && errors.email,
      label: "Email",
      required: true,
    },
    {
      id: 5,
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Password",
      errorMessage: touched.password && errors.password,
      label: "Password",
      required: true,
    },
  ];

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            onBlur={onBlur}
          />
        ))}
        
        <div className="formInput">
          <label>Phone Number</label>
          <div className="phone-input">
            <input
              type="text"
              name="countryCode"
              value={values.countryCode}
              onChange={onChange}
              onBlur={onBlur}
              className="country-code"
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={values.phoneNumber}
              onChange={onChange}
              onBlur={onBlur}
              className="phone-number"
            />
          </div>
          <span>{touched.phoneNumber && errors.phoneNumber}</span>
        </div>

        <div className="formInput">
          <label>Country</label>
          <select
            name="country"
            value={values.country}
            onChange={onChange}
            onBlur={onBlur}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          <span>{touched.country && errors.country}</span>
        </div>

        <div className="formInput">
          <label>City</label>
          <select
            name="city"
            value={values.city}
            onChange={onChange}
            onBlur={onBlur}
            required
            disabled={!values.country}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <span>{touched.city && errors.city}</span>
        </div>

        <div className="formInput">
          <label>PAN Number</label>
          <input
            type="text"
            name="panNumber"
            placeholder="PAN Number"
            value={values.panNumber}
            onChange={onChange}
            onBlur={onBlur}
            required
          />
          <span>{touched.panNumber && errors.panNumber}</span>
        </div>

        <div className="formInput">
          <label>Aadhar Number</label>
          <input
            type="text"
            name="aadharNumber"
            placeholder="Aadhar Number"
            value={values.aadharNumber}
            onChange={onChange}
            onBlur={onBlur}
            required
          />
          <span>{touched.aadharNumber && errors.aadharNumber}</span>
        </div>

        <div className="formInput">
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );

  function handleSubmit(e) {
    e.preventDefault();
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);
    if (validateForm()) {
      navigate("/success", { state: { formData: values } });
    }
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
