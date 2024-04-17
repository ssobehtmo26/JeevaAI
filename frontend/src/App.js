import React, { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import Table from "./Table";

function App() {
  const baseURL = "http://localhost:5000/api";

  const [docName, setDocName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [recordDate, setRecordDate] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!docName || !patientName || !patientAge || !recordDate || !audioFile) {
      alert("Please fill in all fields");
      return;
    }

    if (isNaN(patientAge) || parseInt(patientAge) <= 0) {
      alert("Patient age must be a positive number");
      return;
    }

    console.log(audioFile);

    axios
      .post(`${baseURL}/post`, {
        docName: docName,
        patientName: patientName,
        patientAge: patientAge,
        recordDate: recordDate,
        audioFile: audioFile.name
      },)
      .then((res) => {
        res.data.audioFile = audioFile;
        console.log(res.data);
        if (data.length === 0) setData([res.data]);
        else setData([...data, res.data]);
      })
      .catch((e) => {
        console.log(e);
      });
    setDocName("");
    setPatientAge("");
    setPatientName("");
    setRecordDate("");
    setAudioFile("");
    fileInputRef.current.value = '';
    setShowData(true);
  };

  return (
    <div className="page">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h2>Form</h2>
          <div className="form-group">
            <label htmlFor="doctorName">Doctor Name:</label>
            <input
              type="text"
              id="doctorName"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="patientName">Patient Name:</label>
            <input
              type="text"
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="patientAge">Patient Age:</label>
            <input
              type="number"
              id="patientAge"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recordingDate">Date of Sound Recording:</label>
            <input
              type="date"
              id="recordingDate"
              value={recordDate}
              onChange={(e) => setRecordDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="audioFile">Sound File:</label>
            <input
              type="file"
              id="audioFile"
              accept="audio/*"
              ref={fileInputRef}
              onChange={(e) => setAudioFile(e.target.files[0])}
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
      {showData && <Table data={data} />}
    </div>
  );
}

export default App;
