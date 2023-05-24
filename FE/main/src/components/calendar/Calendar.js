import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import '@fullcalendar/common/main.css'; // 수정된 경로
import Calnav from "./Calnav"

function Calendar() {
  const handleDateSelect = (selectInfo) => {
    let title = prompt('이벤트 제목을 입력하세요:');
    let calendarApi = selectInfo.view.calendar;
  
    calendarApi.unselect(); // 선택한 날짜 선택 해제
  
    if (title) {
      calendarApi.addEvent({
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };  

  return (
    <div className='flex flex-row'>
      <div className='w-1/6'>
      <Calnav />
      </div>
      <div className='pt-5 w-5/6'>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        events={[
          { title: 'event 1', date: '2023-03-18' },
          { title: 'event 2', date: '2023-03-19' },
        ]}
        selectable={true} // 드래그 선택 가능
        select={handleDateSelect} // 선택한 날짜와 시간 값 출력
        dayMaxEventRows={true} // 일정이 많아졌을 때 버튼으로 펼쳐서 볼 수 있게 함
        views={{
          dayGridMonth: {
            dayMaxEventRows: 2, // 2줄까지만 보이도록 설정
            moreLinkText: 'more', // 더보기 버튼 텍스트 설정
          },
        }}


      />
      </div>
    </div>
  );
}

export default Calendar;