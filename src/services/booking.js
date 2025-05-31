import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BOOKING_BASE_URL = import.meta.env.VITE_API_URL_BOOKING;

export const getPhotographerUserName = (photographerId) =>
    axios.get(BOOKING_BASE_URL + "/photographer/" + photographerId);

export const getUserInfomation = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decodedToken = jwtDecode(token);
    return axios.get(BOOKING_BASE_URL + "/customer/" + decodedToken.userId);
};

export const bookPhotographer = (photographerId, data) =>
    axios.post(BOOKING_BASE_URL + "/book/photographer/" + photographerId, data);

export const getPendingBooking = (photographerId) =>
    axios.get(BOOKING_BASE_URL + "/book/" + photographerId);

export const acceptBookingRequest = (bookingId) =>
    axios.get(BOOKING_BASE_URL + "/book/accept/" + bookingId);

export const rejectBookingRequest = (bookingId) =>
    axios.get(BOOKING_BASE_URL + "/book/reject/" + bookingId);
