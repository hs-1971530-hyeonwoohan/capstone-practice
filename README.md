# Commit Convention

컨벤션 규칙은 프로젝트가 마무리되면 삭제하고 팀원 및 프로젝트 소개만 남길 예정입니다.

---
commit message 구조 : 제목(필수), 본문, 꼬릿말 형식
```javascript
[<type>][optional scope]: <description>

[optional body]

[optional footer(s)]
```

type은 반드시 작성하며 첫글자는 대문자로 작성합니다. 다음 값 중 하나를 선택합니다.
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅, 세미콜론 누락 등 코드 변경이 없는 경우
refactor: 코드 리팩토링
test: 테스트 코드 추가, 리팩토링 (프로덕션 코드 변경 없음)
chore: 빌드 업무 수정, 패키지 매니저 수정 등 (코드 변경 없음)
```

`<type>` 다음에는 선택적으로 `<scope>`를 작성할 수 있습니다. 변경한 부분 등을 명시할 때 사용합니다.

`<description>`은 변경 사항의 간단한 요약을 작성합니다. 예를 들어, "로그인 기능 추가"와 같이 변경 내용을 간단히 요약합니다.

`[optional body]`는 변경 사항에 대한 자세한 내용을 작성하는 부분입니다. 이 부분은 생략할 수 있습니다.

`[optional footer(s)]`는 이슈 트래커 ID나 참조 등을 작성하는 부분입니다. 이 부분도 생략 가능합니다. 다음의 규칙을 지킵니다.
```
꼬리말은  "유형: #이슈 번호"  형식으로 사용한다.
여러 개의 이슈 번호를 적을 때는  `쉼표(,)`로 구분한다.
이슈 트래커 유형은 다음 중 하나를 사용한다.  
- Fixes: 이슈 수정중 (아직 해결되지 않은 경우)  
- Resolves: 이슈를 해결했을 때 사용  
- Ref: 참고할 이슈가 있을 때 사용  
- Related to: 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)  
ex) Fixes: #45 Related to: #34, #23
```


---
commit convention을 고려한 commit 작성 예시
```
<type>: <description> (예: feat: 회원가입 기능 추가)
<type>: <description> (예: docs: README 이미지 추가)
<type>[<scope>]: <description> (예: docs[README]: 프로젝트 소개 업데이트
<type>: <description> (예: chore: 패키지 의존성
```





참고: https://velog.io/@shin6403/Git-git-%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0



