import "./figure.css";

export function SpeechBubble({ width, height }) {
  return (
    <div
      className="speech-bubble"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {"간편하게 해시태그로 검색해보세요."}
    </div>
  );
}
