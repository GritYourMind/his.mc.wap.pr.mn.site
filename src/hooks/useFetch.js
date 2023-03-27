
import { useEffect, useState } from "react";

export default function useFetch(inbody){
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/bcexternal', {
            method: 'POST',
            body: JSON.stringify(inbody),
            headers: {
                'Content-Type': 'application/json'
                }
            }
        )
        .then(response => response.json())
        .then(data => {
            setData(data);
        })
        .catch(error => {
        console.error(error);
        });
    },[]);

    return data;
}