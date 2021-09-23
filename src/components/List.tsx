import { RSA_NO_PADDING } from "constants";
import React from "react"

import { Result } from "../ItunesInterfaces"
const { v4: uuidv4 } = require('uuid');


interface IProps{
    results: Result[]
};

// React's functional component
//
const List: React.FC<IProps> = ( { results } ) => {

    const renderList = (): JSX.Element[] => {
        return results.map( (res: Result) => {
            return (
              <div key={uuidv4()} className="container">
                <hr></hr>
                <table className="">
                    <tr>
                        <td>Artist</td>
                        <td> <a href={res.artistViewUrl}>{res.artistName}</a> </td>
                    </tr>
                    <tr>
                        <td>Artist ID</td>
                        <td>{res.artistId}</td>
                    </tr>
                    <tr>
                        <td>Collection</td>
                        <td> <a href={res.collectionViewUrl}>{res.collectionName}</a> </td>
                    </tr>
                    <tr>
                        <td>Genre</td>
                        <td>{res.primaryGenreName}</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>{res.collectionPrice}</td>
                    </tr>
                </table>
                <img src={res.artworkUrl60} />
            </div> 
            )
        });
    };

    return ( 
       <div>
           {renderList()}
       </div> 
    )
};

export default List 
