import React, { useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";
const PdfUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleUpload = async () => {
        if (!selectedFile) {
            console.log("Please select a PDF file");
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            debugger
            const response = await axios.post('https://localhost:44319/api/PdfDocument?id=' + Cookies.get("UserID"),
                formData, {
                headers: {
                    'Content-Type': 'multipart/form',
                },
            });
            console.log("File uploaded successfully:", response.data);
        }
        catch (error) {
            console.log('Error Uploadeing file', error);
        }
    };

    return (

        <div>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload PDF</button>
        </div>
    )
};
export default PdfUploader;