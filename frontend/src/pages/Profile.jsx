import { useContext, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import {
  UserCircleIcon,
  TruckIcon,
  PlusCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { ShopContext } from "../context/ShopContextProvider";
import { toast } from "react-toastify";

const Profile = () => {
  const [shipDetails, setShipDetails] = useState({
    addOrigin: "",
    addDestination: "",
    addDescription: "",
  });
  const { backendUrl } = useContext(ShopContext);
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem("userId");
  const type = localStorage.getItem("type");
  const [copyRes, setCopyRes] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const getUserData = () => {
    if (type === "Person") {
      axios.get(`${backendUrl}/api/user/data`, {
        params: { userId },
        headers: {token }
    })
    .then((response)=>{
      console.log(response.data);
      if (response.data.success) {
        setCopyRes(response.data.user)
      }
    })
    .catch((error)=>{
      console.log(error.message)
    })
    }else{
      axios.get(`${backendUrl}/api/company/data`, {
        params: { companyId:userId },
        headers: { token }
    })
    .then((response)=>{
      console.log(response.data)
      setCopyRes(response.data.user)
    })
    .catch((error)=>{
      console.log(error.message)
    })
    }
  }
  
  useEffect(() => {
    getUserData();
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (type === 'Person') {
      axios.post(`${backendUrl}/api/shippment/add`,
        {userId,
          origin:shipDetails.addOrigin,
          destination:shipDetails.addDestination,
          packageDetails:shipDetails.addDescription
        },
        {headers:{token}}
      )
      .then((response)=>{
        console.log(response.data)
        toast.success(response.data.msg)
        if (response.data.success) {
          setShipDetails({
            addOrigin: "",
            addDestination: "",
            addDescription: "",
          })
        }})
      .catch((error)=>{
        console.log(error.message)
        toast.error(error.message)
      })
    }else{
      axios.post(`${backendUrl}/api/compShippments/add`,
        {companyId:userId,
          origin:shipDetails.addOrigin,
          destination:shipDetails.addDestination,
          package_details:shipDetails.addDescription
        },
        {headers:{token}}
      )
      .then((response)=>{
        console.log(response.data)
        toast.success(response.data.msg)
        if (response.data.success) {
          setShipDetails({
            addOrigin: "",
            addDestination: "",
            addDescription: "",
          })
        }})
      .catch((error)=>{
        console.log(error.message)
        toast.error(error.message)
      })
    }
  };

  return (
    <div className="translate-y-[-150px] pt-24 sm:pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="relative">
              <img
                src={copyRes?.imageUrl || "https://via.placeholder.com/150"}
                alt="Profile"
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover ring-4 ring-gray-100"
              />
              <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50">
                <PencilSquareIcon className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 text-center sm:text-left space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {copyRes?.name || "John Doe"}
              </h1>
              <p className="text-gray-500 text-sm sm:text-base">
                {copyRes?.email || "john@example.com"}
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
              <PencilSquareIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Edit Profile</span>
            </button>
          </div>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-white p-1.5 shadow-sm mb-6">
            {[
              { name: "Profile Details", icon: UserCircleIcon },
              { name: "My Shipments", icon: TruckIcon },
              { name: "Add Shipment", icon: PlusCircleIcon },
            ].map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 sm:py-3 text-sm font-medium leading-5 transition-all
                   ${
                     selected
                       ? "bg-blue-100 text-blue-700"
                       : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                   }`
                }
              >
                <div className="flex items-center justify-center gap-2">
                  <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden">{tab.name.split(" ")[0]}</span>
                </div>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Personal Information
                  </h3>
                  <div className="space-y-1">
                    {[
                      {
                        label: "Full Name",
                        value: copyRes?.name || "Youe name....",
                      },
                      {
                        label: "Email",
                        value: copyRes?.email || "Your email.....",
                      },
                      {
                        label: "Phone",
                        value: copyRes?.phone || "+20 103 457 1282",
                      },
                      {
                        label: "Address",
                        value: copyRes?.address || "Dameitta/Ras El Bar",
                      },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          value={field.value}
                          readOnly
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg p-1 sm:text-xl"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tab.Panel>

            <Tab.Panel className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="overflow-x-auto -mx-4 sm:-mx-6">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:pl-6"
                        >
                          Tracking Number
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                        >
                          Origin
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                        >
                          Destination
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {copyRes?.shipments?.map((shipment) => (
                        <tr key={shipment.number} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-blue-600 sm:pl-6">
                            {shipment.number}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {shipment.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 hidden sm:table-cell">
                            {shipment.origin}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 hidden sm:table-cell">
                            {shipment.destination}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {new Date(shipment.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "numeric",
                              year: "numeric",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Tab.Panel>

            <Tab.Panel className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
              <form
                onSubmit={onSubmitHandler}
                className="max-w-2xl mx-auto space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label
                      htmlFor="addOrigin"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Origin
                    </label>
                    <input
                      type="text"
                      id="addOrigin"
                      name="addOrigin"
                      value={shipDetails.addOrigin}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg p-2"
                      placeholder="Enter origin city"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="addDestination"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Destination
                    </label>
                    <input
                      type="text"
                      id="addDestination"
                      name="addDestination"
                      value={shipDetails.addDestination}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg p-2"
                      placeholder="Enter destination city"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="addDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Package Details
                  </label>
                  <textarea
                    id="addDescription"
                    name="addDescription"
                    rows={4}
                    value={shipDetails.addDescription}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg p-3"
                    placeholder="Enter package details..."
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
                  >
                    Create Shipment
                  </button>
                </div>
              </form>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Profile;
