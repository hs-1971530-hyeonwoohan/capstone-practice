import React from 'react'

const tempStudyTime = [
    {userid : 1, time : "10:22:00"},
    {userid : 2, time : "8:56:47"},
    {userid : 3, time : "8:22:21"},
    {userid : 4, time : "6:32:11"},
    {userid : 5, time : "4:48:35"},
    {userid : 6, time : "1:03:43"},
]

function Ranking() {
  return (
    <div className='flex'>
        <span className='pl-2 mt-1 font-semibold text-2xl'>Ranking</span>
        <div>
            {/*vertical text slide 추가*/}
        </div>
    </div>
  )
}

export default Ranking