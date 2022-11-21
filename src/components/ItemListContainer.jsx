import React from "react";

const ItemListContainer = ({greeting}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="alert alert-primary text-center" role="alert">
                   <h1> {greeting} </h1> 
                </div>
            </div>
        </div>
    )
}

export default ItemListContainer;