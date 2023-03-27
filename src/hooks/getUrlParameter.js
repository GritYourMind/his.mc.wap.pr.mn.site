
export default function getUrlParameter(location,key){

    const params = new URLSearchParams(location.search);
    //console.log("value : " + params.get(key));

    return params.get(key);
}
