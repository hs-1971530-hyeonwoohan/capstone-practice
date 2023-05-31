import React from 'react'
import studyicon from './studyicon.png'
import boardicon from './boardicon.png'
import calendaricon from './calendaricon.png'

function NotiDropDown() {
  return (
    <div className='flex flex-col dropdownnoti'>
      <div className='text-center font-kr font-bold text-xl  border-b border-feay-200 shadow-md py-2'>알림</div>
      <div className='bg-gray-200 w-full h-64 overflow-y-auto'>
        <div className='flex flex-col gap-4 py-4 px-4'>
            <div className='border-2 rounded-lg bg-white px-4 py-4'>
              <div className='flex justify-start items-center'>
                <img src={studyicon} alt="" className='w-[20px]'/>
              
                <div className='font-semibold text-lg ml-2'>Recent StudyRoom</div>
                <div className='ml-4 text-sm '>어제 오후 04:21</div>
              </div>
              <div className='flex justify-between items-center mt-2'>
              <div>열정도 100포인트를 획득하였습니다.</div>
              <img
                    src="https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt=""
                    className="object-cover w-12 h-10 ml-2"
                  />
            </div>
            </div>
            <div className='border-2 rounded-lg bg-white px-4 py-4'>
              <div className='flex justify-start items-center'>
                <img src={boardicon} alt="" className='w-[20px]'/>
              
                <div className='font-semibold text-lg ml-2'>Board</div>
                <div className='ml-4 text-sm '>어제 오후 02:21</div>
              </div>
              <div className='flex justify-between items-center mt-2'>
              <div>글을 게시하였습니다.</div>
            </div>
            </div>
            <div className='border-2 rounded-lg bg-white px-4 py-4'>
              <div className='flex justify-start items-center'>
                <img src={calendaricon} alt="" className='w-[20px]'/>
              
                <div className='font-semibold text-lg ml-2'>Calendar</div>
                <div className='ml-4 text-sm '>어제 오후 01:21</div>
              </div>
              <div className='flex justify-between items-center mt-2'>
              <div>일정을 등록하셨습니다.</div>
            </div>
            </div>
        </div>
        </div>
    </div>
        
  )
}

export default NotiDropDown