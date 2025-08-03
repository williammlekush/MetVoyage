import axios from "axios";

//#region filter options
export const getNameOptions = () => axios.get("/api/object/readDistinctNames");
//#endregion
