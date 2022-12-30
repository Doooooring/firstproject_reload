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

export function BrickBar({ num }) {
  const iterationBlock = new Array(num).fill(0);
  return (
    <div
      className="brickbar"
      style={{
        gridTemplateRows: `repeat(${num}, 1fr))`,
      }}
    >
      {iterationBlock.map(() => {
        return <div className="brick"></div>;
      })}
    </div>
  );
}

export function MakeBrickBar({ num }) {
  const iterationBlock = new Array(num).fill(0);
  return (
    <div className="brick-bar hh">
      <div className="corner-brick brick"></div>
      {iterationBlock.map(() => {
        return <div className="middle-brick brick"></div>;
      })}
      <div className="corner-brick brick"></div>
    </div>
  );
}
