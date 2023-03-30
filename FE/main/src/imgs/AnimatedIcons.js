import React from 'react';
import fire1 from '../imgs/fireIcon.gif';
import fire2 from '../imgs/fireIcon2.gif';
import fire3 from '../imgs/fireIcon3.gif';
import fire4 from '../imgs/fireIcon4.gif';
import fire5 from '../imgs/fireIcon5.gif';
import fire6 from '../imgs/fireIcon6.gif';


const fireIcons = {
  1: fire1,
  2: fire2,
  3: fire3,
  4: fire4,
  5: fire5,
  6: fire6
};
{/* <AnimatedIcon fire={fireValue} /> {/* 상위 컴포넌트에서 값을 전달하는 방법. fire 값을 AnimatedIcon 컴포넌트에 전달 */}
const AnimatedIcon = ({ fire }) => {
  const imagePath = fireIcons[fire] || fire1;
  return (
    <div className='flex'>
      <img className='w-7 h-7' src={imagePath} alt="애니메이션 아이콘"/>
    </div>
  );
};

export default AnimatedIcon;