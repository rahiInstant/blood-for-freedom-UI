import { useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import toast from "react-hot-toast";
import AuthContext from "../auth/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
const Form = () => {
  const { user, loading, logOut, googleSignIn } = useContext(AuthContext);
  const successMsg = (msg) => toast.success(msg);
  const errorMsg = (msg) => toast.error(msg);
  const axiosSecure = useAxiosSecure();

  function donarData(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const alterPhone = form["alter-phone"].value;
    const fbProfile = form["fb-profile"].value;
    const bloodGroup = form["blood-group"].value;
    const lastDonationTime = form["last-donation"].value;
    const presentAddress = form["present-address"].value;
    const weight = form["weight"].value;
    const age = form["age"].value;
    const isVaccine = form["is-vaccine"].checked;

    const donarInfo = {
      name,
      phone,
      alterPhone,
      fbProfile,
      bloodGroup,
      lastDonationTime,
      presentAddress,
      weight,
      age,
      isVaccine: parseInt(isVaccine),
    };

    console.log(donarInfo);
    axiosSecure
      .post("/donar-data", donarInfo)
      .then((res) => console.log(res?.data));
  }

  function handleGoogleSignIn() {
    googleSignIn()
      .then(() => {
        successMsg("Successfully sign in with Google!!");
      })
      .catch((error) => {
        const Msg = error.message;
        const actualMsg = Msg.slice(Msg.indexOf("/") + 1, Msg.indexOf(")"));
        errorMsg(actualMsg);
      });
  }

  function handleLogout() {
    logOut()
      .then(() => {
        successMsg("Logout successfully!!");
      })
      .catch((error) => {
        errorMsg("failed to logout!!");
        console.log(error);
      });
  }
  return (
    <div className="mb-10 mt-7 sm:mt-10 max-sm:mx-3 max-lg:mx-4 max-xl:mx-5 max-2xl:mx-6">
      <div className="p-5 rounded-lg w-full bg-white border ">
        <form onSubmit={donarData} className="">
          {/* block 01 */}
          <div className="flex flex-col sm:flex-row sm:gap-5 items-end w-full">
            <div className="w-full">
              <label
                htmlFor="mail"
                className="block text-xl font-semibold max-sm:text-lg max-sm:font-normal"
              >
                Name <span className="text-red-600">*</span>
              </label>
              <input
                required
                type="text"
                name="name"
                placeholder="your name"
                className="w-full outline-none bg-[#F3F3F3] rounded-md max-sm:p-3 p-3.5 mt-2"
              />
            </div>
            <div className="w-full mt-4 sm:mt-0">
              <label
                htmlFor="mail"
                className="block text-xl font-semibold max-sm:text-lg max-sm:font-normal"
              >
                Phone <span className="text-red-600">*</span>
              </label>
              <input
                required
                type="text"
                name="phone"
                placeholder="01452********"
                className="w-full  outline-none bg-[#F3F3F3] rounded-md max-sm:p-3 p-3.5 mt-2"
              />
            </div>
          </div>
          {/* block 02 */}
          <div className="flex flex-col sm:flex-row sm:gap-5 items-center sm:mt-4 w-full ">
            <div className="w-full mt-4 sm:mt-0">
              <label
                className="block text-xl font-semibold max-sm:text-lg max-sm:font-normal"
                htmlFor="pass"
              >
                Alternate Phone
              </label>
              <input
                name="alter-phone"
                placeholder="0154252******"
                className="w-full outline-none bg-[#F3F3F3] rounded-md max-sm:p-3 p-3.5 mt-2"
              />
            </div>
            <div className="w-full mt-4 sm:mt-0">
              <label
                htmlFor="mail"
                className="block text-xl font-semibold max-sm:text-lg max-sm:font-normal"
              >
                FB Profile <span className="text-red-600">*</span>
              </label>
              <input
                required
                type="text"
                name="fb-profile"
                placeholder="https://www.facebook.com/profile.php"
                className="w-full  outline-none bg-[#F3F3F3] rounded-md max-sm:p-3 p-3.5 mt-2"
              />
            </div>
          </div>
          {/* block 03 */}
          <div className="flex flex-col sm:flex-row gap-5 items-end sm:mt-4 w-full ">
            <div className="w-full mt-4 sm:mt-0">
              <label
                className="block text-xl font-semibold max-sm:text-lg max-sm:font-normal"
                htmlFor="pass"
              >
                Weight <span className="text-red-600">*</span>
              </label>
              <input
                name="weight"
                type="number"
                min={45}
                placeholder=">45"
                className="w-full outline-none bg-[#F3F3F3] rounded-md max-sm:p-3 p-3.5 mt-2"
              />
            </div>
            <div className="relative h-fit  border rounded-md w-full">
              <select
                name="blood-group"
                required
                className="p-3 text-lg max-sm:text-lg appearance-none font-semibold  max-sm:font-normal rounded-lg outline-none w-full"
              >
                <option className="hidden" value="">
                  -- Blood Group --
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
                <IoIosArrowDown className="text-2xl" />
              </div>
            </div>
          </div>
          {/* block 04 */}
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-5 items-end sm:mt-4 w-full">
            <div className="w-full mt-4 sm:mt-0">
              <label
                className="block text-xl font-semibold max-sm:text-lg  max-sm:font-normal"
                htmlFor="pass"
              >
                Age <span className="text-red-600">*</span>
              </label>
              <input
                required
                name="age"
                type="number"
                min={18}
                max={65}
                placeholder="18-65"
                className="w-full outline-none bg-[#F3F3F3] rounded-md max-sm:p-3 p-3.5 mt-2"
              />
            </div>
            <div className="relative h-fit  border rounded-md w-full">
              <select
                name="last-donation"
                required
                className="p-3 text-lg max-sm:text-lg max-sm:font-normal appearance-none font-semibold rounded-lg outline-none w-full"
              >
                <option className="hidden" value="">
                  -- last donation --
                </option>
                <option value="4 month">4 month before</option>
                <option value="5 month">5 month before</option>
                <option value="6 month">6 month before</option>
                <option value="1 year">1 year before</option>
                <option value="2 year">2 year before</option>
                <option value="never donate">never donate before</option>
              </select>
              <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
                <IoIosArrowDown className="text-2xl" />
              </div>
            </div>
          </div>
          {/* block 05 */}
          <div className="w-full mt-4 sm:mt-4">
            <label
              className="block text-xl font-semibold max-sm:text-lg  max-sm:font-normal"
              htmlFor="pass"
            >
              Present Address <span className="text-red-600">*</span>
            </label>
            <textarea
              name="present-address"
              placeholder="169/122 mia road,12 no word, fultoli,Chittagong, bangladesh"
              className="w-full outline-none bg-[#F3F3F3] rounded-md p-3 mt-2"
            />
          </div>
          <label className="text-xl max-sm:text-lg font-medium max-sm:font-normal mt-2 select-none flex items-center gap-3">
            <input
              required
              type="checkbox"
              name="is-vaccine"
              id=""
              className="max-sm:w-5 w-6 h-6 max-sm:h-5"
            />{" "}
            Take vaccine more than one month ago.
          </label>
          {user ? (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleLogout}
                className="block w-full mt-7 py-3 border rounded-lg border-red-700 text-xl font-medium hover:bg-red-700 hover:text-white duration-150"
              >
                Log Out
              </button>
              <button
                className="block w-full mt-7 py-3 border rounded-lg border-green-700 text-xl font-medium hover:bg-green-700 hover:text-white duration-150"
                type="submit"
              >
                Submit Info
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="block w-full mt-7 py-3 border rounded-lg border-green-700 text-xl font-medium hover:bg-green-700 hover:text-white duration-150"
            >
              Sign in with Google
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
