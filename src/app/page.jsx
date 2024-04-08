import Image from "next/image";

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

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="rounded-md drop-shadow-md w-[70%] bg-white h-[70%]">
        <div className="flex text-lg items-center w-[35%] h-[50px] mt-10 ml-9">
          <p>Your City</p>
          <input className="border-2 h-11 ml-3 rounded-md" type="text" />
        </div>
        <div className="border-2 border-black ml-12 mt-7 h-[70%] w-[28%]">
          <p className="text-xl text-gray-500">{currentDate}</p>
        </div>
      </div>
    </div>
  );
}
