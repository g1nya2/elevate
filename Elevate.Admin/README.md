# Elevate Admin

관리자 대시보드를 위한 React + Vite + Tailwind CSS 애플리케이션입니다.

## 기술 스택

- **React** - UI 라이브러리
- **Vite** - 빠른 빌드 도구
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **JavaScript** - 프로그래밍 언어

## 시작하기

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 [http://localhost:5173](http://localhost:5173)에서 실행됩니다.

### 빌드

```bash
npm run build
```

프로덕션 빌드를 생성합니다.

### 미리보기

```bash
npm run preview
```

프로덕션 빌드를 로컬에서 미리 볼 수 있습니다.

## 프로젝트 구조

```
Elevate.Admin/
├── src/
│   ├── assets/       # 정적 리소스
│   ├── App.jsx       # 메인 앱 컴포넌트
│   ├── main.jsx      # 앱 진입점
│   └── index.css     # Tailwind CSS 설정
├── public/           # 공개 정적 파일
├── index.html        # HTML 템플릿
├── vite.config.js    # Vite 설정
├── tailwind.config.js # Tailwind CSS 설정
└── package.json      # 프로젝트 의존성
```

## Tailwind CSS

이 프로젝트는 Tailwind CSS를 사용합니다. [src/index.css](src/index.css)에서 Tailwind 지시문을 확인할 수 있습니다.

커스텀 설정은 [tailwind.config.js](tailwind.config.js)에서 관리됩니다.
