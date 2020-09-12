import React, {useRef, useEffect, Fragment, useState} from 'react';
import './App.css';
import WebViewer, { PDFNet } from '@pdftron/webviewer';

function App() {
  const viewer = useRef(null);
  const [text, setText] = useState("Overview");
  const [list, setList] = useState(['Contrato', 'Saldo']);
  let fileInput = React.createRef();

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const updateSearch = (e) => {
    const newList = list.concat(text);
    setList(newList);
  }

const fileSelected = () => {
    const webviewinstance = new WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/PDFTRON_about.pdf',
      },
      viewer.current,
      ).then((instance) => {
        const { annotManager, docViewer, Annotations } = instance;
        instance.loadDocument(fileInput.current.files[0], { filename: fileInput.current.files[0].name });

        const searchListener = (searchPattern, options, results) => {
          // add redaction annotation for each search result
          const newAnnotations = results.map(result => {
            //Rectangle annotation
            const rectangleAnnot = new Annotations.RectangleAnnotation();
            rectangleAnnot.PageNumber = result.pageNum;
            rectangleAnnot.X = result.quads[0].Sx;
            rectangleAnnot.Y = result.quads[0].Tx;
            rectangleAnnot.Width = 100;
            rectangleAnnot.Height = 20;
            rectangleAnnot.Author = annotManager.getCurrentUser();

            //redaction annotation
            const annotation = new Annotations.RedactionAnnotation();
            annotation.PageNumber = result.pageNum;
            annotation.Quads = result.quads;
            annotation.StrokeColor = new Annotations.Color(136, 39, 31);
            console.log(result.Quads);
            console.log(result.quads);
            return rectangleAnnot;
          });
      
          annotManager.addAnnotations(newAnnotations);
          annotManager.drawAnnotationsFromList(newAnnotations);
        };


        

        docViewer.on('documentLoaded', async () => {
          let searchPattern= "";
            searchPattern += list.join('|');
          // searchPattern can be something like "search*m" with "wildcard" option set to true
          // searchPattern can be something like "search1|search2" with "regex" option set to true
      
          // options default values are false
          const searchOptions = {
            caseSensitive: false,  // match case
            wholeWord: true,      // match whole words only
            wildcard: false,      // allow using '*' as a wildcard value
            regex: true,         // string is treated as a regular expression
            searchUp: false,      // search from the end of the document upwards
            ambientString: true,  // return ambient string as part of the result
          };
      
          instance.addSearchListener(searchListener);
          // start search after document loads
             instance.searchTextFull(searchPattern, searchOptions);
          
        });
    });
}
  const Complete = () => {

  }

  useEffect(() => {


  }, []);

  return(    
    <Fragment>
      <div>
        <input onChange={handleChange}></input>
        <button onClick={updateSearch}>update search</button>
        <button onClick={Complete}>Complete</button>
        <input id="file_upload" type='file' accept='.pdf' multiple='false' onChange={fileSelected} ref={fileInput}></input>
        <ul>
          {list.map(function(item) {
            return <li key={item}>{`${item.toString()}`}</li>;
          })}
        </ul>
      </div>
      <div className="MyComponent">
        <div className="webviewer" ref={viewer} style={{height: "80vh"}}></div>
      </div>
    </Fragment>
  );
};
export default App;
