import React, { useState, useEffect } from "react";
import FreeBoardHeader from "./FreeBoardHeader";
import { Link } from "react-router-dom";
import { getPostsPage, getResearchPage } from "../../api/axios";
import { useQuery } from "react-query";
import PageButton from "./PageButton";
import PostList2 from "./PostList2";
import { isAuthenticatedAtom } from "../../atoms/IsAuthenticatedAtom";
import { useRecoilValue } from "recoil";

function FreeBoard() {
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);


  let posts2 = null;

  const {
    isLoading,
    isError,
    error,
    data: posts,
    isFetching,
    isPreviousData,
  } = useQuery([`/freeboards?page=${page}`, page], () => getPostsPage(page), {
    keepPreviousData: true,
  });

  const {
    data: querySearchResults,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useQuery(
    ["search", isSearching],
    () => getResearchPage(page, isSearching),
    {
      enabled: isSearching !== "", // 검색어가 존재할 때만 API 호출
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    console.log("isSearching 값 변동 :", isSearching);
    console.log("querySearchResults 값 변동 : ", querySearchResults);
    if (querySearchResults) {
      posts2 = <PostList2 posts={querySearchResults} />;
    }
  }, [isSearching, querySearchResults]);

  if (isLoading) return <p>Loading Users...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  const lastPage = () => {
    if (posts.next == true) {
      setPage(posts.end + 1);
      console.log("lastPage실행", page);
    } else setPage(posts.end);
  };

  const firstPage = () => {
    if (posts.prev == true) {
      setPage(posts.start - 1);
      console.log("firstPage실행", page);
    } else setPage(1);
  };

  const pagesArray = Array(posts.end + 1)
    .fill()
    .map((_, index) => index);
  //페이지 네이션의 버튼을 담당.

  const onClickHandler = () => {
    setIsSearching("type=twc&keyword=user10");
    console.log("setIsSearching 실행 :", isSearching);
  };

  const nav = (
    <nav className="flex justify-center pb-2">
      <button
        className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-gray-200"
        onClick={firstPage} //disabled={isPreviousData || page === 1}
      >
        &lt;&lt;
      </button>

      {pagesArray.slice(posts.start, posts.end + 1).map((pg) => (
        <PageButton key={pg} pg={pg} setPage={setPage} />
      ))}
      <button
        className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-gray-200"
        onClick={lastPage} //disabled={isPreviousData || page === posts.end}
      >
        &gt;&gt;
      </button>
    </nav>
  );

  return (
    <div className="w-full h-full bg-lightbeige pt-4 pb-4">
      {console.log("전송된 데이터 prev, next", posts.prev, posts.next)}
      {console.log("전송된 데이터 start, end", posts.start, posts.end)}
      {/*console.log("현재 Page 값 : ", page)*/}
      {/*console.log("현재 activePage 값 : ", activePage)*/}

      <FreeBoardHeader />
      <div className="mx-72 flex flex-col bg-white">
        <div className="w-full h-auto flex flex-col mt-2 ">
          <div className=" py-1 border-b border-gray-200 font-semibold flex">
            <span
              className="basis-3/4 pl-2 text-center"
              onClick={() => {
                onClickHandler();
              }}
            >
              제목
            </span>
            <span className="pr-14">글쓴이</span>
            <span className="pr-7">추천수</span>
            <span className="pr-7">날짜</span>
          </div>

          {/*여기가 post뿌려주는 부분*/}
          {posts2 !== null ? { posts2 } : <PostList2 posts={posts} />}
          <div>
            <div className="flex justify-end">
              {isAuthenticated !== false  && (
                <div className="mr-3 mt-2 rounded text-white bg-black p-1 cursor-pointer">
                  <Link to="/textedit">글쓰기</Link>
                </div>
              )}
            </div>
            <div className="mb-4">{nav}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeBoard;
