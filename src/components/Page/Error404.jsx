import { Link } from "react-router-dom";

const Error404 = () => {
    return (
<div className="flex flex-col items-center justify-center min-h-screen">
  <h1 className="text-4xl font-bold text-black my-10">Oops! Nothing Found.</h1>
  <p className="text-gray-800 my-2 text-2xl">
            Sorry about that! Please visit our homepage to get where you need to go.
          </p>
  <Link to="/" className="bg-indigo-600 py-3 px-3 text-white font-bold rounded-lg mt-5">
    Go Back To Home
  </Link>
  
  <div className="flex flex-col lg:flex-row justify-center items-center lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 gap-16 md:gap-28">
    <div className="w-full xl:w-1/2 relative pb-12 lg:pb-0 xl:pt-24">
      <div className="relative">
        <div className="absolute">
        </div>
        <div>
          <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt="Error 404" />
        </div>
      </div>
    </div>
    <div>
      <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="Illustration" />
    </div>
  </div>
</div>

    );
};

export default Error404;