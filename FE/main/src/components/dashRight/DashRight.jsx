import { CashIcon, CreditCardIcon } from "@heroicons/react/outline";
import React from "react";
import { InvestDB } from "../dashLeft/utils/InvestementDB";
import Chart from "./Chart";
import PortfolioItem from "./PortfolioItem";
import { AiOutlineInfoCircle } from "react-icons/ai";

import InvestItem from './../dashLeft/InvestItem';
function DashRight() {
  return (
    <div className="col-span-3 items-start justify-start flex flex-col w-full pb-6 flex-shrink-0">
      {/* top section */}
      <div className="w-full items-start justify-start flex flex-col px-12 py-6 flex-shrink-0">
        <h1 className="text-xl font-bold xl:text-3xl mb-2">Recent StudyRoom</h1>
        <div className="w-full space-y-4 overflow-y-auto max-h-[350px] py-5 -mb-4 scrollbar-hide">
        
         {/* <div className="w-full space-y-4 max-h-[350px] py-5"> */}
          <div className="flex flex-col gap-4">
          {InvestDB.map((item) => (
            <div className="border-2 rounded-lg bg-[#e2e4e4] py-4">
              <InvestItem item={item} key={item.id} imgae={item.id}/>
            </div>
            
          ))}
          </div>
          
        </div>
      </div>
      {/* Recent posts */}
      <div className="border-t border-gray-200 w-full my-4" />
      <div className="w-full px-12 py">
        <div id="last-users">
          <h1 className="text-xl font-bold xl:text-3xl py-4">Recent posts</h1>
          <div className="">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-teal-500">
                <th className="text-left py-3 px-2 rounded-l-lg">Username</th>
                <th className="text-left py-3 px-2">Title</th>
                <th className="text-left py-3 px-2">Date</th>
                <th className="text-left py-3 px-2">Time</th>
                <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
              </thead>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-2 font-bold">
                  <div className="inline-flex space-x-3 items-center">
                    <span>
                      <img
                        className="rounded-full w-8 h-8"
                        src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      />
                    </span>
                    <span>Unknown</span>
                  </div>
                </td>
                <td className="py-3 px-2">제목1</td>
                <td className="py-3 px-2">2023-05-18</td>
                <td className="py-3 px-2">30분전</td>
                <td className="py-3 px-2">
                  <div className="inline-flex items-center space-x-3">
                    <a href="" title="Edit" class="hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </a>
                    <a href="" title="Edit password" className="hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </a>
                    <a href="" title="Suspend user" className="hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </a>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-2 font-bold">
                  <div className="inline-flex space-x-3 items-center">
                    <span>
                      <img
                        className="rounded-full w-8 h-8"
                        src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      />
                    </span>
                    <span>Unknown</span>
                  </div>
                </td>
                <td className="py-3 px-2">제목2</td>
                <td className="py-3 px-2">2023-05-18</td>
                <td className="py-3 px-2">3시간 전</td>
                <td className="py-3 px-2">
                  <div className="inline-flex items-center space-x-3">
                    <a href="" title="Edit" className="hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </a>
                    <a href="" title="Edit password" className="hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </a>
                    <a href="" title="Suspend user" className="hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </a>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-2 font-bold">
                  <div className="inline-flex space-x-3 items-center">
                    <span>
                      <img
                        className="rounded-full w-8 h-8"
                        src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      />
                    </span>
                    <span>Unknown</span>
                  </div>
                </td>
                <td className="py-3 px-2">제목3</td>
                <td className="py-3 px-2">2023-05-18</td>
                <td className="py-3 px-2">3일전</td>
                <td className="py-3 px-2">
                  <div class="inline-flex items-center space-x-3">
                    <a href="" title="Edit" className="hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </a>
                    <a href="" title="Edit password" className="hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </a>
                    <a href="" title="Suspend user" className="hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </a>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>

        {/* <h1 className="text-xl font-bold xl:text-3xl py-4">Recent posts</h1>
        <div className="flex items-center justify-center space-x-6 overflow-x-auto w-full py-4">
          {InvestDB.map((item) => (
            <PortfolioItem item={item} key={item.id} />
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default DashRight;
