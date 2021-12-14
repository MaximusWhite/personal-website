import React from 'react';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
// import { pdfjs } from 'react-pdf';

import './style.css';
import Header from '../common/header';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
// import './pdf/pdf_viewer'
// import PDFViewer from './pdf/pdf_viewer';

// pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

class Resume extends React.Component {

    constructor(props) {
      super();
      this.downloadResume = this.downloadResume.bind(this);
    }
    
    downloadResume(){
      axios.get('/api/download_resume', {
        responseType: 'blob'
      }).then(res => 
        {
          console.log(res)
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Mikhail Korchevskiy_resume.pdf'); //or any other extension
          document.body.appendChild(link);
          link.click();
        }).catch(err => {console.log(err.message)});
    }

    // onDocumentLoadSuccess({ numPages }) {
    //   setNumPages(numPages);
    // }

    render() {
      return (
        <mp>  
            <Header banner='resume' />
            <h1>RESUME</h1><Button onClick={this.downloadResume}>Download</Button>
       </mp>
      );
    }
  }
  
  export default Resume;
  