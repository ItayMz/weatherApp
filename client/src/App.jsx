import { useState, useEffect } from "react";
import "./App.css";
import CardSlider from "./components/UI/CardSlider";
import SearchBox from "./components/searchBox/SearchBox";
import { useTranslation } from "react-i18next";
function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);

  const lng = navigator.language;

  const [forecasts, setForecasts] = useState(null);
  const [showForecasts, setShowForecasts] = useState(false);
  const [error, setError] = useState(null);

  async function handleCitySearch(cityName) {
    const url = `http://localhost:3000/api/v1/forecasts/${cityName}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setForecasts(data.forecasts);
      setShowForecasts(true);
      setError(null); // Reset error state if the request succeeds
    } catch (error) {
      setError(error.message); // Set error state to display error message
      setForecasts(null); // Clear forecasts on error
      setShowForecasts(false); // Hide forecasts on error
    }
  }

  return (
    <>
      <h1>{t('welcome')}</h1>
      <SearchBox onSubmit={handleCitySearch} />
      {error && <p>Error: {error}</p>}
      {showForecasts && <CardSlider forecasts={forecasts} />}
    </>
  );
}

export default App;
