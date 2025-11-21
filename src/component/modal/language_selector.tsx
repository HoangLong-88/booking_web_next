"use client"
import { use, useEffect, useRef, useState } from "react";
import { getLanguageFromCookie, changeLanguage } from "@/libs/language";
import { Overlay } from "@/component/ui/Overlay";
import { useModal } from "@/utils/dom/useModal";
import { createPortal } from "react-dom";
import { initPageI18n } from "@/libs/i18n";
import { useTranslation } from "react-i18next";

type Lang = {
  code: string;
  label: string;
  flag: string;
  locale?: string;
};

function LanguageSelector() {
  const { isOpen, open, close, modalRef } = useModal(); 
  const [selectedLanguage, setSelectedLanguage] = useState<string>("EN");
  const { t, i18n } = useTranslation();
  const languages: Lang[] = [
    { code: "EN", label: "English", flag: "icon/flags/united-states.png", locale: "en" },
    { code: "VI", label: "Việt Nam", flag: "icon/flags/vietnam.png", locale: "vi" },
    { code: "CN", label: "汉语(中国)", flag: "icon/flags/china.png", locale: "zh-CN" },
    { code: "HK", label: "漢族(香港)", flag: "icon/flags/hong-kong.png",  locale: "zh-HK" },
    { code: "KR", label: "한국어", flag: "icon/flags/south-korea.png",  locale: "ko" },
    { code: "KM", label: "ខ្មែរ", flag: "icon/flags/cambodia.png", locale: "km" },
  ];

  useEffect(() => {
    const setup = async () => {
      await initPageI18n();
      const savedLang = getLanguageFromCookie();
      const langObj = languages.find((l) => l.locale === savedLang) ?? languages[0];
      setSelectedLanguage(langObj.code);
      i18n.changeLanguage(langObj.locale);
    };
    setup();
  }, []);

  const selected = languages.find((l) => l.code === selectedLanguage) ?? languages[0];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button" 
        aria-haspopup="dialog"
        onClick={() => open()}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-transparent backdrop-blur-sm text-sm font-bold text-white hover:bg-white/40"
      >
        <img
          src={"/" + selected.flag}
          alt={selected.label}
          className="w-5 h-5 shadow-sm"
        />
        <span className="hidden md:inline">{selectedLanguage}</span>
        <svg className="w-4 h-4 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"/>
        </svg>
      </button>

      {isOpen && createPortal(
        <>
          {/*Overlay*/}
          <Overlay onClick={close}/>  
           {/* Modal container*/}
           <div
            className="inset-0 fixed z-50 flex items-center justify-center p-6 pointer-events-none"
            // prevent overlay close when clicking inside modal
          >
            <div ref={modalRef} role="dialog" className="flex flex-col w-full max-w-4xl bg-white overflow-hidden rounded-xl shadow-2xl ring-1 pointer-events-auto"
            onClick={(e) => e.stopPropagation()} aria-modal="true" 
            > 
              {/* Header */}
              <div className="px-6 py-5 pb-0.5">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-extrabold text-black">{t("header:langs_modal.title")}</div>
                  <button
                    aria-label="Close"
                    onClick={() => close()}
                    className="p-2 rounded-md hover:bg-gray-100 text-gray-400"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="text-md font-medium text-black">{t("header:langs_modal.subtitle")}</div>
              </div>

              {/* Content */}
              <div className="p-6 pt-1">
                <div className="mb-4">
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {languages.map((lang) => {
                    const active = lang.code === selectedLanguage;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          changeLanguage(lang)
                          window.location.reload();
                        }}
                        className={
                          `flex items-center 
                          gap-3 
                          px-4
                           py-3 
                           w-full 
                           rounded-lg 
                           border 
                           transition-colors
                           cursor-pointer
                          ` +
                          (active
                            ? `border-none ring-1 
                            ring-indigo-200
                             bg-gradient-to-r
                              from-indigo-50
                               to-white 
                               text-gray-500`
                            :  `border-none
                             hover:bg-gray-100
                             text-black`)
                        }
                        aria-pressed={active}
                      >
                        <img src={"/" + lang.flag} alt={lang.label} className="w-6 h-6 rounded-sm" />
                        <span className="flex-1 text-left text-sm">{lang.label}</span>
                        {active && (
                          <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.018 7.019a1 1 0 01-1.42 0L3.296 8.348a1 1 0 011.42-1.42l3.152 3.151 6.608-6.608a1 1 0 011.228-.181z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}

export { LanguageSelector };