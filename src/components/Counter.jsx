import React, { useEffect, useState } from 'react'

export const Counter = () => {
    const [count, setCount] = useState(10);
    console.log('first');

    useEffect(() => {
        console.log("useEffect with empty depend");

        return () => {
            console.log("cleanup with empty depend")
        }
    }, []);

    useEffect(() => {
        console.log("useEffect with count depend");

        return () => {
            console.log("cleanuup with count depe");
        }
    }, [count]);

    console.log('second');


    return (
        <>
            <div>{count}</div>
            <button onClick={() => setCount(count => count + 1)} >inc</button>
        </>
    )
}

// cleanuup function will get called just before the useEffect callback except for the first time