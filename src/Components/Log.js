import React from 'react'
import '../App.css';

const Log= (props) =>{
    return(
   <div>
       <table style= {{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}} >
  <tr>
    <th>Reps</th>
    <th>Weight</th>
  
  </tr>
  {props.entries.map(element => ( 
  <tr>
    <td>{element.reps}</td>
    <td>{element.weight}</td>
    
  </tr>) )}

</table>
   </div>
    )
}


const tablestyle= {

  border: "1px solid black",
}

export default Log;