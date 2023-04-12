
const getFetchData = async(data, callback) => {
    fetch(process.env.REACT_APP_HOST, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(data => {
    //console.log(data);
        callback(data);
    })
    .catch(error => {
        //console.error(error);
    callback(error);
    });
};

export default getFetchData;