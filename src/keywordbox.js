import axios from 'axios'
import './keywordbox.css'

export default function KeywordBoxComponent({
  comp,
  setBoxComponentList,
  setHotKeyWordLoading,
  handleKeyWordClicked,
  handleKeyWordExplanation,
}) {
  const { keyword, left } = comp

  async function getBoxComponent(keyname) {
    try {
      setHotKeyWordLoading(true)
      const response1 = await axios.get(
        `http://localhost:3000/keybox/${keyname}`,
      )
      const boxList = response1.data
      const response2 = await axios.get(
        `http://localhost:3000/keywordExplanation/${keyname}`,
      )
      const keywordExplanation = response2.data
      setBoxComponentList(boxList)
      handleKeyWordExplanation(keywordExplanation)
      handleKeyWordClicked(true)
      setHotKeyWordLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div
      className="keyword-box"
      onClick={() => {
        getBoxComponent(keyword)
      }}
      style={{
        background: left
          ? 'linear-gradient(160deg, white, 60%, rgb(145, 191, 236))'
          : 'linear-gradient(160deg, white, 60%, rgb(168, 168, 168))',
      }}
    >
      <span className="keyword-in-box">{keyword}</span>
    </div>
  )
}
