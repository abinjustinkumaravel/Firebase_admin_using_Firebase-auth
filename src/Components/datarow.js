import React from 'react'

const rowdata = ({img_url, title, description, ratings, offer, price }) => {
    return(
        <div>
            <img alt='..' src={img_url} width={100} height={100}></img>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{ratings}</p>
            <p>{offer}</p>
            <p>{price}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    );
}
export default rowdata
