import React, { useState } from 'react';
// Import the newly created CSS file for our stunning UI

export default function Front() {
    // State to hold the contents of the uploaded log file
    const [fileContent, setFileContent] = useState('');

    // Handle file selection and read its contents
    const handleFileUpload = (event) => {
        // Get the file the user selected from the input
        const file = event.target.files[0];
        if (!file) return;

        // Create a new FileReader to read the file in the browser
        const reader = new FileReader();

        // Defines what happens when the reader finishes reading the file
        reader.onload = (e) => {
            // e.target.result is the entire log file as a giant string
            const text = e.target.result;
            
            // Update the state with the file content so child components can parse it
            setFileContent(text);
        };

        // Tell reader to start reading the file as text
        reader.readAsText(file);
    };

    return (
        <div className="front-container">
            {/* Header Section with crazy animations and gradients */}
            <header className="front-header">
                <h1 className="gradient-text">Log Analyzer Dashboard</h1>
                <p className="subtitle">Upload your server logs to generate insightful metrics</p>
                
                {/* Custom File Upload Button */}
                <div className="upload-wrapper">
                    <label htmlFor="log-upload" className="upload-btn">
                        <span>Select Log File</span>
                        <input
                            id="log-upload"
                            type="file"
                            accept=".txt,.log"
                            onChange={handleFileUpload} 
                        />
                    </label>
                </div>
            </header>

            {/* Dashboard Content - Only shown if a file has been uploaded */}
            {fileContent && (
                <div className="dashboard-grid">
                    {/* Render each metric component inside a beautiful glassmorphism card */}
                    <div className="glass-card">
                        <h2>Total Requests</h2>
                        <TotalReq file={fileContent} />
                    </div>
                    
                    <div className="glass-card">
                        <h2>Method Frequencies</h2>
                        <div className="scrollable-content">
                            {/* We pass the file down without touching how Method works internally */}
                            <Method file={fileContent} />
                        </div>
                    </div>
                    
                    <div className="glass-card">
                        <h2>IP Frequencies</h2>
                        <div className="scrollable-content">
                            {/* The scrollable-content class keeps large outputs tidy */}
                            <Ip file={fileContent} />
                        </div>
                    </div>
                    
                    <div className="glass-card">
                        <h2>Routes</h2>
                        <div className="scrollable-content">
                            {/* Displays route data properly styled by Front.css */}
                            <Route file={fileContent} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}