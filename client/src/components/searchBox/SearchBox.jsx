import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next";
import './searchBox.css'
// eslint-disable-next-line react/prop-types
export default function SearchBox({onSubmit}) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);
    const [cityName, setCityName] = useState("")
    function handleSubmit(e){
        e.preventDefault()
        onSubmit(cityName)

    }
  return (
    
    <form className="search-form" onSubmit={handleSubmit}>
        <input type="text" className="city--input" placeholder={t("enter_city")} value={cityName} onChange={event=> setCityName(event.target.value)}/>
        <button type="submit" className="searchBtn">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png" alt="Search" style={{ width: '20px', height: '20px' }} />
      </button>
    </form>
  )
}
