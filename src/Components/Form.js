import react from 'react';


const Form = (props) =>{
    return(
        <form>
  
    Reps
    <input type="text" name="name" />
    Weight
    <input type="text" name="name" />
  

  <button type= "button" onClick = {props.onClick} >
  Log
</button> 
</form>

    )
}


export default Form;