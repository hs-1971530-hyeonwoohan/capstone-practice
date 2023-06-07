import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
// import '@fullcalendar/common/main.css'; // 수정된 경로
import Calnav from "./Calnav";
import "./Calendar.css";

function Calendar() {
  const calendarRef = useRef(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      setDate(calendarApi.getDate());
    }
  }, [calendarRef.current]);

  const handleNext = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    setDate(calendarApi.getDate());
  };

  const handlePrev = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    setDate(calendarApi.getDate());
  };

  const handleToday = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.today();
    setDate(calendarApi.getDate());
  };

  const handleViewChange = (view) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(view);
    setDate(calendarApi.getDate());
  };

  const [events, setEvents] = useState([
    // 초기 이벤트 데이터
    { title: "Event 1", date: "2023-03-18" },
    { title: "Event 2", date: "2023-03-19" },
    // ...
  ]);

  const handleDateSelect = (selectInfo) => {
    let title = prompt("이벤트 제목을 입력하세요:");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // 선택한 날짜 선택 해제

    // if (title) {
    //   calendarApi.addEvent({
    //     title: title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
    if (title) {
      let newEvent = {
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      calendarApi.addEvent(newEvent);

      // 상태 업데이트
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div className="flex flex-row ">
      <div className="w-1/6">
        <div className="flex flex-col w-full h-full ">
          <div className="">
            <Calnav />
          </div>
          <div className="flex flex-col border-b border-feay-200">
            <div className="overflow-auto h-full ">
            <h1 className="font-bold font-kr sm:text-xl px-12 py-2 text-center ">
              이번 주 할 일
            </h1>
            <FullCalendar
              plugins={[listPlugin, interactionPlugin]}
              initialView="listWeek"
              height={285}
              // height="auto"

              headerToolbar={false}
              selectable={true}
              select={handleDateSelect}
              events={events}
              // ...
            />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5 w-5/6 ">
        <h1 className="text-xl font-bold xl:text-3xl text-center mb-2">Calendar</h1>

        {/* Custom Header */}
        <div className="calendar-header grid grid-cols-8 gap-4 mb-4">
          <div className="col-span-4 ">
            <span className="ml-4 mr-4 font-bold sm:text-xl">
              {date
                ? new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    year: "numeric",
                  }).format(date)
                : ""}
            </span>
            <button
              className="border-solid border-2  -mr-0.5 px-2"
              onClick={handlePrev}
              style={{ borderColor: "#cbcbcb" }}
            >
              Prev
            </button>
            <button
              className="border-solid border-2  -mr-0.5 px-2"
              onClick={handleNext}
              style={{ borderColor: "#cbcbcb" }}
            >
              Next
            </button>
            <button
              className="border-solid border-2 px-2"
              onClick={handleToday}
              style={{ borderColor: "#cbcbcb" }}
            >
              Today
            </button>
          </div>
          <div className="col-span-3 -ml-24">
            <button
              className="border-solid border-2  -mr-0.5 px-2"
              style={{ borderColor: "#cbcbcb" }}
              onClick={() => handleViewChange("timeGridDay")}
            >
              Day
            </button>
            <button
              className="border-solid border-2  -mr-0.5 px-2"
              style={{ borderColor: "#cbcbcb" }}
              onClick={() => handleViewChange("timeGridWeek")}
            >
              Week
            </button>
            <button
              className="border-solid border-2  px-2"
              style={{ borderColor: "#cbcbcb" }}
              onClick={() => handleViewChange("dayGridMonth")}
            >
              Month
            </button>
          </div>
          <div className="col-span-1 ml-28">
            <button
              className="border-solid border-2  px-2"
              style={{ borderColor: "#cbcbcb" }}
              onClick={() => handleViewChange("listWeek")}
            >
              List
            </button>
          </div>
        </div>
        <FullCalendar
          ref={calendarRef}
          // height={620}
          height="auto"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          // headerToolbar={null}
          //   headerToolbar={{
          //   left: 'title,prev,next',
          //   center: 'today',
          //   right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          // }}
          headerToolbar={false}
          events={events}
          selectable={true}
          select={handleDateSelect}
          dayMaxEventRows={true}
          views={{
            dayGridMonth: {
              dayMaxEventRows: 2,
              moreLinkText: "more",
            },
          }}
        />
        {/* <CalendarModal open={open} onClose={() => setOpen(false)}>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <button onClick={() => addEvent(eventTitle)}>이벤트 추가</button>
        </CalendarModal> */}
      </div>
    </div>
  );
}

export default Calendar;