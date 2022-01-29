import React from 'react'

const Log= (props) =>{
    return(
   <div>
       <table style= {{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}} >
  <tr>
    <th>Reps</th>
    <th>Weight</th>
  
  </tr>
  {/* {props.data.map(element => ( <tr>
    <td>3</td>
    <td>4</td>
    
  </tr>) )} */}

  {/* <tr>
    <td>1</td>
    <td>2</td>
   
  </tr>
  <tr>
    <td>3</td>
    <td>4</td>
    
  </tr> */}
</table>
   </div>
    )
}


const tablestyle= {

  border: "1px solid black",
}

export default Log;