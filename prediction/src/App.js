import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  const initialFormData = {
    Area: 0,
    BHK: 0,
    Bathroom: 0,
    Furnishing: '',
    Locality: '',
    Parking: '',
    Status: '',
    Transaction: '',
    Type: '',
    Area_Yards: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Update the state for the 'Locality' dropdown
  const handleLocalityChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, Locality: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    for (const key in formData) {
      if (formData[key] === 0 || formData[key] === '') {
        setError(`Please fill in all fields`);
        return;
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(response.data.prediction);
      setError(null);
    } catch (error) {
      console.error('Error predicting price:', error.message);
      setError('Error predicting price. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>House Price Prediction Project</h1>
      <h3>By: Oussama Badreddine and Othmane taoussi</h3>
      <h3>Encadrement by: khray</h3>

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Area of the house in square feet:
            <input type="number" name="Area" value={formData.Area} onChange={handleChange} />
          </label>
          <br />

          <label>
            Number of bedrooms:
            <input type="number" name="BHK" value={formData.BHK} onChange={handleChange} />
          </label>
          <br />

          <label>
            Number of bathrooms:
            <input type="number" name="Bathroom" value={formData.Bathroom} onChange={handleChange} />
          </label>
          <br />

          <label>
            Furnishing:
            <select name="Furnishing" value={formData.Furnishing} onChange={handleChange}>
              <option value="SF">Semi-Furnished</option>
              <option value="F">Furnished</option>
              <option value="UF">Unfurnished</option>
            </select>
          </label>
          <br />

          <label>
            Locality:
            <select name="Locality" value={formData.Locality} onChange={handleLocalityChange}>
              <option value="rohini">Rohini</option>
              <option value="dwarka">Dwarka</option>
              <option value="shahdara">Shahdara</option>
              {/* Add other options as needed */}
            </select>
          </label>
          <br />

          <label>
            Number of parking available:
            <input type="text" name="Parking" value={formData.Parking} onChange={handleChange} />
          </label>
          <br />

          <label>
            Status:
            <select name="Status" value={formData.Status} onChange={handleChange}>
              <option value="true">Ready to move</option>
              <option value="false">Still under construction</option>
            </select>
          </label>
          <br />

          <label>
            Transaction:
            <select name="Transaction" value={formData.Transaction} onChange={handleChange}>
              <option value="Resale">Resale</option>
              <option value="New_Property">New Property</option>
            </select>
          </label>
          <br />

          <label>
            Type of House:
            <select name="Type" value={formData.Type} onChange={handleChange}>
              <option value="builder Floor">Builder Floor</option>
              <option value="Apartment">Apartment</option>
            </select>
          </label>
          <br />

          <label>
            Area_Yards:
            <input type="number" name="Area_Yards" value={formData.Area_Yards} onChange={handleChange} />
          </label>
          <br />

          <button type="submit">Predict Price</button>
        </form>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {prediction !== null && (
        <div>
          <h2>Predicted Price:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;
