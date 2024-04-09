"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const apiKey = "deb0d4a0b77e5707f51e68214801c05d";
  const apiUrl = "https://api.openweathermap.org/data/2.5/";

  const checkWeather = async () => {
    console.log(search);
    fetch(`${apiUrl}weather?q=${search}&units=metric&APPID=${apiKey}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Mon", "Tue", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date();
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  const date = today.getDate();
  const day = days[today.getDay() - 1];
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const formattedTime =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0");

  const currentDate = `${formattedTime}, ${day}, ${month} ${date}, ${year}`;

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="rounded-md drop-shadow-md min-w-[70%] bg-white h-[70%]">
        <div className="flex text-lg items-center w-[45%] h-[50px] mt-10 ml-9">
          <p>Your City</p>
          <input
            className=" border-l-2 border-b-2 border-t-2 h-11 ml-3 outline-none rounded-l-md"
            type="text"
            onChange={(e) => setSearch(event.target.value)}
          />
          <button
            className="border-r-2 h-11 w-10 border-b-2 border-t-2 rounded-r-md"
            onClick={checkWeather}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-blue-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>

        <div className="border-2 border-black ml-12 mt-7 h-[70%] min-w-[28%]">
          <p className="text-xl text-gray-500">{currentDate}</p>
          <p>{weather?.main?.temp}</p>
        </div>
      </div>
    </div>
  );
}
