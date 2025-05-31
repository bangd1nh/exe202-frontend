import axios from "axios";

const PHOTOGRAPHERS_BASE_API_URL = import.meta.env.VITE_API_URL_PHOTOGRAPHER;

export const getAllPhotographers = () => axios.get(PHOTOGRAPHERS_BASE_API_URL);

export const getPhotographersById = (pId) =>
    axios.get(PHOTOGRAPHERS_BASE_API_URL + "/" + pId);

export const getPhotographerServices = (photographerId) =>
    axios.get(PHOTOGRAPHERS_BASE_API_URL + "/services/" + photographerId);
