import React, { useState, useRef  } from 'react';
import List from "./components/List";
import { ItunesTypes, Result } from "./ItunesInterfaces"

import "bootstrap/dist/css/bootstrap.min.css";

interface RequestResult {
   res: Response;
   data: JSON;
}

// Send GET request to REST APIs
async function request_get(url: string): Promise<RequestResult>
{
    const res = await fetch(url,
                            { "method": "GET"
                                , headers: {
                                      'Content-Type': 'application/json'
                                    , 'X-Requested-With': 'XMLHttpRequest'
                                }
                            });

    let data = await res.json();
    return {res: res, data: data};
}

interface IState{
   results: Result[]
}

function App() {

  const [results, setResults ] = useState<IState["results"]>([]);

  const refSearch = useRef<HTMLInputElement>(null);

  async function search(){
    // let input = refSearch.current as any; // as HTMLInputElement;
    let entry = refSearch.current?.value; //input === null ? "" : input.value;

    let url = `https://itunes.apple.com/search?term=${entry}&entity=album`;
    let res = await request_get(url);
    console.log(res.data);
    let dat =  res.data as ItunesTypes;

    setResults(dat.results || []);
  }

  function clear(){
    setResults([]);
    if( refSearch.current != null){ refSearch.current.value = ""; }
  }

  return (
    <>
      <h1 className="text-center text-uppercase" >Search Itunes API</h1>
      <input className="form-control" ref={refSearch} type="text" />
      <button className="btn btn-primary" onClick={search} >Search</button>
      <button className="btn btn-primary" onClick={clear} >Clear</button>
      <List results={results} />
    </>

  ) ;
}

export default App;
