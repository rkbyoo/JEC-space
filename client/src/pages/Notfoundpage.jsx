import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/image.png';

function Notfoundpage() {
  return (
    <div
      className="relative bg-black h-screen w-full flex items-center"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Optional dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />

      <div className="relative z-10 flex flex-col justify-center items-start px-6 md:px-20 max-w-[750px]">
        <h3 className="text-[#F3F3F3] text-8xl md:text-[200px] font-bold font-poppins">
          404
        </h3>
        <h3 className="text-white text-3xl xl:text-[57px] font-semibold font-poppins whitespace-nowrap">
          Page Not Found
        </h3>
        <h3 className="text-[#F3F3F3] text-2xl xl:text-[32px] font-medium font-poppins xl:w-[651px] mt-10 mb-20">
          Sorry, we couldn’t find the page you’re looking for
        </h3>
        <div>
          <Link to="/" className="flex items-center space-x-2">
          <div className="text-[#581DFF] text-[32px] font-medium font-poppins">
            Back to home
          </div>
          <svg
            className="pt-1"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.9375 26.375C8.625 26.0625 8.46875 25.6925 8.46875 25.265C8.46875 24.8383 8.625 24.4688 8.9375 24.1562L18.0938 15L8.90625 5.8125C8.61458 5.52083 8.46875 5.15625 8.46875 4.71875C8.46875 4.28125 8.625 3.90625 8.9375 3.59375C9.25 3.28125 9.62 3.125 10.0475 3.125C10.4742 3.125 10.8438 3.28125 11.1562 3.59375L21.6563 14.125C21.7813 14.25 21.87 14.3854 21.9225 14.5312C21.9742 14.6771 22 14.8333 22 15C22 15.1667 21.9742 15.3229 21.9225 15.4688C21.87 15.6146 21.7813 15.75 21.6563 15.875L11.125 26.4062C10.8333 26.6979 10.4742 26.8438 10.0475 26.8438C9.62 26.8438 9.25 26.6875 8.9375 26.375Z"
              fill="#581DFF"
            />
          </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Notfoundpage;
