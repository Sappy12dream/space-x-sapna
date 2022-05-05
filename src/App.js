import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(null);
  const [programList, setProgramList] = useState([]);
  const [launch_success, setLaunch_success] = useState("");
  const [land_success, setLand_success] = useState("");
  const [launch_year, setLaunch_year] = useState("");
  const year = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
  ];
  const getProgram = async (launch_success, land_success, launch_year) => {
    try {
      setLoading(true);

      let link = `https://api.spacexdata.com/v3/launches?limit=100&launch_success=${launch_success}&land_success=${land_success}&launch_year=${launch_year}`;
      const { data } = await axios.get(link);
      setProgramList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProgram(launch_success, land_success, launch_year);
  }, [launch_success, land_success, launch_year]);

  console.log(loading, programList);
  return (
    <div className="App w-full max-w-[1440] h-full p-4">
      <h1 className="text-center text-4xl text-black font-bold py-4">
        SpaceX Launch Programs
      </h1>
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-5 md:grid-cols-3">
        <div className="w-full bg-white p-5 rounded-md md:col-span-1 lg:col-span-1 h-fit">
          <p className="font-bold text-base text-black text-left">Filters</p>
          <p className=" font-normal text-sm text-black text-center px-2 py-2 border-b-2 border-slate-400">
            Launch Year
          </p>
          <div className="grid grid-cols-2 gap-2 mt-5">
            {year.map((y) => (
              <button
                key={y}
                className="rounded-md bg-lime-200 p-1 cursor-pointer hover:bg-lime-600"
                onClick={() => setLaunch_year(y)}
              >
                {y}
              </button>
            ))}
          </div>
          <p className="font-normal text-sm text-black text-center px-2 py-2 border-b-2 border-slate-400">
            Successful Launch
          </p>
          <div className="grid grid-cols-2 gap-2 mt-5">
            <button
              className="rounded-md bg-lime-200 p-1 cursor-pointer hover:bg-lime-600"
              onClick={() => setLaunch_success(true)}
            >
              True
            </button>
            <button
              className="rounded-md bg-lime-200 p-1 cursor-pointer hover:bg-lime-600"
              onClick={() => setLaunch_success(false)}
            >
              False
            </button>
          </div>
          <p className="font-normal text-sm text-black text-center px-2 py-2 border-b-2 border-slate-400">
            Successful Landing
          </p>
          <div className="grid grid-cols-2 gap-2 mt-5">
            <button
              className="rounded-md bg-lime-200 p-1 cursor-pointer hover:bg-lime-600"
              onClick={() => setLand_success(true)}
            >
              True
            </button>
            <button
              className="rounded-md bg-lime-200 p-1 cursor-pointer hover:bg-lime-600"
              onClick={() => setLand_success(false)}
            >
              False
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center w-full md:col-span-4 items-center">
            <Oval type="Spinner Type" color="grey" height={80} width={80} />
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-4  md:col-span-2 md:grid-cols-2 lg:col-span-4 h-fit ">
            {programList?.map((program, index) => (
              <div
                className="w-full bg-white p-5 rounded-md "
                key={program?.index}
              >
                <img
                  src={program?.links.mission_patch_small}
                  alt={program?.mission_name}
                  className="w-full"
                />
                <p className="text-indigo-800 text-lg font-bold text-left py-2">
                  {program?.mission_name} #{program?.flight_number}
                </p>
                <h4 className="font-bold text-lg">Mission ids:</h4>
                <ul className="px-5">
                  {program?.mission_id?.map((id) => (
                    <li className="text-blue-700 text-sm list-disc" key={id}>
                      {id}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center ">
                  <h4 className="font-bold text-lg">Launch Year:</h4>
                  <p className="text-blue-700 text-lg pl-2">
                    {program?.launch_year}
                  </p>
                </div>
                <div className="flex items-center ">
                  <h4 className="font-bold text-lg">Successful Launch:</h4>
                  <p className="text-blue-700 text-lg pl-2">
                    {program?.launch_success ? "True" : "False"}
                  </p>
                </div>
                <div className="flex items-center ">
                  <h4 className="font-bold text-lg">Successful Landing:</h4>
                  <p className="text-blue-700 text-lg pl-2">
                    {program?.rocket?.first_stage?.cores[0]?.land_success
                      ? "True"
                      : "False"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="font-bold text-base text-black text-center py-5">
        Developed By: <span className="font-normal">Sapna Singh Khatik</span>
      </div>
    </div>
  );
}

export default App;
