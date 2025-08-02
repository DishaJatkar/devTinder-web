import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No connections found!</h1>
      </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-white">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, photoURL, age, about, gender, _id } =
          connection;
        return (
          <div
            key={_id}
            className="m-4 p-4 rounded-lg bg-base-300 flex w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                src={photoURL}
                className="w-20 h-20 rounded-b-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="text-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
