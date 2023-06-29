import axios from "axios";
import React from "react";

export default function Contoh() {
  async function getData() {
    await axios
      .get("http://135.181.26.148:25117/search?query=istri")
      .then((res) => {
        console.log(res.data.results);
      });
  }

  return (
    <div>
      <button onClick={getData}>Get Data</button>
    </div>
  );
}
