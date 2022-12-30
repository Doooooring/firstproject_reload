import axios from "axios";
import "./keywordbox.css";
import { useMemo } from "react";

export default function KeywordBoxComponent({
  comp,
  keywordClicked,
  setBoxComponentList,
  setHotKeyWordLoading,
  handleKeyWordClicked,
  handleKeyWordExplanation,
  handleSummaryToFold,
  handleSearchKeyWord,
  handleHotKeyWordListContinue,
  handleHotKeyWordListEnd,
}) {
  const { keyword, left } = useMemo(() => {
    return comp;
  }, []);

  async function getBoxComponent(keyname) {
    try {
      setHotKeyWordLoading(true);
      const response1 = await axios.get(
        `http://localhost:3000/keybox/${keyname}`
      );
      const boxList = response1.data;
      const response2 = await axios.get(
        `http://localhost:3000/keywordExplanation/${keyname}`
      );
      const keywordExplanation = response2.data.split("₩");
      if (keywordClicked === "none") {
        if (left) {
          handleHotKeyWordListContinue([comp]);
          handleHotKeyWordListEnd([]);
        } else {
          handleHotKeyWordListContinue([]);
          handleHotKeyWordListEnd([comp]);
        }
      }
      setBoxComponentList(boxList);
      handleSearchKeyWord(keyword);
      handleKeyWordExplanation(keywordExplanation);
      handleKeyWordClicked(keyword);
      setHotKeyWordLoading(false);
      handleSummaryToFold(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div
      className="keyword-box"
      onClick={() => {
        getBoxComponent(keyword);
      }}
      style={{
        background: left
          ? "linear-gradient(160deg, white, 60%, rgb(145, 191, 236))"
          : "linear-gradient(160deg, white, 60%, rgb(168, 168, 168))",
      }}
    >
      <span className="keyword-in-box">{keyword}</span>
    </div>
  );
}
