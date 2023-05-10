import { activePaginationState } from '../../atoms/ActivePaginationState';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';



const PageButton = ({ pg, setPage, Page }) => {
  const [activePage, setActivePage] = useRecoilState(activePaginationState);

  const handleClick = () => {
    setPage(pg);
    setActivePage(pg);
    console.log("페이지 인덱스:", pg, "현재 activePage값 :", activePage);
  };

  const buttonClass = `mx-1 flex h-9 w-9 items-center justify-center rounded-full p-0 text-sm text-white shadow-md transition duration-150 ease-in-out ${
    activePage === pg ? "bg-gray-200" : "bg-black hover:bg-gray-200"
  }`;

  return (
    <button onClick={handleClick} className={buttonClass}>
      {pg}
    </button>
  );
};

export default PageButton;