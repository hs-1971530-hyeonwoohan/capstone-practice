import { useInfiniteQuery } from "react-query";
import { getStudyRoomList } from "../../api/axios.js";
import { FaUserAlt, FaAngleDoubleUp } from "react-icons/fa";
import AnimatedIcon from "../../imgs/AnimatedIcons";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
const fireicons = [
  {
    fire: 6,
  },
  {
    fire: 6,
  },
  {
    fire: 5,
  },
  {
    fire: 4,
  },
  {
    fire: 3,
  },
  {
    fire: 2,
  },
  {
    fire: 1,
  },
];
const tempRooms = [
  {
    hashTag: "#공시, #CPA, #변리사",
  },
  {
    hashTag: "#코딩테스트",
  },
  {
    hashTag: "#공시, #CPA, #변리사",
  },

  {
    hashTag: "#중간고사, #내신",
  },
  {
    hashTag: "#수능",
  },
  {
    hashTag: "",
  },
];

export default function StudyRoomList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(
      "studyRoomList",
      ({ pageParam = 1 }) => getStudyRoomList(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          console.log("lastPage :", lastPage); // Debugging line
          return lastPage.hasNext ? lastPage.page + 2 : false;
        },
      }
    );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className="mx-20 mt-8">
      <div className="p-2 mt-2 font-semibold text-2xl">Now Studying</div>
      <div className="grid grid-cols-6 min-h-[h-28] max-h-[h-28] mx-auto w-full content-center ">
        {data.pages.map((list, i) => (
          <React.Fragment key={i}>
            {list &&
              list.contentList &&
              list.contentList.map((room) => (
                <Link
                  to={`/room`} state={{ sessionName: `${room.title}` }}
                >
                  <div
                    className="flex min-w-[w-28] max-w-[w-28] px-2 py-4 relative"
                    key={room.id}
                  >
                    <div className="mx-1 my-1 text-white absolute">
                      <div>
                        <FaUserAlt />
                        <span>1/8</span>
                      </div>
                    </div>
                    <div>
                      <img
                        src="https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt=""
                        className="object-cover cursor-pointer rounded"
                      />
                      <div className="w-full pt-2 cursor-pointer flex justify-between">
                        <div className="pt">{room.title}</div>
                        <div className="pr-2">
                          <AnimatedIcon
                            fire={
                              fireicons[
                                Math.floor(Math.random() * fireicons.length)
                              ].fire
                            }
                          />
                        </div>
                      </div>
                      <div className="text-sm text-gray-300">
                        {
                          tempRooms[
                            Math.floor(Math.random() * tempRooms.length)
                          ].hashTag
                        }
                      </div>
                    </div>
                    {/*icon 집어넣을 자리*/}
                  </div>
                </Link>
              ))}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            "Loading more..."
          ) : hasNextPage ? (
            <div className="relative mt-6">
              <hr className="absolute top-1/2 transform -translate-y-1/2 border-gray-200 w-full" />
              <button className="p-2 bg-white items-center text-gray-500 border-2 border-spacing-24 px-6 rounded-full shadow hover:shadow-md relative flex justify-center mx-auto">
                <AiOutlinePlus className=" text-gray-500" />
                <span className="ml-2">더보기</span>
              </button>
            </div>
          ) : (
            <div className="relative mt-6">
              <hr className="absolute top-1/2 transform -translate-y-1/2 " />

              <span className="ml-2 cursor-pointer ">
                <FaAngleDoubleUp
                  className="hover:text-gray-200"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                />
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
