import React from "react";
import InvestItem from "./InvestItem";
import { InvestDB } from "./utils/InvestementDB";
import BenefitModal from "../benefitmodal/BenefitModal";
import { useState } from "react";
import { HiOutlineBell } from "react-icons/hi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Chart from "./../dashRight/Chart";
import RecordModal from "./RecordModal";
import Tooltip from "./Tooltip";
import { useEffect } from "react";
import axios from "axios";
function DashLeft() {
  const [open, setOpen] = useState(false);
  const [Rcopen, setRcOpen] = useState(false);
  // 한현우 수정 : state 생성
  const [passionroad, setPassionroad] = useState(0);
  const [studyTime, setStudyTime] = useState({});

  // 한현우 수정 : passionroad, studyTime 불러오기 (useEffect)
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    // let date = new Date();
    // let today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const fetchPassionroad = async() => {
      try{
        const passionRes = await axios.get(`https://passionroad2.com/api/dashboard/passionroad`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if(passionRes.status === 200){
          setPassionroad(passionRes.data);  // 총 공부시간 Long 데이터
        }else{
          console.error('An error occurred while fetching the data.');
        }
      }catch(error){
        console.error('An error occurred while fetching the data:', error);
      }
    };

    const fetchRecentStudyTimes = async() => {
      try{
        const studyTimeRes = await axios.get(`https://passionroad2.com/api/dashboard/recentStudyTimes`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if(studyTimeRes.status === 200){
          let studyTimeObj = {...studyTimeRes.data};
          // let studyTimeArray = Object.values(studyTimeRes.data);
          setStudyTime(studyTimeObj);  // 오늘, 어제, 그제 공부시간
        }else{
          console.error('An error occurred while fetching the data.');
        }
      }catch(error){
        console.error('An error occurred while fetching the data:', error);
      }
    };

    fetchPassionroad();
    fetchRecentStudyTimes();
  }, []);

  // 한현우 수정 : 받아온 데이터 확인
  useEffect(() => {
    console.log('passionroad: ' + passionroad);
  }, [passionroad]);
  
  useEffect(() => {
    console.log(`studyTime: (${JSON.stringify(studyTime, null, 2)})`);
  }, [studyTime]);
  

  return (
    <div className="col-span-2 min-h-[90vh] max-h-[90vh] border-r border-feay-200 items-start justify-start flex flex-col  w-full ">
      {/*top section*/}
      <h1 className="text-xl font-bold xl:text-3xl px-12 py-6">
        {/* 한현우 수정 : mid */}
        {localStorage.getItem('mid')}
        <span className="text-2xl font-normal text-gray-500">
          님의 공부기록
        </span>
      </h1>
      {/* 한현우 수정 : 열정도 텍스트 */}
      <div className="w-full flex items-start justify-start flex-col px-12 pt-6 pb-6">
        <h1 className="font-bold text-xl xl:text-2xl pb-2 font-kr">
          열정도 : <span className="ml-0 mr-4 text-teal-600">Lv.{Math.floor(passionroad / 100)}</span>
            {/* 열정도 : <span className="text-teal-600">Lv.3</span>
            <span className="text-teal-600">{`${passionroad % 100}% 달성!`}</span> */}
        </h1>

        {/* 한현우 수정 : 열정도 게이지*/}
        <div className="h-32 w-full pt-3">
          <div className="w-full h-4 bg-gray-100 rounded">
            <div className="w-4 h-full bg-gradient-to-r from-green-400 to-blue-500 rounded animate-fill duration-[2s]"></div>
          </div>
          <div className="flex justify-end">
            {/* 한현우 수정 : 달성 퍼센트*/}
            {/* <div className="pr-1 pt-2 text-gray-400 font-kr">{`${passionroad % 100}% 달성!`}</div> */}
          </div>
          <div className="font-kr pt-2">
            <div className="font-bold">당신의 열정을 보여주세요!</div>
            <div className="flex justify-between">
              <div className="text-gray-400">
                {/* 한현우 수정 : 남은경험치 값 */}
                다음 레벨까지 남은 경험치: {100 - (passionroad % 100)}
              </div>
              <button
                className="px-2 py-1 rounded text-white bg-blue-500 hover:bg-blue-400 cursor-pointer "
                onClick={() => setOpen(true)}
              >
                혜택
              </button>
            </div>

            <BenefitModal open={open} onClose={() => setOpen(false)}>
              <div className="text-center h-76 w-64">
                <HiOutlineBell size={56} className="mx-auto text-blue-400" />

                <div className="mx-auto my-4 w-48">
                  <h3 className="text-lg font-black text-gray-800">
                    혜택
                  </h3>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde velit nisi magnam similique aperiam numquam ipsam. Magni quidem illum voluptate alias! Consequuntur iusto id debitis deserunt iste reiciendis autem odio.
                  </p>
                </div>
                <div className="flex gap-4 ">
                  <button
                    className="btn btn-light w-full"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </BenefitModal>
          </div>
        </div>
      </div>
      <div className="w-full border-b border-gray-200 pt-1"></div>

      {/* 한현우 수정 : 사용하지 않는 component 삭제 */}

      {/* <div className="md:flex gap-2  items-center justify-center w-full lg:space-y-0 space-y-4  lg:space-x-4  px-12 mt-8">
        <div className="space-y-6 w-full border-2 border-gray-300 items-center justify-center flex flex-col ">
          {/* <span className="py-4 px-4 rounded-full shadow-lg shadow-gray-300 items-center justify-center flex">
            <CashIcon className="w-8 h-8 stroke-1 " />
          </span> *}
          <div className="flex">
            <span className="flex justify-center font-semibold text-gray-500 text-base pt-4">
              오늘 공부 시간
              
              <Tooltip />
            </span>

          </div>
          <RecordModal Rcopen={Rcopen} RconClose={() => setRcOpen(false)}>
              <div className="text-center h-76 w-64">
                <HiOutlineBell size={56} className="mx-auto text-blue-400" />

                <div className="mx-auto my-4 w-48">
                  <h3 className="text-lg font-black text-gray-800">
                    혜택
                  </h3>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde velit nisi magnam similique aperiam numquam ipsam. Magni quidem illum voluptate alias! Consequuntur iusto id debitis deserunt iste reiciendis autem odio.
                  </p>
                </div>
                <div className="flex gap-4 ">
                  <button
                    className="btn btn-light w-full"
                    onClick={() => setRcOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </RecordModal>

          <span className="items-center justify-center">
            <div className="font-light text-5xl text-gray-700 mb-4">
              00:00:00
            </div>
          </span>
          {/* <span className="items-center justify-center flex flex-col">
            <h2> On Time </h2>
            <h2 className="font-bold text-xl">temp </h2>
          </span> *}
        </div>
        {/* duplicate above ☝ *}
        <div className="space-y-6 w-full border-2 border-gray-300 items-center justify-center flex flex-col  ">
          {/* <span className="py-4 px-4 rounded-full shadow-lg shadow-gray-300 items-center justify-center flex">
            <CreditCardIcon className="w-8 h-8 stroke-1" />
          </span> *}
          <span className="font-semibold text-gray-500 text-base pt-4">
            일 평균 공부 시간(30일)
          </span>
          <span className="items-center justify-center">
            <div className="font-light text-5xl text-gray-700 mb-4">
              00:00:00
            </div>
          </span>
          {/* <span className="items-center justify-center flex flex-col">
            <h2> Round-Ups </h2>
            <h2 className="font-bold text-xl">temp </h2>
          </span> *}
        </div>
        <div className="space-y-6 w-full border-2 border-gray-300 items-center justify-center flex flex-col">
          {/*bg-[#BFFA00] pt-6 items-center justify-between flex flex-col w-full  *}
          {/* <span className="items-center justify-center flex flex-col w-full py-6">
            <h3> temp </h3>
            <h1 className="text-black font-bold text-xl 2xl:text-3xl">
              temp
            </h1>
          </span> *}
          <span className="font-semibold text-gray-500 text-base pt-4">
            전체 공부 시간
          </span>
          {/* <div className="bg-black items-center justify-center flex text-white w-full py-3 ">
            <h1> temp </h1>
          </div> *}
          <span className="items-center justify-center">
            <div className="font-light text-5xl text-gray-700 mb-4">
              00:00:00
            </div>
          </span>
          {/* <span className="items-center justify-center flex flex-col">
            <h2> Round-Ups </h2>
            <h2 className="font-bold text-xl">temp </h2>
          </span> *}
        </div>
      </div> */}
      
      {/* chart */}
      <div className="w-full items-start justify-start flex flex-col px-12 py-2 ">
        {/* 한현우 수정 : <h1/>, Chart prop */}
        <h1 className="text-xl font-bold xl:text-3xl py-4">Recent StudyTime</h1>  
        <Chart studyTimeData={studyTime}/>
      </div>
    </div>
  );
}

export default DashLeft;