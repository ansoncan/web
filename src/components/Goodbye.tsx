import React, {useState} from 'react';  
  
const Goodbye = (props) => {  
  // kjeg
   const [txtColor, setTxtColor] = useState("blue");

    const changeColor = () => {
      setTxtColor("pink");
    }

    const revertColor = () => {
      setTxtColor("orange");
    }

   return (
     <>
     {/* control + / for comment*/}
    <h1 style = {{color: txtColor}}
    onMouseEnter={changeColor}
    onMouseLeave={revertColor}
    >
        Goodbye {props.name}
    </h1>
      <h1 style = {{color: 'red'}}>Goodbye {props.name}</h1>
      <h2>Current colour is: {txtColor}</h2>
     </>
   );
}  
 
export default Goodbye;
