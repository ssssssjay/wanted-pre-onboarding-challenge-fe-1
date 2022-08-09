# wanted-pre-onboarding-challenge-fe-1

## 1-1) 과제 설명 및 특이사항
- React를 활용하여 직접 만드는 작업이 처음이어서, 바닐라 JS로 일정 부분 선작업을 했습니다.
- Components 폴더 내에서 컴포넌트 별 폴더를 생성하여 jsx파일과 css파일을 추가 할 예정입니다.(현재는 기능구현에만 중점을 두었습니다.)

***

## 1-2) 추가하고자 하는 사항(강의와는 별개로 부족하다고 느끼는 부분)
- 컴포넌트 분리 작업
  - 현재는 크게 3개로 이루어져있고, 큰 단위의 컴포넌트에 다 몰아져 있음.
- React Router 사용하여 라우팅 처리
  - 현재는 한 url에서 계속 작업이 이루어지고 있음. 새로고침 문제도 해결 못 함.
- React Query 도입
- 과제에서 부여한 상세 기능 작업
***

## 1-3) 클라이언트 구현 과제 List

### Assignment 1 - Login / SignUp

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [v] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
  - [ ] 이메일 조건 : 최소 `@`, `.` 포함
  - [ ] 비밀번호 조건 : 8자 이상 입력
  - [ ] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [v] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [ ] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [ ] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

### Assignment 2 - Todo List

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [v] 목록 / 상세 영역으로 나누어 구현해주세요
  - [v] Todo 목록을 볼 수 있습니다.
  - [v] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [v] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [v] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [ ] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [ ] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요

  - [ ] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다
