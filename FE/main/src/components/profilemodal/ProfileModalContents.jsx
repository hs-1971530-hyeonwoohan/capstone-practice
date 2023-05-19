import React from 'react'

function ProfileModalContents() {
  return (
    <div><div className="user-profile">
    <div className="wrapper">
      <div className="container profile verticalCenter">
        <div className="profile-container">
          <div className="row profile-email">
            <div class="emailAddress ">
              <div className="relative">
                <div className="absolute mt-32">
                  <input
                    type="file"
                    accept="image/*"
                    id="file-input"
                    style={{ display: "none" }} // input을 숨김
                  />
                  <label className="flex-none">
                    <CameraIcon
                      handleImageUpload={() =>
                        document.getElementById("file-input").click()
                      }
                    />
                  </label>
                </div>
                <img
                  src={user.image}
                  // src={image}
                  className="w-20 h-20 mx-auto bg-white rounded-full -mt-16 border-8 border-white object-cover"
                />
              </div>
              <div className="flex">
                <h3 className="emailAddress mr-4 text-center text-3xl font-medium">
                  {user.email}
                </h3>
                <button className="pass-chg-btn mt-2 text-teal-500 bg-gray-100 border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                  비밀번호 변경
                </button>
              </div>
            </div>
            <div className="form-group nicknameArea mt-2 mb-2">
              <label className="profileLabel font-bold">닉네임</label>
              <input
                autocomplete="off"
                name="userNickname"
                type="text"
                maxlength="25"
                placeholder="닉네임"
                title="닉네임"
                class="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-900 rounded-md placeholder-gray-500"
                aria-required="true"
                aria-invalid="false"
              />
            </div>
            <div className="form-group formSingleLine mt-6 mb-3 flex gap-14 md:!gap-14">
              <label className="profileLabel floatType font-bold ">
                성별
              </label>
              <label className="selectFormFloat clearfix">
                <input type="radio" value="male" class="radioBtn" />
                <span className="selectFormTx">남자</span>
              </label>
              <label className="selectFormFloat clearfix">
                <input type="radio" value="female" class="radioBtn" />
                <span className="selectFormTx">여자</span>
              </label>
              <label className="selectFormFloat clearfix">
                <input type="radio" value="none" class="radioBtn" />
                <span className="selectFormTx">설정 안 함</span>
              </label>
            </div>
            <div className="form-group mb-2">
              <label className="profileLabel font-bold">생년월일</label>
              <input
                type="hidden"
                data-input=""
                placeholder="생년월일을 입력해 주세요"
                title="생년월일을 입력해 주세요"
                className="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-900 rounded-md placeholder-gray-500"
              />
              <input
                className="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-900 rounded-md placeholder-gray-500"
                placeholder="생년월일을 입력해 주세요"
                tabindex="0"
                type="text"
                readonly="readonly"
              />
            </div>
            <div class="form-group flex justify-between text-area-field mb-2">
              <label for="birth" className="profileLabel font-bold">
                내 각오
              </label>
              <span className="pr-3 ">{commentTextLength}/1000</span>
            </div>
            <textarea
              autocomplete="off"
              value={commentText}
              onChange={handleCommentTextChange}
              maxlength="1000"
              placeholder="올해에는 반드시! 기필코! 합격한다!"
              className="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-900 rounded-md placeholder-gray-500 resize-none -mt-2"
            />

            <div className="form-group my-category flex-col">
              <label for="favorite" className="profileLabel font-bold">
                내 관심 카테고리
              </label>
              <div className="my-favorite-category">
                <button className="rounded-2xl  h-12 w-full bg-teal-500 font-bold text-lg text-white relative overflow-hidden">
                  내 관심 카테고리 설정하기
                </button>
                <div class="my-favorite-category-summary mt-4">
                  <ul>
                    <hr />
                  </ul>
                </div>
              </div>
            </div>
            <div className="createBtnRec text-left mt-4">
              <button className="rounded-2xl h-12 w-full bg-teal-500 font-bold text-lg text-white relative overflow-hidden">
                프로필 설정 완료
              </button>
            </div>
            <div className="withdrawal-btn-wrapper text-center mt-4">
              <button className="withdrawalBtn text-gray-400">
                회원 탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default ProfileModalContents