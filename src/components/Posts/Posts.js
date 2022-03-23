import React from "react";
import "./Posts.css";

function posts(msg) {
  const list = msg.msg;
  // list.sort((a, b) => {
  //   let da = new Date(a.created_time),
  //     db = new Date(b.created_time);
  //   return da - db;
  // });

  function convertDateTime(isodate) {
    let date = new Date(isodate);
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    // console.log(isodate);
    // console.log(
    //   date.getFullYear() +
    //   "-" +
    //   month +
    //   "-" +
    //   dt +
    //   " " +
    //   date.getHours() +
    //   ":" +
    //   date.getMinutes()
    // );

    return (
      date.getFullYear() +
      "-" +
      month +
      "-" +
      dt +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  }

  return list.length ? (
    <div className="wrapper">
      {list.map((item) => (
        <div className="posts">
          <h6> {convertDateTime(item.created_time)}</h6>
          <p>{item.message} </p>{" "}
        </div>
      ))}
    </div>
  ) : (
    <div> Click on author name to view thair posts</div>
  );
}

export default posts;
