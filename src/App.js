import React, {useRef, useEffect, Fragment, useState} from 'react';
import './App.css';
import Pdfviewer from './components/pdfviewer';

function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState(['Contrato', 'Saldo']);
  const [colorList, setColorList] = useState([{r:255,g:0,b:0}, {r:0,g:255,b:0}]);
  let fileInput = React.createRef();
  const [DocSet, setDocSet] = useState(true);
  const [file, setFile] = useState();

  const getColorRGB = (index) => {
    return `rgb(${colorList[index].r}, ${colorList[index].g}, ${colorList[index].b}`;
  }
  const ColorGenerator = () => {
    let random = [];
    for (let i = 0; i < 3; i++) {
      random.push(Math.floor(Math.random()*256));
    }
    return random; 
  }

  const handleChange = (e) => {
    setDocSet(true);
    if(e.target.value !== "")
      setText(e.target.value);
  }

  const updateSearch = (e) => {
    setDocSet(true);
    if(text !== list[list.length-1] && text!==""){
      const newList = list.concat(text);
      const rgbArr = ColorGenerator();
      setColorList(data => [...data, {r:rgbArr[0],g:rgbArr[1], b:rgbArr[2]}])
      console.log(colorList);
      setList(newList);
    }
  }

  const updateState = () => {
    setDocSet(false);
    console.log(DocSet);
  }
  const destroy = () => {
    setDocSet(true);
  }

  const fileSelected = () => {
    console.log(fileInput.current.files[0]);
    setFile(fileInput.current.files[0])
  }

  return(    
    <div style={{ height:'100vh', display:'flex', flexDirection:'row',marginLeft:'10px'}}>
      <div  style={{height:'100vh',width:'20%', display:'flex', flexDirection:'column',marginLeft:'10px'}}>
        <label>Text to search</label>
        <input onChange={handleChange} style={{height:'30px', width:'80%'}}></input>
        <button onClick={updateSearch} style={{height:'30px', width:'50%', marginTop:'10px'}}>Add to search list</button>
        <ul>
          {list.map(function(item, key) {
            return <li key={item}><span style={{backgroundColor: getColorRGB(key)}}>{`${item}`}</span></li>;
          })}
        </ul>
        <input id="file_upload" type='file' accept='.pdf' multiple='false' onClick={destroy} onChange={fileSelected} ref={fileInput} ></input>
        <button onClick={updateState}>SEARCH</button>
      </div>
      { !DocSet &&
        <Pdfviewer file={file} searchList = {list} colorList = {colorList}></Pdfviewer> 
      }
    </div>
  );
};
export default App;
