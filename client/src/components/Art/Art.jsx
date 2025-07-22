import React, { useState, useCallback } from "react";
import axios from "axios";

function Art() {
    const [artId, setArtId] = useState("");
    const [data, setData] = useState([]);

    const [apiError, setApiError] = useState();

    const loadArt = useCallback(async (id) => {
        await axios
        .get(`/api/object/read`, { params: { id } })
        .then((response) => {
            if (response.status === 200) setData(response.data);
            else setApiError("No art found :-(");
        })
        .catch((error) => setApiError(error));
    }, []);

    return (
        <div>
        <h2>{data.length > 0 ? "Art found!" : "No art found."}</h2>
        <input
            type="text"
            placeholder="Enter Art ID"
            onChange={(e) => setArtId(e.target.value)}
        />
        <button onClick={() => loadArt(artId)} style={{ marginRight: "1rem" }}>
            Load Art
        </button>
        {apiError && <p style={{ color: "red" }}>{apiError}</p>}
        </div>
    );
}

export default Art;
