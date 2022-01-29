import React from 'react';
import Collapsible from 'react-collapsible';
import Exercise from './Exercise'
import exercises from '../Data/Data.js' 

const Workout = (props) => {
  return (
    <Collapsible trigger= {props.name} classParentString= " Hello" >
        <p style ={mystyle}> 
     {exercises.map((exercise) =>
  <Exercise exercise= {exercise}></Exercise>
  
     
        )
     }
      </p>
    </Collapsible>
  );
};

const mystyle = {
    color: "white",
    backgroundColor: "",
    padding: "15px",
    fontFamily: "Arial"
  };




export default Workout;
