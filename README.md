# React Redux Toolkit 인증 실습
## 개요
- 로그인/로그아웃, 회원가입 페이지
- 유효성 검사
- 사용자의 역할에 따라 navbar 항목 자동 변경

<br>

## 프로젝트 구조
![스크린샷 2023-06-08 오전 9 46 59](https://github.com/happyeveryone96/react-redux-toolkit-authentication-and-authorization-ex/assets/66675699/661e332e-1e4e-4971-804f-da41f0ab76cf)

<br>

## 프로젝트 실행 방법
- 백엔드 서버가 구축되지 않아 애플리케이션이 정상적으로 동작하지 않는 상태
```
npm run start
Or: yarn start
```

<br>

## 기능 설명
### 인증 서비스 (service/auth.service.js)
- HTTP 요청을 위해 Axios를 사용하고 사용자 정보를 위해 Local Storage를 사용
- login(): POST {사용자 이름, 비밀번호} & User Profile로컬 저장소에 저장
- logout(): POST 로그아웃 요청, User Profile로컬 저장소에서 제거
- register(): POST {사용자 이름, 이메일, 비밀번호}
- getCurrentUser(): 저장된 사용자 정보 가져오기

<br>

### 데이터 서비스 (service/user.service.js)
- 서버에서 데이터 검색
- HttpOnly 쿠키는 HTTP 요청과 함께 자동으로 전송되므로 JWT를 신경쓰지 않고,<br>
Axios를 사용하기만 하면 됨

<br>

### 슬라이스 리듀서 및 액션 생성
- Redux를 위해 많은 폴더와 파일(액션, 리듀서, 유형 등)을 생성하는 대신<br>
redux-toolkit을 사용하면 슬라이스만 있으면 됨
- 슬라이스는 단일 기능에 대한 Redux 리듀서 로직과 액션의 모음이며,<br>
슬라이스를 생성하려면 아래 항목들이 필요함
- 슬라이스를 식별할 이름
- 초기 상태값
- 상태를 업데이트하는 방법을 정의하는 하나 이상의 reducer 함수
- 슬라이스가 생성되면, 생성된 Redux 액션 생성자와 전체 슬라이스에 대한<br>
reducer 함수를 내보낼 수 있음
- Redux Toolkit은 사용자가 reducer 함수의 이름을 기반으로 action type과<br>
action creater를 자동으로 생성하는 createSlice() 함수를 제공함

<br>

### store 생성
- 스토어는 액션과 리듀서를 함께 가져오고 애플리케이션 상태를 유지함
- Redux Toolkit의 configureStore() 함수는 자동으로 <br>
Redux 개발자 도구 확장을 활성화하고, 기본적으로 thunk 미들웨어를<br>
설정하므로 추가 구성없이 바로 thunk를 작성할 수 있음

<br>

### store 활성화
- 애플리케이션을 <Provider> 컴포넌트로 감싸고 store를 prop으로 전달하면 <br>
  중첩된 컴포넌트에서 Redux 저장소를 사용할 수 있게 됨
  
```
// src/index.js
...
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```
  
<br>
  
### Formik과 Yup을 활용한 유효성 검사 
- Formik은 동기식 및 비동기식 양식 수준 및 필드 수준 유효성 검사를 지원<br>
- Yup은 통해 스키마 기반 양식 수준 유효성 검사를 지원
  
```
// components/Register.js
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .test(
      "len",
      "The username must be between 3 and 20 characters.",
      (val) =>
        val && val.toString().length >= 3 && val.toString().length <= 20 // username 길이 검사
    )
    .required("This field is required!"), // username field가 비어있는지 검사
  email: Yup.string()
    .email("This is not a valid email.") // 이메일 형식에 맞는지 검사
    .required("This field is required!"), // email field가 비어있는지 검사
  password: Yup.string()
    .test(
      "len",
      "The password must be between 6 and 40 characters.",
      (val) =>
        val && val.toString().length >= 6 && val.toString().length <= 40 // password 길이 검사
    )
    .required("This field is required!"), // password field가 비어있는지 검사
});
```
                                                                       
<br>
  
### proxy 설정
- 이 실습의 HttpOnly 쿠키 접근 방식은 React 앱과 백엔드 서버가 동일한 도메인에서 호스팅되는 경우에 작동함.<br> 
따라서 로컬 개발에는 http-proxy-middleware를 사용해야 함
