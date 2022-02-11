import React from "react";

const HistoryLog = (props)=>{
    return(
    <div className="repweight">
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th>Reps</th>
            <th>Weight</th>
          </tr>
          {props.history.map((_element) => {
            let keys = Object.keys(_element)
            keys.forEach((index)=>{
                if(index != "id" ){
                    return (
                    <tr>
                        <td style={tableStyle}>{index.reps}</td>
                        <td style={tableStyle}>{index.weight}</td>
                    </tr>
                    ) 
                }
            })
          })}
        </tbody>
      </table>
    </div>
    )
}

const tableStyle = {
  borderWidth: "1px",
  borderColor: "black",
  borderStyle: "solid",
};

export default HistoryLog;