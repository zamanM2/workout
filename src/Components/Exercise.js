import React, {useState} from "react"
import Form from './Form'
import Log from './Log'


const Exercise = (props) => {

    const [amount, setAmountAndReps] = useState([
        

    ])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target[0].value)
        setAmountAndReps([...amount, 
        {
        reps:event.target[0].value,
        sets:event.target[1].value}])
      }

    return(
    
        <div> {props.exercise.exercise} 
        <div style= {mystyle}> 
     <Form onClick = {handleSubmit}/>
     
  
        <Log/>
     
     
         </div>
    </div>
   
    )
}



const mystyle = {
 padding: "15px",
   
  };


export default Exercise;