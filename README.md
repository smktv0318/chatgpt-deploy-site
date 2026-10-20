# ChatGPT Deploy Site

OpenAI API를 연동한 배포용 웹사이트 템플릿입니다.

## 설치

```bash
npm install
cp .env.example .env.local
```

`.env.local` 파일에서 `OPENAI_API_KEY`를 실제 값으로 수정하세요.

## 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 으로 접속하면 됩니다.

## 배포

- GitHub 저장소를 Vercel에 연결합니다.
- 환경 변수에 `OPENAI_API_KEY`를 추가합니다.
- 배포를 실행합니다.

## 기능

- ChatGPT API 연동
- 한국어 대화 UI
- Vercel 기반 간단 배포
- 마케팅 문구, FAQ, 고객 응대, 블로그 글 작성 기능 확장 가능
