import React, { useContext, useState } from "react";
import { FaBox, FaMapMarkerAlt, FaCalendarAlt, FaCircle } from "react-icons/fa";
import Lottie from "lottie-react";
import axios from "axios";
import animation from "../../public/assets/Animation - 1734640899011.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContextProvider";

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [find, setFind] = useState(false);
  const type = localStorage.getItem("type");
  const [shipData, setShipData] = useState(null);
  console.log(shipData);

  const navigate = useNavigate();
  const { backendUrl, token } = useContext(ShopContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "Person") {
      axios
        .get(`${backendUrl}/api/shippment/number`, {
          params: { number: Number(trackingNumber) },
          headers: { token },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            setShipData(response.data.ship);
            setFind(true);
          } else {
            setFind(false);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }else{
      axios
        .get(`${backendUrl}/api/compShippments/number`, {
          params: { number: Number(trackingNumber) },
          headers: { token },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            setShipData(response.data.ship);
            setFind(true);
          } else {
            setFind(false);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const shippmentInfo = {
    id: "12345678",
    status: "in Transit",
    estimated: "March 25, 2024",
    from: "New York, USA",
    to: "Los Angeles",
    date: "March 20, 2024",
    transit: "Chicago",
    transitDate: "March 21, 2024",
    arrived: "Texas",
    arrivedDate: "March 22, 2024",
    courier: "Mark Welson",
    pickedDate: "March 27, 2024",
  };

  return (
    <div className="bg-gray-50 pb-[100px] translate-y-[-50px]">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Track Your Shipment
          </h1>
          <p className="text-center text-lg text-blue-100 mb-8">
            Enter your tracking number to get real-time updates on your shipment
          </p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter your tracking number"
                  className="w-full px-6 py-4 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <FaBox
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className={`px-8 py-4 rounded-lg font-semibold transition-colors duration-200 
                  ${
                    isSearching
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
              >
                {isSearching ? "Searching..." : "Track Now"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Tracking Result Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {find ? (
            <>
              {/* Shipment Status Header */}
              <div className="border-b pb-6 mb-6">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      Tracking ID: SHIP-{shipData?.number}
                    </h2>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {shipData?.status}
                    </span>
                  </div>
                  <div className="text-right">
                    {shipData?.estimated_delivery ? (
                      <div>
                        <p className="text-gray-600">Estimated Delivery</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {new Date(
                            shipData.estimated_delivery
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipment Details */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="text-gray-500 text-sm">From</p>
                    <p className="font-medium">{shipData?.origin}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="text-gray-500 text-sm">To</p>
                    <p className="font-medium">{shipData?.destination}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCalendarAlt className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="text-gray-500 text-sm">Shipping Date</p>

                    <p className="font-medium">
                      {" "}
                      {new Date(shipData?.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCircle className="text-green-600" size={12} />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Shipment in Transit
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {/* Package has left {shipData?.transition} facility */}
                      {shipData?.transition === "Not moved yet"
                        ? "Not moved yet"
                        : `Package has left ${shipData?.transition} facility`}
                    </p>

                    {shipData?.transition_date ? (
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(shipData?.transition_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          }
                        )}{" "}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaCircle className="text-blue-600" size={12} />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Arrived at Facility
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {/* Package arrived at {shipData?.arrived} sorting
                      facility */}
                      {shipData?.arrived === "Not moved yet"
                        ? "Not moved yet"
                        : `Package arrived at ${shipData?.arrived} sorting
                      facility`}
                    </p>
                    {shipData?.arrived_date ? (
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(shipData?.arrived_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          }
                        )}{" "}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <FaCircle className="text-gray-600" size={12} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Shipment Picked Up
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {/* Package picked up by {shipData?.courier} */}
                      {!shipData?.courier
                        ? "Not reached yet"
                        : `Package picked up by ${shipData?.courier}`}
                    </p>
                    {shipData?.picked_up_date ? (
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(shipData?.picked_up_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          }
                        )}{" "}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Show not found message
            <div className="flex flex-col items-center justify-center py-12">
              <Lottie
                animationData={animation}
                loop={true}
                style={{ width: 200, height: 200 }}
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Shipment Not Found
              </h3>
              <p className="text-gray-600 text-center">
                We couldnt find any shipment with this tracking number
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracking;
