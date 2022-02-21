import React from "react";
import Table from "react-bootstrap/Table";

const MyselfLog = (props) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Weight</th>
          <th>Body Fat%</th>
        </tr>
      </thead>
      <tbody>
        {props.entries.map((element) => (
          <tr key={element.date}>
            <td>{element.date}</td>
            <td>{element.weight}</td>
            <td>{element.bodyFat}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MyselfLog;
