import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";

const ForgotPassword = () => {
  function sendLink(value:{email:string}) {
    console.log(value);
  }
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: sendLink,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email required")
        .email("You must enter email"),
    }),
  });

  return (
    <>
      <div className="w-[50%] mx-auto mt-32">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold mb-2">Couldn’t sign you in?</h2>
          <p>
            Enter your email and we'll send you a link to get back into your
            account.
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative mb-2">
            <input
              id="email"
              type="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="email"
              placeholder=" "
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#FF9900] peer"
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#FF9900]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Email
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div className=" bg-red-700 font-medium text-white p-3 rounded-lg mb-4">
              <h2>{formik.errors.email}</h2>
            </div>
          )}
                <h3 className="mt-4">
          Back to
          <Link 
            to={"/login"}
            className="text-[#FF9900] hover:text-[#FF9900] font-semibold ms-1"
          >
            Login
          </Link>
        </h3>
          <button
            //   disabled={isLoading}
            type="submit"
            className="bg-[#FF9900] hover:bg-[#e08141] px-4 py-3 rounded-lg text-white font-semibold block ms-auto mt-4"
          >
            Send Link
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
