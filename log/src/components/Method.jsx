import React from 'react';
import {useState} from 'react';

export default function Method({file}){
    // const [req , setReq] = useState(0);
    // const [freq , setFreq] = useState({});

    let tempFreq = {};

    const lines = file.split('\n'); // spliting the file on the basis of lines

    lines.forEach(line => { // checking valid line and counting total valid request
        if(line.trim() !== ''){
            let elements = line.trim().split(/\s+/);
            let method = elements[2];

            tempFreq[method] = 
               (tempFreq[method] || 0) + 1;
        }
    });

    // setFreq(tempFreq);
    // setReq(req);//set the frequency of valid request

    return(
        <>
         {
                Object.keys(tempFreq).map((key) => (
                    <h1 key={key}>{key} : {tempFreq[key]}</h1>
                ))
            }
        </>
    )
}