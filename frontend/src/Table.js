import React from 'react';
import './Table.css';

const Table = ({ data }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Document Name</th>
            <th>Patient Name</th>
            <th>Patient Age</th>
            <th>Record Date</th>
            <th>Audio File</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.docName}</td>
              <td>{item.patientName}</td>
              <td>{item.patientAge}</td>
              <td>{item.recordDate}</td>
              <td><audio controls src={URL.createObjectURL(item.audioFile)} type={item.audioFile.type}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
