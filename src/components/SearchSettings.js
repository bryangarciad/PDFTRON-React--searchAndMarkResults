import React from 'react'
import '../App.css';
import CoolInput from './coolinput'
import { CirclePicker  } from 'react-color';
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function SearchSettings(props) {

    return (
        <div className='SearchSettings'>
            <CoolInput addItem={props.handleChange} newColor={props.colorHex} inputRef={props.inputRef}></CoolInput>
            <h1 style={{color:"black", width: '100%',marginLeft:'0%', textAlign:'center', marginTop:'0px', marginBottom:'10px'}}>Select color</h1>
            <CirclePicker onChangeComplete={props.handleChangeComplete}></CirclePicker >
            <button className='roundedBtn' onClick={props.updateSearch} style={{backgroundColor: props.colorHex}}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
            <ul>
                {props.list.map(function(item, key) {
                    return <li key={item} style={{backgroundColor: props.getColorRGB(key)}}><span>{`${item}`}</span></li>;
                })}
            </ul>
            <button className='roundedBtn' onClick={props.updateState} style={{backgroundColor: props.colorHex}}><FontAwesomeIcon icon={faSearch} /></button>
            <label className='inputLabel' style={{backgroundColor: props.colorHex}}>Select File
                <input id="file_upload" type='file' accept='.pdf' multiple='false' onClick={props.destroy} onChange={props.fileSelected} ref={props.fileInput} ></input>
            </label>
        </div>
    )
}

export default SearchSettings
