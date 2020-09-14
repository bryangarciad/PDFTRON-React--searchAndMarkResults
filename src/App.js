import React, {useRef, useEffect, Fragment, useState} from 'react';
import './App.css';
import Pdfviewer from './components/pdfviewer';

function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState(['Contrato', 'Saldo']);
  let fileInput = React.createRef();
  const [DocSet, setDocSet] = useState(true);
  const [file, setFile] = useState();

  const handleChange = (e) => {
    if(e.target.value !== "")
      setText(e.target.value);
  }

  const updateSearch = (e) => {
    if(text !== list[list.length-1] && text!==""){
      const newList = list.concat(text);
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
    <Fragment>
      <div style={{ height:'100vh', display:'flex', flexDirection:'row',marginLeft:'10px'}}>
        <div  style={{height:'100vh',width:'20%', display:'flex', flexDirection:'column',marginLeft:'10px'}}>
          <label>Text to search</label>
          <input onChange={handleChange} style={{height:'30px', width:'80%'}}></input>
          <button onClick={updateSearch} style={{height:'30px', width:'50%', marginTop:'10px'}}>Add to search list</button>
          <ul>
            {list.map(function(item) {
              return <li key={item}>{`${item.toString()}`}</li>;
            })}
          </ul>
          <input id="file_upload" type='file' accept='.pdf' multiple='false' onClick={destroy} onChange={fileSelected} ref={fileInput} ></input>
          <button onClick={updateState}>SEARCH</button>
        </div>
        { !DocSet &&
          <Pdfviewer file={file} searchList = {list}></Pdfviewer> 
        }
      </div>
    </Fragment>
  );
};
export default App;
