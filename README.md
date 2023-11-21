# shopping-mall

## 1. 기술 stack
### Front
* React.js
* Vite
* Recoil
* React-Query
* Sass
* Typescript

### Back
* Apollo Server
* GraphQL
* Json DB
* Typescript


### 배포
* Front - Vercel
* Back - Heroku

### https://shopping-mall-client-peach.vercel.app

### 2. 기능 구현
* InfinityScroll
* 상품 담기(리스트 page)
* 상품 추가, 수정, 삭제(관리자 page)
* 상품 결제


### 3. 잘했다고 생각되는 부분
1. Client / Server state 기준을 아래의 예시와 같이 나누어 코드가 복잡해지지 않도록 하였습니다.
<img width="643" alt="스크린샷 2023-02-13 오후 3 06 07" src="https://user-images.githubusercontent.com/65752350/218383058-13625cf3-14f9-464b-b938-3bc334b1eb4a.png">

2. QueryKey가 중복되지 않게 관리해야 캐싱을 활용할 수 있기 때문에 하나의 파일에서 관리 하도록 하였습니다.
<img width="250" alt="스크린샷 2023-02-13 오후 3 34 01" src="https://user-images.githubusercontent.com/65752350/218387446-b7c56d0d-7d72-4527-bef5-a94c18436657.png">

3. 동일하게 쓰이는 query custom hook을 만들어 재사용할 수 있게 하였습니다.
<img width="487" alt="스크린샷 2023-02-13 오후 3 45 36" src="https://user-images.githubusercontent.com/65752350/218389284-887caa9e-5949-4b7b-be98-4f161033d12b.png">

