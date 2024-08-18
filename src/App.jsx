import { useContext, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Form from "./components/Form";
import AuthContext from "./auth/AuthContext";
import Urgent from "./components/Urgent";

function App() {
  const { user } = useContext(AuthContext);
  const [currentAction, setCurrentAction] = useState("");
  const userAction = {
    donate: { component: <Form />, text: "I want to donate blood." },
    find: { component: <Card />, text: "I want to find a blood donar." },
    urgent: { component: <Urgent />, text: "Urgently need a blood donar." },
  };

  return (
    <div className="max-w-7xl mx-auto mt-4 max-sm:mt-2">
      <div className="flex justify-between items-center max-sm:mx-3 max-lg:mx-4 max-xl:mx-5 max-2xl:mx-6">
        <h1 className="max-sm:text-[30px] sm:text-[35px] md:text-[40px] lg:text-[45px] text-red-700 font-bold">
          Blood
        </h1>
        {user ? (
          <div className="mt-2 py-2 px-4 text-gray-800 rounded-lg border w-fit font-semibold border-gray-500">
            {user.displayName}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="border select-none p-4 max-sm:mx-3 max-lg:mx-4 max-xl:mx-5 max-2xl:mx-6 rounded-lg mt-3 flex md:flex-row flex-col gap-5">
        {Object.keys(userAction).map((item, id) => {
          return (
            <label
              className={`border py-4 max-sm:py-3 px-3 rounded-lg w-full font-medium cursor-pointer ${item == currentAction ? "bg-cyan-700 text-white" : ""}`}
              onClick={() => setCurrentAction(item)}
              key={id}
            >
              <input type="radio" name="action" id="" /> {userAction[item].text}
            </label>
          );
        })}
      </div>
      {currentAction ? userAction[currentAction].component : ""}
      {/* <Form />
      <Card /> */}
    </div>
  );
}

export default App;
