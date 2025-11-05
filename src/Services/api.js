import axios from "axios";
import { AUTH_BASR_URL } from "./consfig";

const BASE = import.meta.env.VITE_API_URL;

export const fetchProperties = async () =>{
    const {data} = await axios.get(BASE);
    return data;

}
