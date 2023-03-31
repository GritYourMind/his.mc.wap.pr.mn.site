
import React from "react";
import { Link } from "react-router-dom";

 export default function EmptyPage(){
    return (
        <div>
            <h2>404 Page Error</h2>
            <Link to="/ident">돌아가기</Link>
        </div>
    )
 }