import { GiftIcon, HomeIcon, PencilIcon, TicketIcon } from "@heroicons/react/outline";
import image1 from "./../../../imgs/thumbnail/thumbnail1.jpg";
import image2 from "./../../../imgs/thumbnail/thumbnail2.jpg"
import image3 from "./../../../imgs/thumbnail/thumbnail3.jpg"

export const InvestDB = [
  {
    id:0,
    image: image1,
    title: "Study With Me",
    desc: " Computer Science ",
    price: " 5/8 ",
    upOrDown: "up",
    percent: "last 5minutes",
    icon: <TicketIcon className="invest-icon" />,
  },
  {
    id:1,
    image: image2,
    title: "All Night Study",
    desc: "public official",
    price: "2/8",
    upOrDown: "down",
    percent: "last 3day",
    icon: <HomeIcon className="invest-icon" />,
  },
  {
    id:2,
    image: image3,
    title: "D-day 18",
    desc: "CPA prep",
    price: " 3/8 ",
    upOrDown: "up",
    percent: "last week",
    icon: <PencilIcon className="invest-icon" />,
  },
  {
    id:3,
    image: image3,
    title: "Cam On, plz",
    desc: "Interaction design",
    price: "1/8",
    upOrDown: "down",
    percent: "0.25%",
    icon: <GiftIcon className="invest-icon" />,
  },
];