import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    companyCode: "",
    region: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    //save user information to localStorage
    localStorage.setItem("userEmail", JSON.stringify(values));

    //routing list page
    navigate("/posts");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          User Login
        </h2>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="space-y-4" noValidate={false}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Code
              </label>
              <Field
                name="companyCode"
                type="text"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <Field
                name="region"
                type="text"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <Field
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Field
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
