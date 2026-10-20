"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function HomePage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "안녕하세요! 무엇을 도와드릴까요? 예: 마케팅 문구, 블로그 아이디어, 고객 응대 답변",
    },
  ]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!question.trim() || loading) return;

    const userMessage = question.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) {
        throw new Error("서버 응답 오류");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "응답이 비어 있습니다." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "죄송합니다. 잠시 후 다시 시도해주세요. OpenAI API 키 또는 서버 설정을 확인해 주세요.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <span className="chip">ChatGPT 연동 웹앱</span>
        <h1>배포용 AI 웹사이트 템플릿</h1>
        <p>
          사용자가 질문하면 OpenAI API를 통해 답변을 생성하는 간단한 웹사이트입니다.
        </p>
      </header>

      <section className="content-grid">
        <div className="chat-panel">
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.role === "user" ? "message-row user" : "message-row assistant"}
              >
                <div className="bubble">{msg.content}</div>
              </div>
            ))}

            {loading && (
              <div className="message-row assistant">
                <div className="bubble">답변을 생성 중입니다...</div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="composer">
            <label htmlFor="question">질문 입력</label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              placeholder="예: 쇼핑몰 홍보 문구 3개를 만들어줘."
            />

            <div className="actions">
              <span>예시: 상품 설명, 블로그 글, 마케팅 문구</span>
              <button type="submit" disabled={loading || !question.trim()}>
                {loading ? "전송 중..." : "질문 보내기"}
              </button>
            </div>
          </form>
        </div>

        <aside className="side-panel">
          <h2>이 프로젝트의 기능</h2>
          <ul>
            <li>• ChatGPT API 연동</li>
            <li>• 사용자 입력 기반 답변 생성</li>
            <li>• 쉬운 Vercel 배포</li>
            <li>• 기본 웹 UI 구성</li>
            <li>• 고객센터 / FAQ / 마케팅 도구 확장 가능</li>
          </ul>

          <div className="info-box">
            <p>추천 배포 플랫폼</p>
            <strong>Vercel + OpenAI API</strong>
          </div>
        </aside>
      </section>
    </main>
  );
}
