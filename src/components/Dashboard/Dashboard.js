import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Posts from "../Posts/Posts";

export default function Dashboard(props) {
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState("");
  const [uniqueName, SetuniqueName] = useState([]);
  const [asc, setAsc] = useState(false);
  const [searchResults, SetSearchResults] = React.useState(uniqueName);
  const handleSearch = event => {
      event.preventDefault();
     const results = !event.target.value ? uniqueName : uniqueName.filter(person =>
        person.toLowerCase().includes(event.target.value.toLowerCase())
      );
      results.length ? SetSearchResults(results) : SetSearchResults(uniqueName) ;

      
   };

  function filterPosts(fullList, user) {
    let newList = [];
    if (user && fullList.length >= 1) {
      for (let i of fullList) {
        if (i.from_name === user) newList.push(i);
      }
    }
    if (newList.length > 1 && asc) {
      newList.sort((a, b) => {
        let da = new Date(a.created_time),
          db = new Date(b.created_time);
        return da - db;
      });
    } else {
      newList.sort((a, b) => {
        let da = new Date(a.created_time),
          db = new Date(b.created_time);
        return db - da;
      });
    }
    return newList;
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
      if (props.props) {
        let url = `https://api.supermetrics.com/assignment/posts?sl_token=${props.props}&page=10`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setUserData(data.data.posts);
            SetuniqueName([
              ...new Set(data.data.posts.map((item) => item.from_name)),
            ]);
            SetSearchResults([
                ...new Set(data.data.posts.map((item) => item.from_name)),
              ]);
         
            
          });
      }
    }
    fetchData();
  }, [props]);
 


  return (
    <div>
      <div className="SortAndSearch">
        <input type="text" placeholder="search name" onChange={(event) => handleSearch(event)}/>
        <button onClick={(event) => setAsc(true)}> ↑ </button>
        <button onClick={(event) => setAsc(false)}> ↓ </button>
      </div>

      <div className="partcontainer">
        <div className="wrapper">
          {searchResults.sort().map((item) => (
            <button className="btn" onClick={(event) => setUser(item)}>
              {" "}
              {item}{" "}
              <span className="style">
                {filterPosts(userData, item).length}
              </span>
            </button>
          ))}
        </div>
        <div className="wrapper">
          <Posts msg={filterPosts(userData, user)} />
        </div>
      </div>
    </div>
  );
}
