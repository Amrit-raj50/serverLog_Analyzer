import React from 'react';
import { useState } from 'react';

export default function Route({ file }) {
    // const [req , setReq] = useState(0);
    // const [freq , setFreq] = useState({});

    let maxRoute = "";
    let maxRes = 0;

    const lines = file.split('\n'); // spliting the file on the basis of lines

    lines.forEach(line => { // checking valid line and counting total valid request
        if (line.trim() !== '') {
            let elements = line.trim().split(/\s+/);
            let res = Number(elements[5].replace(/[a-zA-Z]/g, ""));
            let route = elements[3];

            if (maxRes < res) {
                maxRes = res;
                maxRoute = route;
            }
        }
    });


    return (
        <>
            <h1>
                Route taking maximum response time {maxRes} : {maxRoute}
            </h1>
        </>
    )
}