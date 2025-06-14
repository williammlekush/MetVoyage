import "./App.css";
import React, { useState, useCallback } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const [apiError, setApiError] = useState();

  const getHello = useCallback(async () => {
    await axios
      .get("/api/hello/read")
      .then((response) => {
        if (response.status === 200) setData(response.data);
        else setApiError("No hello found :-(");
      })
      .catch((error) => setApiError(error));
  }, []);

  const clearHello = useCallback(async () => {
    await axios
      .post("/api/hello/clear")
      .then((response) => {
        if (response.status === 200) setMessage(response.data.message);
        else setApiError("Hello not cleared :-(");
        if (data) getHello();
      })
      .catch((error) => setApiError(error));
  }, [data, getHello]);

  const addHello = useCallback(async () => {
    await axios
      .post("/api/hello/add")
      .then((response) => {
        if (response.status === 200) setMessage(response.data.message);
        else setApiError("Hello not added :-(");
        if (data) getHello();
      })
      .catch((error) => setApiError(error));
  }, [data, getHello]);

  return (
    <div>
      <h2>Oh, hello?</h2>
      {data &&
        data.map((hello) => (
          <h2>
            {hello.id} says {hello.message}
          </h2>
        ))}
      {message && <p>{message}</p>}
      <button onClick={addHello} style={{ marginRight: "1rem" }}>
        Add Hello
      </button>
      <button onClick={clearHello} style={{ marginRight: "1rem" }}>
        Clear Hello
      </button>
      {apiError && <p style={{ color: "red" }}>{apiError}</p>}
    </div>
  );
}

export default App;
