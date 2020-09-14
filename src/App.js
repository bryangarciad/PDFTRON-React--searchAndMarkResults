import React, {useRef, useEffect, Fragment, useState} from 'react';
import './App.css';
import WebViewer, { PDFNet } from '@pdftron/webviewer';
import Pdfviewer from './components/pdfviewer';

function App() {
  const viewer = useRef(null);
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

    // const webviewinstance = new WebViewer(
    //   {
    //     path: '/webviewer/lib',
    //     initialDoc: '/files/PDFTRON_about.pdf',
    //   },
    //   viewer.current,
    //   ).then((instance) => {
    //     const { annotManager, docViewer, Annotations } = instance;
    //     instance.loadDocument(fileInput.current.files[0], { filename: fileInput.current.files[0].name });

    //     const searchListener = (searchPattern, options, results) => {
    //       // add redaction annotation for each search result
    //       const newAnnotations = results.map(result => {
    //         //Rectangle annotation
    //         const rectangleAnnot = new Annotations.RectangleAnnotation();
    //         rectangleAnnot.PageNumber = result.pageNum;

    //         rectangleAnnot.X = result.quads[0].Sx-2;
    //         rectangleAnnot.Y = result.quads[0].Tx-2;
    //         rectangleAnnot.Width = result.quads[0].Rx- result.quads[0].Sx+5;
    //         rectangleAnnot.Height = result.quads[0].ca- result.quads[0].Tx+5;;
    //         rectangleAnnot.Author = annotManager.getCurrentUser();
    //         rectangleAnnot.StrokeColor = 

    //         console.log(result.quads);

    //         return rectangleAnnot;
    //       });
      
    //       annotManager.addAnnotations(newAnnotations);
    //       annotManager.drawAnnotationsFromList(newAnnotations);
    //     };
        
    //     docViewer.on('documentLoaded', async () => {
    //       let searchPattern= "";
    //         searchPattern += list.join('|');
    //       // searchPattern can be something like "search*m" with "wildcard" option set to true
    //       // searchPattern can be something like "search1|search2" with "regex" option set to true
      
    //       // options default values are false
    //       const searchOptions = {
    //         caseSensitive: false,  // match case
    //         wholeWord: true,      // match whole words only
    //         wildcard: false,      // allow using '*' as a wildcard value
    //         regex: true,         // string is treated as a regular expression
    //         searchUp: false,      // search from the end of the document upwards
    //         ambientString: true,  // return ambient string as part of the result
    //       };
      
    //       instance.addSearchListener(searchListener);
    //       // start search after document loads
    //          instance.searchTextFull(searchPattern, searchOptions);
    //     });
    // });
    
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
