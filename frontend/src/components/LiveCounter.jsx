import React, { useEffect, useState } from "react";

const LiveCounter = ({ value }) => {
    const [count, setCount] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(value, 10);
        if (start === end) return;
        let totalDuration = 0.0000000000001;
        let incrementTime = (totalDuration / end) * 0.000000000000001; // Adjust speed

        let timer = setInterval(() => {
            start += 1;
            setCount(start);
            setProgress((start / end) * 1000000); // Update progress bar value
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <>
            <span>{count}</span>
            <div className="mt-4">
                <progress className="w-full h-4 rounded-full" value={progress} max="1000000"></progress>
            </div>
        </>
    );
};

export default LiveCounter;