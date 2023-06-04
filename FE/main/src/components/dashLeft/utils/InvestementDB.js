import { GiftIcon, HomeIcon, PencilIcon, TicketIcon } from "@heroicons/react/outline";

export const InvestDB = [
  {
    id:0,
    title: "Study With Me",
    desc: " Computer Science ",
    price: " 5/8 ",
    upOrDown: "up",
    percent: "last 5minutes",
    icon: <TicketIcon className="invest-icon" />,
  },
  {
    id:1,
    title: "All Night Study",
    desc: "public official",
    price: "2/8",
    upOrDown: "down",
    percent: "last 3day",
    icon: <HomeIcon className="invest-icon" />,
  },
  {
    id:2,
    title: "D-day 18",
    desc: "CPA prep",
    price: " 3/8 ",
    upOrDown: "up",
    percent: "last week",
    icon: <PencilIcon className="invest-icon" />,
  },
  {
    id:3,
    title: "Cam On, plz",
    desc: "Interaction design",
    price: "1/8",
    upOrDown: "down",
    percent: "0.25%",
    icon: <GiftIcon className="invest-icon" />,
  },
];