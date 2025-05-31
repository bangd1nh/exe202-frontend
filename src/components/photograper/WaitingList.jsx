import React, { useState, useEffect } from "react";
import { getId, getUserId } from "../../services/user";
import {
    acceptBookingRequest,
    getPendingBooking,
    rejectBookingRequest,
} from "../../services/booking";

const WaitingList = () => {
    const [loading, setLoading] = useState(true);
    const [expandedCustomer, setExpandedCustomer] = useState(null);
    const [rejectReason, setRejectReason] = useState("");
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectedCustomers, setRejectedCustomers] = useState([]);
    const [acceptedCustomers, setAcceptedCustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    // const customers = [
    //     {
    //         id: 1,
    //         name: "Alice Johnson",
    //         phone: "0123-456-789",
    //         address: "123 Đường ABC, Hà Nội",
    //         note: "Muốn phong cách cổ điển",
    //         avatar: "/public/images/navbar/avatar.jpg",
    //         request: "Chụp ảnh cưới",
    //         date: "15/03/2025",
    //     },
    //     {
    //         id: 2,
    //         name: "David Lee",
    //         phone: "0987-654-321",
    //         address: "456 Đường XYZ, TP.HCM",
    //         note: "Chụp ngoài trời, năng động",
    //         avatar: "/public/images/navbar/avatar.jpg",
    //         request: "Chụp kỷ yếu",
    //         date: "20/03/2025",
    //     },
    //     {
    //         id: 3,
    //         name: "Emily Smith",
    //         phone: "0912-345-678",
    //         address: "789 Đường QWE, Đà Nẵng",
    //         note: "Chụp gia đình tại biển",
    //         avatar: "/public/images/navbar/avatar.jpg",
    //         request: "Chụp ảnh gia đình",
    //         date: "25/03/2025",
    //     },
    // ];

    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        const photographerId = getId();
        getPendingBooking(photographerId)
            .then((res) => {
                setCustomer(res.data.payload);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    const toggleExpand = (id) => {
        setExpandedCustomer(expandedCustomer === id ? null : id);
    };

    const handleReject = (customerId) => {
        setSelectedCustomerId(customerId);
        setShowRejectModal(true);
    };

    const handleRejectSubmit = () => {
        if (selectedCustomerId !== null) {
            rejectBookingRequest(selectedCustomerId)
                .then((res) => {
                    setRejectedCustomers([
                        ...rejectedCustomers,
                        selectedCustomerId,
                    ]);
                    setRejectReason("");
                    setSelectedCustomerId(null);
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    setShowRejectModal(false);
                });
        }
    };

    const handleAccept = (customerId) => {
        acceptBookingRequest(customerId)
            .then((res) => {
                setAcceptedCustomers([...acceptedCustomers, customerId]);
            })
            .catch((err) => console.log(err));
    };

    const getProgressStatus = (customerId) => {
        if (rejectedCustomers.includes(customerId)) return "❌ Rejected";
        if (acceptedCustomers.includes(customerId)) return "✅ Accepted";
        return "⏳ Pending";
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center bg-gray-100">
            <header className="w-full  bg-[#e5b378] py-4 flex justify-between px-10 items-center shadow-md">
                <h1 className="text-xl font-bold tracking-wide text-gray-800">
                    Waiting List
                </h1>
                <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
                    Message
                </button>
            </header>

            <div className="w-full max-w-6xl bg-white mt-10 p-8 rounded-lg shadow-lg">
                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="w-14 h-14 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {customer.map((customer) => (
                            <div
                                key={customer._id}
                                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition relative cursor-pointer"
                                onClick={() => toggleExpand(customer._id)}
                            >
                                {/* Thông tin chính */}
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={customer.CustomerId.Avatar}
                                        alt={customer.CustomerId.FirstName}
                                        className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {customer.CustomerId.FirstName}{" "}
                                            {customer.CustomerId.LastName}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {customer.ServiceId.Name}
                                        </p>
                                        <span className="text-xs text-gray-400">
                                            {formatDate(customer.BookingDate)}
                                        </span>
                                    </div>

                                    {/* Hiển thị trạng thái */}
                                    <span
                                        className={`ml-auto px-3 py-1 text-sm font-semibold rounded-full 
                    ${
                        rejectedCustomers.includes(customer._id)
                            ? "text-red-600 bg-red-100"
                            : acceptedCustomers.includes(customer._id)
                            ? "text-green-600 bg-green-100"
                            : "text-yellow-600 bg-yellow-100"
                    }`}
                                    >
                                        {getProgressStatus(customer._id)}
                                    </span>
                                </div>

                                {/* Tiến độ (Progress Bar) */}
                                <div className="mt-3">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className={`h-2.5 rounded-full transition-all duration-500 ${
                                                rejectedCustomers.includes(
                                                    customer._id
                                                )
                                                    ? "bg-red-500 w-full"
                                                    : acceptedCustomers.includes(
                                                          customer._id
                                                      )
                                                    ? "bg-green-500 w-full"
                                                    : "bg-yellow-500 w-1/3"
                                            }`}
                                        ></div>
                                    </div>
                                </div>

                                {/* Thông tin mở rộng */}
                                {expandedCustomer === customer._id && (
                                    <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
                                        <p>
                                            <strong>Số điện thoại:</strong>{" "}
                                            {customer.CustomerId.PhoneNumber}
                                        </p>
                                        <p>
                                            <strong>Địa chỉ:</strong>{" "}
                                            {customer.Location}
                                        </p>
                                        <p>
                                            <strong>Lời nhắn:</strong> "
                                            {customer.Message}"
                                        </p>
                                    </div>
                                )}

                                {/* Nút hành động */}
                                {!rejectedCustomers.includes(customer._id) &&
                                    !acceptedCustomers.includes(
                                        customer._id
                                    ) && (
                                        <div className="mt-4 flex gap-2">
                                            <button
                                                className="flex-1 bg-[#e5b378] text-white py-2 rounded-md transition duration-300 hover:bg-green-500"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAccept(customer._id);
                                                }}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="flex-1 bg-[#e5b378] text-white py-2 rounded-md transition duration-300 hover:bg-red-500"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleReject(customer._id);
                                                }}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal nhập lý do từ chối */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-[#e5b378] bg-opacity-60 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-center">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">
                            Lý do từ chối
                        </h2>
                        <textarea
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Nhập lý do từ chối..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                        />
                        <div className="flex justify-between mt-4">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                                onClick={() => setShowRejectModal(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                onClick={handleRejectSubmit}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WaitingList;
