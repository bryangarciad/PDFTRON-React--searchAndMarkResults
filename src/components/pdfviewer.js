import React, {useEffect, useState, useRef} from 'react'
import WebViewer from '@pdftron/webviewer';


function Pdfviewer(props) {
    const viewer = useRef(null);
    let FoundCounter = 0;
    useEffect(() => {
        console.log(props.file);
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/pdftron_about.pdf',
            },
            viewer.current,
            ).then((instance) => {
                const { annotManager, docViewer, Annotations } = instance;

                if(props.file  != null)
                    instance.loadDocument(props.file, { filename: props.file.name });

                const searchListener = (searchPattern, options, results) => {
                    const newAnnotations = results.map(result => {
                        //Rectangle annotation
                
                        let ColorArray = props.colorList[props.searchList.findIndex( element => element.toUpperCase() === results[FoundCounter].DC.toUpperCase())];
                        
                        
                        const rectangleAnnot = new Annotations.RectangleAnnotation();
                        if(ColorArray!== undefined)
                            rectangleAnnot.StrokeColor = new Annotations.Color(ColorArray.r,ColorArray.g,ColorArray.b);

                        rectangleAnnot.PageNumber = result.pageNum;
                        rectangleAnnot.X = result.quads[0].Sx-2;
                        rectangleAnnot.Y = result.quads[0].Tx-2;
                        rectangleAnnot.Width = result.quads[0].Rx- result.quads[0].Sx+4;
                        rectangleAnnot.Height = result.quads[0].ca- result.quads[0].Tx+4;
                        rectangleAnnot.Author = annotManager.getCurrentUser();
                        FoundCounter++;
                        return rectangleAnnot;
                  });
                  annotManager.addAnnotations(newAnnotations);
                  annotManager.drawAnnotationsFromList(newAnnotations);
                };
                
                docViewer.on('documentLoaded', async () => {
                    const searchPattern     = props.searchList.join('|');
                  // searchPattern can be something like "search*m" with "wildcard" option set to true
                  // searchPattern can be something like "search1|search2" with "regex" option set to true
            
                    const searchOptions = {
                        caseSensitive: false,  // match case
                        wholeWord: true,      // match whole words only
                        wildcard: false,      // allow using '*' as a wildcard value
                        regex: true,         // string is treated as a regular expression
                        searchUp: false,      // search from the end of the document upwards
                        ambientString: true,  // return ambient string as part of the result
                    };
            
                    instance.addSearchListener(searchListener);
                    instance.searchTextFull(searchPattern, searchOptions);
                });
            });
    }, );

    return (
        <div className="MyComponent" style={{width: "80vw", backgroundColor: 'red'}}>
            <div className="webviewer" ref={viewer}  style={{height: "100vh"}}></div>
        </div>
    )
}
export default Pdfviewer;

