import { useEffect, useState } from "react";
import "./App.css";
import { API_URL } from "./Config/api";

function App() {
  const [data, setData] = useState([]);

  const [isLoading, setisLoading] = useState(true);

  const url = API_URL;

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        setData(json);
        setTimeout(() => setisLoading(false), 3000);
      } catch (error) {
        console.error(error.message);
        setData([]);
        setTimeout(() => setisLoading(false), 3000);
      }
    };
    fetchApi();
  }, []);

  return (
    <div className="min-w-screen m-5 flex flex-col items-center gap-5">
      <div>
        <p className="text-gray-200 text-4xl font-bold tracking-wider">
          List of Users
        </p>
      </div>

      {isLoading ? (
        <div className="absolute w-screen h-screen flex items-center justify-center">
          <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full">
            <div className="rounded-full h-full w-ful bg-[#3c3c3d] background-blur-md"></div>
          </div>
        </div>
      ) : data.length !== 0 ? (
        <div className="w-full">
          <ul className="flex flex-col gap-6 my-14">
            {data.map((item) => (
              <li
                key={item.id}
                className="w-[300px] bg-neutral-900 h-[40px] flex items-center px-4 -skew-x-12 hover:bg-green-300 group"
              >
                <p className="text-green-500 skew-x-12 group-hover:text-black">
                  {item.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Error 404. Data not found.</p>
      )}
    </div>
  );
}

export default App;
