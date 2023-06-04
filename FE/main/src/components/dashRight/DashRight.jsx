import { CashIcon, CreditCardIcon } from "@heroicons/react/outline";
import React, {useState, useEffect} from "react";
import { InvestDB } from "../dashLeft/utils/InvestementDB";
import Chart from "./Chart";
import PortfolioItem from "./PortfolioItem";
import { AiOutlineInfoCircle } from "react-icons/ai";
import axios from "axios";

import InvestItem from './../dashLeft/InvestItem';
function DashRight() {

  // 한현우 수정 : state, username(mid)
  const [joinedStudyRooms, setJoinedStudyRooms] = useState([]);
  const [myPosts, setMyPosts] = useState({});
  const [lastThreePosts, setLastThreePosts] = useState([]);
  const username = localStorage.getItem('mid');

  // 한현우 수정 : joinedStudyRoom, myPosts 불러오기 (useEffect)
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    // let date = new Date();
    // let today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const fetchjoinedStudyRooms = async() => {
      try{
        const joinedStudyRoomsRes = await axios.get(`https://passionroad2.com/api/dashboard/joinedStudyRooms`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if(joinedStudyRoomsRes.status === 200){
          // let joinedStudyRoomsObj = {...joinedStudyRoomsRes.data};
          let joinedStudyRoomsArray = Object.values(joinedStudyRoomsRes.data);
          setJoinedStudyRooms(joinedStudyRoomsArray); // 현재 참가한 스터디룸 객체
        }else{
          console.error('An error occurred while fetching the data.');
        }
      }catch(error){
        console.error('An error occurred while fetching the data:', error);
      }
    };

    const fetchMyPosts = async() => {
      try{
        const myPostsRes = await axios.get(`https://passionroad2.com/api/dashboard/myPosts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if(myPostsRes.status === 200){
          let myPostsObj = {...myPostsRes.data};
          setMyPosts(myPostsObj);  // 오늘, 어제, 그제 공부시간
        }else{
          console.error('An error occurred while fetching the data.');
        }
      }catch(error){
        console.error('An error occurred while fetching the data:', error);
      }
    };

    fetchjoinedStudyRooms();
    fetchMyPosts();
  }, []);

  // 한현우 수정 : 받아온 데이터 확인, 최근 3개 원소 추출
  useEffect(() => {
    console.log(`joinedStudyRooms: (${JSON.stringify(joinedStudyRooms, null, 2)})`);
  }, [joinedStudyRooms]);
  
  useEffect(() => {
    // console.log(`myPosts: (${JSON.stringify(myPosts, null, 2)})`);

    // 객체 -> 배열
    let postsArray = Object.values(myPosts);

    // postId 를 기준으로 배열 정렬
    postsArray.sort((a, b) => {
      // postId 를 기준으로 내림차순
      return b.postId - a.postId;
    });

    // 정렬된 항목의 처음 3개 항목 추출 (최근 3개 포스트)
    setLastThreePosts(postsArray.slice(0, 3));
    
    // 확인
    console.log(`sortedPosts: ${JSON.stringify(postsArray, null, 2)}`);
  }, [myPosts]);

  useEffect(() => {
    console.log(`lastThreePosts: ${JSON.stringify(lastThreePosts, null, 2)}`);
  }, [lastThreePosts]);



  return (
    <div className="col-span-3 items-start justify-start flex flex-col w-full pb-6">
      {/* top section */}
      <div className="w-full items-start justify-start flex flex-col px-12 py-6">
        <h1 className="text-xl font-bold xl:text-3xl ">Recent StudyRoom</h1>
        <div className="w-full space-y-4 overflow-y-auto max-h-[350px] py-5 scrollbar-hide">
        
         {/* <div className="w-full space-y-4 max-h-[350px] py-5"> */}
          <div className="flex flex-col gap-4">
            {/* 한현우 수정 : Recent StudyRoom, InvestItem 컴포넌트 내용도 수정 */}
          {joinedStudyRooms.map((studyRoom) => (
            <div className="border-2 rounded-lg bg-[#e2e4e4] py-4">
              <InvestItem studyRoom={studyRoom} />
            </div>
            
          ))}
          </div>
          
        </div>
      </div>
      {/* Recent posts */}
      {/* 한현우 수정 : 최근 포스트의 사용자이름, 제목, 날짜, 시간 */}
      <div className="border-t border-gray-200 w-full my-4" />
      <div className="w-full px-12 py">
        <div id="last-users">
          <h1 className="text-xl font-bold xl:text-3xl py-4">Recent Posts</h1>
          <div className="">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-teal-500">
                <th className="text-left py-3 px-2 rounded-l-lg">Username</th>
                <th className="text-left py-3 px-2">Title</th>
                <th className="text-left py-3 px-2">Date</th>
                <th className="text-left py-3 px-2">Time</th>
                <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
              </thead>

              
                {
                /* // map 으로 배열 순환하며 각 행 생성 */
                lastThreePosts.map((post, index) => (

                  <tr className="border-b border-gray-700">
                <td className="py-3 px-2 font-bold">
                  <div className="inline-flex space-x-3 items-center">
                    <span>
                      <img
                        className="rounded-full w-8 h-8"
                        src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      />
                    </span>
                    <span>
                      {username}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2">{post.title}</td>
                <td className="py-3 px-2">{`${post.regDate[0]}-${post.regDate[1]}-${post.regDate[2]}`}</td>
                <td className="py-3 px-2">{`${post.regDate[3]}:${post.regDate[4]}`}</td>
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
                ))
                }
                
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