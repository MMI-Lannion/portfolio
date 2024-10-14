import React, { useState } from "react";

function Count() {
    const [count, setCount] = useState(0);

    const addCount = () => {
        setCount(count + 1);
    };

    const deleteCount = () => { 
        setCount(count - 1);
    };

    return (
        <>
            <h1>Counter Test</h1>
            <button onClick={addCount}>Add</button>
            {count}
            <button onClick={deleteCount}>Subtract</button>
        </>
    );
}

export default Count;
