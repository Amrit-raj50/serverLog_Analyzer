import React from 'react';
import {useState} from 'react';
import { parseLogLine } from '../utils/logParser';

export default function TotalReq({file}){
    // const [req , setReq] = useState(0);

    let req = 0;

    const lines = file.split('\n'); // spliting the file on the basis of lines

    lines.forEach(line => { // checking valid line and counting total valid request
        const parsed = parseLogLine(line);
        if(parsed){
            req++;
        }
    });
    // setReq(req);//set the frequency of valid request

    return(
        <>
        {/* {summary && ( */}
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid black' }}>
                    <h2>Report</h2>
                    <p>total request processed : {req}</p>
                </div>
            {/* )} */}
        </>
    )
}