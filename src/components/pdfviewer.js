import React, {useEffect, useState, useRef} from 'react'
import WebViewer, { PDFNet } from '@pdftron/webviewer';

function Pdfviewer(props) {
    const viewer = useRef(null);

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
            });
    }, );

    return (
        <div className="MyComponent" style={{width: "80vw", backgroundColor: 'red'}}>
            <div className="webviewer" ref={viewer}  style={{height: "100vh"}}></div>
        </div>
    )
}
export default Pdfviewer;

