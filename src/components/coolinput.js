import React from 'react'
import '../App.css';

function CoolInput(props) {
    
    return (
        <div class="question">
            <input onChange={props.addItem} type="text" style={{color: props.newColor}} ref={props.inputRef} required/>
            <label style={{color: props.newColor }} >Add to search list</label>
        </div>
    )
}
export default CoolInput;
