- [project-doing](#project-doing)
  - [프로젝트 소개](#프로젝트-소개)
    - [개발 기간](#개발-기간)
    - [개발 내역](#개발-내역)
    - [주요 개발 스택](#주요-개발-스택)
  - [프로젝트 상세](#프로젝트-상세)
    - [프로젝트 구조](#프로젝트-구조)
  - [주요 서비스 화면 데모 보기](#주요-서비스-화면-데모-보기)
    - [1. 메인 페이지](#1-메인-페이지)
    - [2. 스터디 그룹 페이지](#2-스터디-그룹-페이지)
    - [3. 마이 라운지 페이지](#3-마이-라운지-페이지)
  - [프로젝트 회고](#프로젝트-회고)

# project-doing

<div align="center">

![banner](https://github.com/geniee1220/project-doing/assets/110911811/2632f1f9-6940-4aea-9153-1fb413e60d50)

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Recoil](https://img.shields.io/badge/recoil-3578e5?style=for-the-badge&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI3LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyNTYgNTk2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTYgNTk2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEyOCwwYzI3LjgsMCw1MC40LDIyLjUsNTAuNCw1MC40YzAsMjAuNy0xMi42LDM4LjYtMzAuNSw0Ni4zbC0wLjUsMC4ydjIxLjJjMCwyMC41LDE1LjIsMzcuOSwzNS41LDQwLjgKCQlsMC42LDAuMWw2LjEsMC44YzMyLjksNC4yLDU4LjQsMjcuOCw2NSw2MC4zYzYuNSwzMi41LTcuNyw2NC4yLTM2LjUsODAuOWMtMTIuOSw3LjQtMjYuOSwxMS45LTQxLjcsMTMuNWwtMC43LDAuMWwtOTEuNCw4LjYKCQljLTkuMywwLjktMTguMSwzLjctMjYuMiw4LjRjLTE2LjYsOS42LTE5LjgsMjYuMi0xNy4zLDM4LjVjMi41LDEyLjIsMTEuOCwyNiwzMC40LDI4LjZsNi42LDAuOWM0MCw1LDcwLjMsMzguOSw3MC45LDc5LjFsMCwxLjIKCQl2MTkuN2MxNy42LDcuOCwzMCwyNS41LDMwLDQ2LjFjMCwyNy44LTIyLjUsNTAuNC01MC40LDUwLjRzLTUwLjQtMjIuNS01MC40LTUwLjRjMC0yMC43LDEyLjUtMzguNSwzMC40LTQ2LjJsMC41LTAuMnYtMTkuMwoJCWMwLTIwLjUtMTUuMi0zNy45LTM1LjUtNDAuOGwtMC42LTAuMWwtNi4xLTAuOGMtMzIuOS00LjItNTguNC0yNy44LTY1LTYwLjNjLTYuNi0zMi41LDcuNy02NC4yLDM2LjUtODAuOQoJCWMxMi45LTcuNCwyNi45LTExLjksNDEuNy0xMy41bDAuNy0wLjFsOTEuNC04LjZjOS4zLTAuOSwxOC4xLTMuNywyNi4yLTguNGMxNi42LTkuNiwxOS44LTI2LjIsMTcuMy0zOC41CgkJYy0yLjUtMTIuMi0xMS44LTI2LTMwLjQtMjguNmwtNi42LTAuOWMtNDAtNS03MC4zLTM4LjktNzAuOS03OS4xbDAtMS4yVjk2LjRjLTE3LjYtNy45LTI5LjktMjUuNS0yOS45LTQ2Qzc3LjcsMjIuNSwxMDAuMiwwLDEyOCwwCgkJeiBNMTg4LjUsMzM3bDI4LjIsMzAuOWMyMSwyMy4xLDMyLjcsNTIuOSwzMi45LDg0bDAsMC45aC0zOS44YzAtMjEuMy03LjgtNDEuNy0yMi01Ny42bC0wLjQtMC41bC00OC01Mi42bDM4LjMtMy42bDEuMi0wLjEKCQljMi45LTAuMyw1LjctMC43LDguNi0xLjJMMTg4LjUsMzM3eiBNNDIuNywxNDMuNWMwLDIxLjMsNy44LDQxLjcsMjIsNTcuNmwwLjQsMC41bDQ4LjEsNTIuN2wtMzUuNCwzLjRsLTEuMSwwLjEKCQljLTMuOSwwLjQtNy43LDAuOS0xMS41LDEuN2wtMSwwLjJsLTI4LjUtMzEuM2MtMjEtMjMtMzIuNy01Mi45LTMyLjktODRsMC0wLjlINDIuN3oiLz4KPC9nPgo8L3N2Zz4K)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

</div>

<i>함께 공부할 사람들이 필요한데... 스터디 그룹 어디서 구하지? </i> <br/><br/>
아직도 이런 고민 하고 계신가요? 스터디 그룹 찾기 위해 플랫폼 여기 저기 돌아다닐 필요 없어요. <br/>
더 이상 헤매지 말고, 스터디 doing에서 시작하세요!<br/><br/>
<strong>달리고 싶은 당신을 위한 스터디 플랫폼, doing</strong>

[배포 페이지 바로가기](https://project-doing-65kn.vercel.app/)

</br>

## 프로젝트 소개

### 개발 기간

2023.04.24 ~ 04.30 (6일) 기획 & 디자인 / 개인 기여 100% <br/>
https://xd.adobe.com/view/cb1bbc93-c94f-4062-946c-d2a837afc36f-9e48/

2023.05.01 ~ 05.18 (18일) 개발 / 개인 기여 100%

### 개발 내역

- Firebase, Firebase Database(Firestore), Firebase Storage 연동
- Firebase 회원가입 & 로그인
  - Form Validate(react-hook-form 라이브러리 연동)
- 메인 페이지
  - 캐러셀 슬라이드(react-responsive-carousel 라이브러리 연동)
  - 스터디 그룹 상위 태그 40개 노출, 태그 클릭 시 query string 검색
- 스터디 그룹 페이지
  - 스터디 그룹 모집글 조회, 생성, 수정, 삭제
    - 이미지 업로드(Drag and Drop 지원)
    - 이미지 Thumbnail
    - 이미지 스켈레톤 UI 적용
  - 스터디 그룹 지원, 탈퇴
  - 스터디 그룹 카테고리 검색 기능
    - 제목 검색, 현재 멤버를 모집중인 그룹 검색, 태그 검색
    - 검색 히스토리
  - 댓글 조회, 생성, 삭제 기능
  - 좋아요 기능
  - 페이지네이션(react-paginate 라이브러리 연동)
- 마이라운지 페이지
  - (내가 만든 그룹 / 내가 가입한 그룹 / 내가 지원중인 그룹 / 내가 관심있는 그룹) 조회
  - 내가 만든 그룹에 지원한 멤버 승인 및 거부

### 주요 개발 스택

| Category | Package Name      | Version |
| -------- | ----------------- | ------- |
| Bundler  | Vite              | 4.3.2   |
| Database | Firebase          | 9.21.0  |
| Frontend | React             | 18.2.0  |
|          | Typescript        | 5.0.2   |
|          | React-Router      | 6.11.0  |
|          | Recoil            | 0.7.7   |
|          | React Query       | 3.39.3  |
|          | Styled Components | 5.3.10  |

❗️기타 상세 스택은 package.json을 참고해 주세요

<br/>

## 프로젝트 상세

리액트와 타입스크립트로 만든 개인 토이 프로젝트입니다. <br/>
스터디 그룹 플랫폼을 개발하면서, 더 나은 성능과 개발 생산성을 위해 고민하며 다양한 기술을 적용하였습니다.<br/>

먼저, Adobe XD로 프로토타입과 기능 설명서를 먼저 작성하여 필요한 기능과 DB 설계 이후 개발을 진행하였습니다.<br/>
사용자 UX를 고려하여 react-loader-spinner 라이브러리를 이용한 로딩 스피너를 사용하고, Skeleton UI를 제작하였습니다.

개발환경에서 빠른 HMR 기능을 사용해 개발 생산성을 높이고, 더 빠른 빌드와 개발이 가능한 Vite를 번들러로 채용해 개발 과정에서 작업 속도를 높일 수 있었습니다.

스타일 코드를 인라인으로 붙이는 것을 최소화하고 코드의 구조를 보다 명확히 파악할 수 있도록 styled-components를 사용하고, style 파일은 별도의 모듈로 분리하였습니다. 반복 사용되는 스타일 코드는 theme.tsx에서 변수로 선언하였습니다.

또한 성능 최적화를 위해 react-query의 캐시 기능을 활용. recoil, useEffect 훅을 함께 사용해 데이터를 fetch하는 커스텀 훅을 만들었습니다. 빌드 시 JS 파일의 크기를 줄이기 위해 다이나믹 임포트를 통해 코드 스플리팅을 하였습니다.

백엔드 서버를 구축하지 않고도 손쉽게 Auth, Database와 Storage기능을 사용할 수 있어 Firebase를 서버 기술로 채택하고,
사용자가 늘어났을 때를 고려하여 그룹 포스트, 좋아요, 댓글을 별도의 컬렉션으로 분리한 DB 설계를 하였습니다.

### 프로젝트 구조

코드 가독성과 유지 보수성을 높이고, 프로젝트 관리를 보다 체계적으로 수행할 수 있도록 그룹화하여 구성하였습니다.<br/>
recoil과 react-query에서의 파일은 모듈화하여 별도의 디렉토리에서 관리하였습니다.

```
├── .eslintrc.cjs
├── .gitignore
├── .treerc
├── firebase.tsx
├── index.html
├── package-lock.json
├── package.json
├── public
├── README.md
├── src
│  ├── apis
│  ├── App.tsx
│  ├── assets
│  │  ├── logo.svg
│  │  └── styles
│  │    ├── custom.d.ts
│  │    ├── GlobalStyles.tsx
│  │    ├── style.d.ts
│  │    └── theme.ts
│  ├── atoms
│  ├── components
│  │  ├── atoms
│  │  │  ├── Button
│  │  │  ├── Filter
│  │  │  ├── Form
│  │  │  │  ├── Checkbox
│  │  │  │  ├── Input
│  │  │  │  ├── Radio
│  │  │  │  └── Textarea
│  │  │  ├── Loader
│  │  │  ├── Logo
│  │  │  ├── Message
│  │  │  │  └── ErrorMessage
│  │  │  ├── SkeletonImage
│  │  │  └── StyledLink
│  │  ├── molecules
│  │  │  ├── FileUploader
│  │  │  └── SearchBar
│  │  ├── organisms
│  │  │  ├── Carousel
│  │  │  ├── Comment
│  │  │  ├── Footer
│  │  │  ├── Group
│  │  │  │  ├── Group.style.tsx
│  │  │  │  ├── GroupApproval
│  │  │  │  ├── GroupCard
│  │  │  │  ├── GroupLike
│  │  │  │  └── GroupList
│  │  │  ├── Header
│  │  │  ├── Modal
│  │  │  │  ├── Alert
│  │  │  │  ├── Confirm
│  │  │  │  └── Modal.style.tsx
│  │  │  └── Pagination
│  │  └── templates
│  │    ├── MainTemplate.tsx
│  │    ├── SectionTemplate.tsx
│  │    └── Template.style.tsx
│  ├── main.tsx
│  ├── pages
│  │  ├── group
│  │  │  ├── GroupDetail.tsx
│  │  │  ├── GroupEdit.tsx
│  │  │  └── GroupRecruit.tsx
│  │  ├── Home.tsx
│  │  ├── Login.tsx
│  │  ├── MyLounge.tsx
│  │  ├── Register.tsx
│  │  └── StudyGroup.tsx
│  └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock
```

## 주요 서비스 화면 데모 보기

<div align="center">

<a href="https://youtu.be/bc8YmDBTdZ4"><img style="width:100%; max-width: 400px;" src=https://markdown-videos.deta.dev/youtube/bc8YmDBTdZ4></a></img>

</div>

### 1. 메인 페이지

<div align="center">

![main_page](https://github.com/geniee1220/project-doing/assets/110911811/5e3a0648-6e92-4497-b6ab-2c14f663a531)

</div>

### 2. 스터디 그룹 페이지

<div align="center">

![study_group](https://github.com/geniee1220/project-doing/assets/110911811/0a5e9740-b5a3-4a7d-bd30-481bec3f224b)

</div>

<br/>

<div align="center">

![222](https://github.com/geniee1220/project-doing/assets/110911811/9772f6fd-b819-4fff-b1f7-7d227b739d0c)

</div>

### 3. 마이 라운지 페이지

<div align="center">

![my_lounge](https://github.com/geniee1220/project-doing/assets/110911811/48f3355e-a2ea-43cd-8fb5-28eaa55fed62)

</div>

<br/>

## 프로젝트 회고

프로젝트를 기획부터 배포까지 진행하면서 여러 기술적 도전과 문제를 마주하며 고민할 수 있었습니다.<br>
프로젝트 구조는 어떻게 짜야 할까? DB 테이블을 어떻게 구성해야 할까? 데이터 캐시를 어떻게 사용할 수 있을까?

프로젝트를 진행하며 중복 코드 사용을 최소화하기 위해 함수 모듈화를 진행하고자 하였으나, 시간적 여유 부족으로 완료하지 못한 점이 아쉬웠습니다.

배포 후 Lighthouse로 성능 체크를 해보니 77점이어서 개선점을 찾아 보는 과정에서 빌드 시 메세지 'Some chunks are larger than 500 kBs after minification' 경고 문구를 확인할 수 있었습니다. 청크 분리를 위해 Vite 플러그인 중 하나인 vite-plugin-compression을 적용하였더니, Lighthouse 성능 점수가 기존의 77점에서 84점으로 상승하는 결과를 도출하여 뿌듯했습니다.

그러나 성능 최적화를 위해 이미지 최적화, 다이나믹 임포트 등을 보다 적극적으로 활용하는 등 개선할 부분이 많다는 것을 느꼈습니다.

[▶︎ 프로젝트 트러블 슈팅 기록 바로가기 ](https://puddle-pyroraptor-f10.notion.site/Doing-e5ec57abc75e4af7adabb65450c9409d)
