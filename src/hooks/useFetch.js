

export default function useFetch(data, inbody){
     //const [data, setData] = useState([]);
 

    //useEffect(() => {
        fetch('/bcexternal', {
            method: 'POST',
            body: JSON.stringify(inbody),
            headers: {
                'Content-Type': 'application/json'
                }
            }
        )
        .then(response => 
             response.json())
        .then(d => {
            data = d;
        })
        .catch(error => {
            console.error(error);
        });
    //},[]);

    //return data;
}