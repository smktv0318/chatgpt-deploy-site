export const metadata = {
  title: "ChatGPT Deploy Site",
  description: "OpenAI API 연동 웹사이트 템플릿",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
