
import { useEffect, useState } from "react";


export default function useFetch(url, inbody){
    const [data, setData] = useState([]);
    console.log("url:"+url);
    console.log("inbody:"+inbody);

    useEffect(() => {
        fetch(url, {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                inbody
                
            })
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            setData(data);
        })
    },[url]);

    console.log(data);
    return data;
}