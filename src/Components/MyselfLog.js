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
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default MyselfLog;
