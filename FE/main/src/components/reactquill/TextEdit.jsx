import ReactQuill from "react-quill";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css"; // React Quill 스타일시트 로드
import ImageResize from "quill-image-resize";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaRegClock, FaPrint } from "react-icons/fa";

const Quill = ReactQuill.Quill;
Quill.register("modules/imageResize", ImageResize);
{
  /*드래그를 통한 이미지 크기 지정 모듈*/
}

function TextEdit() {
  const location = useLocation();
  const { postId, editMode } = location.state || {};

  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      if (editMode && postId) {
        const response = await axios.get(
          `http://localhost:8080/api/freeboards/${postId}`
        );
        //지금의 경우에는 하나의 데이터를 콕 찝어서 가져오고 있기 때문에 dtoList.을 할 필요없이 data.title, data.content와 같은 방식으로 데이터를 가져오면 됨 .
        console.log("수정을 위해 가져온 데이터", response.data);
        setTitle(response.data.title);
        setValue(response.data.content);
      }
    };

    fetchPost();
  }, [editMode, postId]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike"],
      ["link", "image", "video"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
    },
  };

  const resetState = () => {
    setTitle("");
    setValue("");
    editMode = false;
    postId = "";
  };

  const saveData = async () => {
    const editorHtml = document.querySelector(".ql-editor").innerHTML;
    console.log("saveData함수 실행");
    console.log(editorHtml);
    console.log(editMode);
    

    if (editMode) {
      // 게시글 수정 로직
      try {
        const response = await axios.post(
          `http://localhost:8080/api/freeBoards/${postId}?action=update`,
          {
            title,
            content: editorHtml,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.status === 200) {
          console.log("게시물이 성공적으로 업데이트되었습니다.");
          resetState();
          //다음 번 textedit이 실행되었을 때 이전에 값을 초기화 해주기 위함.
        } else {
          console.error(`오류 발생: ${response.statusText}`);
        }
      } catch (error) {
        console.error(`요청 중 오류 발생: ${error}`);
      }
      {
        /*error발생 시 다시 재 요청 하는 로직을 넣어주기*/
      }
      // 수정이 완료되면 처리할 로직을 여기에 추가하십시오.
    } else {
      // 게시글 생성 로직
      try {
        const response = await axios.post(
          "http://localhost:8080/freeboards",
          {
            title,
            content: editorHtml,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.status === 200) {
          console.log("게시물이 성공적으로 업데이트되었습니다.");
          resetState();
        } else {
          console.error(`오류 발생: ${response.statusText}`);
        }
      } catch (error) {
        console.error(`요청 중 오류 발생: ${error}`);
      }
      // 생성이 완료되면 처리할 로직을 여기에 추가하십시오.

      // editorHtml을 저장하거나 다른 용도로 사용할 수 있습니다.
    }
  };

  return (
    <div className="w-full h-full bg-lightbeige pt-4 pb-4">
      <div className="mx-72 flex flex-col bg-white">
        {/*FreeBoardHeader 추가 해줘야 함.*/}
        <div className="">
          <main className="py-10 px-10 shadow-sm">
            <div>
              <div className="w-full">
                <div className="flex justify-between w-full border-[#ccc] border-x border-t pl-2 py-2 focus:outline-none">
                  <input
                    className="min-w-[50%]"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <button
                    className="px-2 text-white bg-black mr-2 rounded "
                    onClick={saveData}
                  >
                    저장
                  </button>
                </div>

                <ReactQuill
                  className="h-[36rem] mb-10"
                  value={value}
                  onChange={setValue}
                  modules={modules}
                  formats={[
                    "header",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "link",
                    "image",
                    "video",
                    "align",
                    "list",
                  ]}
                  placeholder="여기에 글을 작성하세요..."
                />

                <div className="w-full">
                  <div className="flex justify-between mt-1 h-6 w-fulls pl-5">
                    <div className="flex cursor-pointer">
                      <FaRegClock className="mt-2 mr-1 ml-4 w-3 h-3 text-gray-300" />
                      <span className="mt-1 text-gray-300 text-sm"></span>
                    </div>
                    <div className="pr-4 cursor-pointer">
                      <FaPrint />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default TextEdit;
