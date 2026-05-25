import React from 'react';
import {useState} from 'react';
import { parseLogLine } from '../utils/logParser';

export default function Method({file}){
    // const [req , setReq] = useState(0);
    // const [freq , setFreq] = useState({});

    let tempFreq = {};

    const lines = file.split('\n'); // spliting the file on the basis of lines

    lines.forEach(line => { // checking valid line and counting total valid request
        const parsed = parseLogLine(line);
        if(parsed){
            let method = parsed.method;

            tempFreq[method] = 
               (tempFreq[method] || 0) + 1;
        }
    });

    // setFreq(tempFreq);
    // setReq(req);//set the frequency of valid request

    return(
        <>
         {
                Object.keys(tempFreq).sort((a,b) => tempFreq[b] - tempFreq[a]).map((key) => (
                    <div key={key} className="metric-row">
                        <span className="metric-label">{key}</span>
                        <span className="metric-value">{tempFreq[key]}</span>
                    </div>
                ))
            }
        </>
    )
}