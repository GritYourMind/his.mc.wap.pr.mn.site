
const getFetchData = async(data, callback) => {
    fetch(process.env.REACT_APP_HOST, {
    //fetch('/bcexternal', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(response => 
    {
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error('Network Error');
        }
    })
    .then(data => {
        callback(data);
    })
    .catch(error => {
        console.error("error: "+ error);
        callback(undefined);
    });
};

export default getFetchData;