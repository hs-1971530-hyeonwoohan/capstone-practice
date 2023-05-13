import DateConversion from "../dateconversion/DateConversion";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const PostList2 = React.memo(({ posts }) => {
    const [formattedPosts, setFormattedPosts] = useState([]);
  
    const date = (regD, modD) => {
      console.log("FreeBoard date함수 실행 redD, modD :", regD, modD);
      const regDate = regD;
      const modDate = modD ? modD : null;
  
      const displayDate = modDate ? modDate : regDate;
      const displayText = DateConversion(displayDate);
  
      return displayText;
    };
  
   useEffect(() => {
    const newFormattedPosts = posts.dtoList.map((post) => ({
      ...post,
      displayDate: date(post.regDate, post.modDate),
    }));
    setFormattedPosts(newFormattedPosts);
  }, [posts]);
  
    return (
      <div className=" flex flex-col divide-y divide-gray-200">

        {console.log(" PostsLists 실행 됨.")}
        {console.log(" PostsLists로 들어온 데이터 :", posts)}
        {console.log(
          " PostsLists로 들어온 데이터 중 posts.dtoList :",
          posts.dtoList
        )}
        {formattedPosts.map((post) => (
          <div key={post.postId} className="w-full h-8">
            {console.log(" PostsLists로 들어온 post.postId", post.postId)}
            {/*<a
            href={post.url}
            className="block p-1 rounded-lg hover:bg-gray-100 bg-black"
      />*/}
            <div className="flex pt-1">
              <div className="basis-3/4 px-2  hover:underline hover:text-blue-500 ">
                <span className="pl-3 text-base text-black mr-1 hover:underline hover:text-blue-500 cursor-pointer">
                  <Link
                    to={`/post/${post.postId}`}
                    state={{
                      postId: `${post.postId}`, // or a valid postId, if needed
                      authorId: `${post.authorId}`,
                      writer: `${post.writer}`,
                      content: `${post.content}`,
                      title: `${post.title}`,
                      date: date(post.regDate, post.modDate)
                    }}
                  >
                    {post.title}
                  </Link>
                </span>
                <span className="text-base text-blue-500">
                  {}
                </span>
              </div>
              <div className="flex justify-items-stretch">
                <span className="w-28 h-6 min-w-[112px] pr-2 cursor-pointer">
                  {post.writer}
                </span>
                <span className="w-12 h-6 min-w-[48px] text-center text-blue-600  pr-2">
                  {/*post.recommend*/}
                </span>
                <span className="w-20 h-6 min-w-[80px] text-center text-gray-300">
                {post.displayDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  });

  export default React.memo(PostList2);