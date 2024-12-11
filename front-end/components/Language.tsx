import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Language: React.FC = () => {

  const { t } = useTranslation();

  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = (event: { target: { value: string } }) => {
    const newLocale = event.target.value;
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="ml-6">
      <label htmlFor="language" className="text-white">
        {t('nav.Language')}
      </label>
      <select
        id="language"
        className="langButton"
        value={locale}
        onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};


export default Language;