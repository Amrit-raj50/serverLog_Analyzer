import React from 'react';
import {useState} from 'react';
import { parseLogLine } from '../utils/logParser';

export default function Ip({file}){
    // const [req , setReq] = useState(0);
    // const [freq , setFreq] = useState({});

    let ipFreq = {};

    const lines = file.split('\n'); // spliting the file on the basis of lines

    lines.forEach(line => { // checking valid line and counting total valid request
        const parsed = parseLogLine(line);
        if(parsed){
            let ip = parsed.ip;

            ipFreq[ip] = 
               (ipFreq[ip] || 0) + 1;
        }
    });

    // setFreq(tempFreq);
    // setReq(req);//set the frequency of valid request

    return(
        <>
         {
                Object.keys(ipFreq).map((key) => (
                    <h1 key={key}>{key} : {ipFreq[key]}</h1>
                ))
            }
        </>
    )
}