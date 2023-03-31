import React from "react";
import { FaAngleLeft, FaAngleRight} from "react-icons/fa";

function PageNation2() {
  return (
    <div>
      <div class="grid min-h-[90px] w-full place-items-center overflow-x-scroll rounded-lg lg:overflow-visible">
        <nav>
          <ul class="flex">
            <li>
              <a
                class="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-gray-200"
                href="#"
                aria-label="Previous"
              >     
                <FaAngleLeft/>
              </a>
            </li>
            <li>
              <a
                class="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-black p-0 text-sm text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-200"
                href="#"
              >
                1
              </a>
            </li>
            <li>
              <a
                class="mx-1 flex h-9 w-9 items-center justify-center rounded-full p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-gray-200"
                href="#"
              >
                2
              </a>
            </li>
            <li>
              <a
                class="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                href="#"
              >
                3
              </a>
            </li>
            <li>
              <a
                class="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-gray-200"
                href="#"
                aria-label="Next"
              > 
              <FaAngleRight/>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default PageNation2;
