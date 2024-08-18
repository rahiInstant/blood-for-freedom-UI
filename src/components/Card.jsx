import { useContext, useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import AuthContext from "../auth/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Card = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [dataRange, setDataRange] = useState("all-data");

  const { data, refetch } = useQuery({
    queryKey: ["user-data", dataRange],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/get-donar-data?dataRange=${dataRange}`
      );
      return result.data;
    },
  });

  function deleteDonarData(id) {
    axiosSecure.delete("/delete-donar-data", { id }).then((res) => {
      console.log(res?.data);
      refetch();
    });
  }

  function updateDonarData(id) {
    axiosSecure.patch("/update-donar-data", { id }).then((res) => {
      console.log(res?.data);
      refetch();
    });
  }

  return (
    <div className="mb-10 mt-10 max-sm:mx-3 max-lg:mx-4 max-xl:mx-5 max-2xl:mx-6">
      {/* search bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form
          onSubmit={(e) => setDataRange(e.target.search.value)}
          className=" w-full flex"
        >
          <input
            className="outline-none  px-5 py-3.5 max-sm:py-3 rounded-l-lg border w-full"
            type="text"
            name="search"
            id=""
            placeholder="197/12 fultoli, ward-09, chattogram"
          />{" "}
          <button
            type="submit"
            className="rounded-r-lg px-5 max-sm:py-3 py-3.5 duration-150 cursor-pointer text-xl text-green-100 bg-emerald-800 text-nowrap"
          >
            Find Donar
          </button>
        </form>
        {user ? (
          <div className="flex">
            <div
              // htmlFor="me"
              onClick={() => setDataRange("only-me")}
              className={`rounded-l-lg font-semibold md:font-semibold ${dataRange == "only-me" ? "bg-gray-200" : ""} max-sm:w-full select-none text-center  px-5 py-3.5 max-sm:py-3 cursor-pointer text-lg md:text-xl border-t border-r border-b border-l  sm:border-t-2 sm:border-r sm:border-b-2 sm:border-l-2 border-gray-600 text-nowrap`}
            >
              Only Me
              {/* <input type="checkbox" name="me" id="me" className="opacity-0" /> */}
            </div>
            <div
              onClick={() => setDataRange("all-data")}
              className={`rounded-r-lg font-semibold md:font-semibold  ${dataRange == "all-data" ? "bg-gray-200" : ""} max-sm:w-full select-none text-center px-5 py-3.5 max-sm:py-3 cursor-pointer text-lg md:text-xl border-t border-r border-b border-l  sm:border-t-2 sm:border-r-2 sm:border-b-2 sm:border-l border-gray-600 text-nowrap`}
            >
              All Donar
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <hr className="border border-gray-400 mt-4" />
      {/* cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* card-01 */}
        <div className="p-4 shadow rounded-lg relative">
          <div
            onClick={() => deleteDonarData("265744578521")}
            className="w-6 h-6 right-2 top-2 rounded-full bg-red-600 absolute flex justify-center items-center text-white cursor-pointer"
          >
            X
          </div>
          <h1 className="font-bold text-xl text-center">Abdur Rahamn Rahi</h1>
          <hr className="mt-2 mb-4" />
          {/* info */}
          <div className="space-y-1">
            <h2 className="text-lg">
              <span className="font-semibold">Phone:</span> 01768242425
            </h2>
            <h2 className="text-lg">
              <span className="font-semibold">Phone(alternate):</span>{" "}
              01768242425
            </h2>
            <h2 className="text-lg">
              <span className="font-semibold">Blood Group:</span> A+
            </h2>
            <h2 className="text-lg">
              <span className="font-semibold">Last Donation:</span> 5 month
              before
            </h2>
            <h2 className="text-lg">
              <span className="font-semibold">Present Address:</span> 169/122
              mia road,12 no word, fultoli,Chittagong, bangladesh
            </h2>
            <a
              href=""
              className="w-full font-medium block text-lg text-shadow text-blue-800"
            >
              Facebook Profile
            </a>
          </div>
          {user ? (
            <div
              onClick={() => updateDonarData("2484245458")}
              className="border border-green-700 text-center bg-green-200 text-green-900 text-lg py-3.5 max-sm:py-3 px-3 rounded-lg w-full font-medium cursor-pointer mt-5 bg-"
            >
              Update Info
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
