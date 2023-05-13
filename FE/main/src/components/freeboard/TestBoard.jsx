import React from "react";

function TestBoard() {
  return (
    <div>
      <table className="table-divide">
  <thead>
    <tr>
      <th scope="col">제목</th>
      <th scope="col" className="author">
        글쓴이
      </th>
      <th scope="col">추천 수 </th>
      <th scope="col">날짜 </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="title">
        <span>
          <a
            href="https://www.dogdrip.net/472780551"
            className="ed link-reset"
            style=""
          >
            <span className="title-link">
              title
            </span>
            <span className="text-primary">comment</span>
            <span className="print-icon ml-2">
              게시글 첨부파일 이미지
            </span>
          </a>
        </span>
      </td>
      <td className="author">
        <a
          href="#popup_menu_area"
          className="flex items-center link-reset member_138787325"
          onclick="return false"
        >
          <img
            src=""
            alt="[레벨:16]"
            title="포인트:30143드립력 (54%), 레벨:16/50"
            className="xe_point_level_icon"
            style={{ verticalAlign: 'middle', margin: '0px 3px 2px 0px' }}
          />
          뚱랑이
        </a>
      </td>
      <td className="voteNum text-primary">38 </td>
      <td className="time" scope="row">
        1 시간 전
      </td>
    </tr>
  </tbody>
</table>
    </div>
  );
}

export default TestBoard;
