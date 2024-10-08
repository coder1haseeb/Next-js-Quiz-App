import React from "react";
import logo from "../assets/r1.png";

const Navbar = () => {
  return (
    <header class="text-gray-600 body-font ">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={logo} alt="logo" className="size-20  rounded-full" />
          <span class="ml-3 text-xl text-white">Quizera</span>
        </a>
        <nav class=" text-white md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a class="mr-5 hover:text-blue-700">Home</a>
          <a class="mr-5 hover:text-blue-700">About</a>
        </nav>
        <button class="  inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Quiz
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
