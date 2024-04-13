"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
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
  const [search, setSearch] = useState("");
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState("");
  const [iconCode, setIconCode] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");

  const apiKey = "deb0d4a0b77e5707f51e68214801c05d";
  const apiUrl = "https://api.openweathermap.org/data/2.5/";

  const checkWeather = async () => {
    console.log(search);
    fetch(`${apiUrl}weather?q=${search}&units=metric&APPID=${apiKey}`)
      .then((res) => res.json())
      .then((result) => {
        displayWeather(result);
      }).then;
  };

  const displayWeather = (result) => {
    if (result && result.weather && result.weather.length > 0 && result.main) {
      const description = result.weather[0].description;

      // Making sure each word starts with a capital letter
      const desc = description
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      setDescription(desc);
      setTemp(Math.round(result.main.temp));
      setIconCode(result.weather[0].icon);
      setWind(result.wind.speed);
      setHumidity(result.main.humidity);
    } else {
      console.error("Invalid city", result);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center font-montserrat min-h-[600px] min-w-[1200px]">
      <div className="rounded-md drop-shadow-md w-[80%] bg-white h-[80%] overflow-hidden">
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
        <div className="flex-col justify-center  ml-12 mt-7 h-[70%] w-[28%]">
          <div className="flex-cols justify-center items-center flex-col mt-24 w-full h-1/2">
            <div className="flex justify-center items-center  h-1/2">
              <img
                src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                alt=""
                className="w-36 h-36"
              />
            </div>
            <div className="flex justify-center items-center mt-4">
              <p className="text-5xl font-semibold whitespace-nowrap">
                {temp}°C
              </p>
            </div>
            <p className="text-2xl font-bold flex justify-center whitespace-nowrap">
              {description}
            </p>
          </div>
          <div className=" w-full h-1/3 text-center flex justify-around mt-8">
            <div className="h-12 ml-2">
              <p className="text-gray-500 whitespace-nowrap">Humidity</p>
              <p>{humidity}%</p>
            </div>
            <div className="h-12 mr-2">
              <p className="text-gray-500 whitespace-nowrap">Wind Speed</p>
              <p>{wind} m/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
