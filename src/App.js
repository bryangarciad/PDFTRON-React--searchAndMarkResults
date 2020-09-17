import React, {useRef, useState} from 'react';
import './App.css';
import Pdfviewer from './components/pdfviewer';
import SearchSettings from './components/SearchSettings';



function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState(['CONTRATO', 'SALDO']);
  const [colorList, setColorList] = useState([{r:255,g:0,b:0}, {r:0,g:255,b:0}]);
  const [color, setColor] = useState({r:0,g:0,b:0});
  const [colorHex, setColorHex] = useState({r:0,g:0,b:0});
  const [DocSet, setDocSet] = useState(true);
  const [file, setFile] = useState();
  const [files,setfiles] = useState([  ]);
  const [index, setInedx] = useState(-1);
  let fileInput = React.createRef();
  const inputRef = useRef(null); 

  const getColorRGB = (index) => {
    return `rgb(${colorList[index].r}, ${colorList[index].g}, ${colorList[index].b}`;
  }

  const handleChange = (e) => {
    setDocSet(true);
    if(e.target.value !== "")
      setText(e.target.value.toUpperCase());
  }

  const updateSearch = (e) => {
    setDocSet(true);
    if(text !== list[list.length-1] && text!==""){
      const newList = list.concat(text);
      setColorList(data => [...data, color]);
      console.log(colorList);
      setList(newList);
      inputRef.current.value = '';
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
    console.log(file);
    if(index === -1)
      setfiles(data => [...data, fileInput.current.files[0]])
  }
  const handleChangeComplete = (color) => {
    setDocSet(true);
    setColor({r:color.rgb.r,g:color.rgb.g, b:color.rgb.b});
    setColorHex(color.hex);
    console.log(color);
  }

  const setSearchFile = (e, index) =>{
    setDocSet(true);
    setInedx(index);
    setFile(files[index])
    console.log(file);
  }


  return(    
    <div className='mainWrapper'>
      <SearchSettings 
        handleChange={handleChange} 
        colorHex={colorHex} 
        inputRef={inputRef} 
        handleChangeComplete={handleChangeComplete}
        updateSearch={updateSearch}
        list={list}
        getColorRGB={getColorRGB}
        updateState = {updateState}
        destroy ={destroy}
        fileSelected ={fileSelected}
        fileInput={fileInput}
        fileList = {files}
        setSearchFile ={setSearchFile}
        index = {index}>
        
      </SearchSettings>
      { !DocSet &&
        <Pdfviewer file={file} searchList = {list} colorList = {colorList}></Pdfviewer> 
      }
    </div>
  );
};
export default App;

