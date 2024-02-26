/* eslint-disable react/prop-types */
import './weatherCard.css'
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
export default function Card({forecast}) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);
  return (
    <div className="weather-card">
    <h2>{new Date(forecast.date).toLocaleString()}</h2>
    <p>{t("temp_min")}: {t(forecast.temp_min)} °C</p>
    <p>{t("temp_max")}: {t(forecast.temp_max)} °C</p>
    <p>{t("precipitation")}: {t(forecast.precipitation)} %</p>
    <p>{t("wind_speed")}: {t(forecast.windSpeed)} {t("speed")}</p>
    <p>{t("wind_direction")}: {t(forecast.windDirection)}</p>
    <p>{t("humidity")}: {t(forecast.humidity)} %</p>
    <p>{t("description")}: {t(forecast.description)}</p>
  </div>
  )
}
