import React from "react";
import axios from 'axios';
const PdfDownloader = () => {
    const handleDownlad = async () => {
        try {
            const response = await axios.get('https://localhost:44319/api/PdfDocument/' + 2,
                {
                    responseType: 'blob'
                });
            console.log(response);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            debugger
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'myFile.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        catch (error) { console.error('Error Downlaoding PDF:', error); }
    };
    return (
        <div>
            <button className="btn btn-primary" onClick={handleDownlad}>
                Download PDF
            </button>
        </div>
    )
};
export default PdfDownloader;