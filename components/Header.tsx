"use client";
import { Link, usePathname, useRouter } from "@/src/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";

const Header = () => {
  const pathname = usePathname();
  const locale = useLocale();

  // for navigation
  const router = useRouter();
  const t = useTranslations("Navigation");

  const handleLocaleChange = (newLocale: string) => {

    // to change language of the page and navigate to the same page with new language
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="p-[10px_20px]">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center gap-[30px]">
        <Link className="text-[#3730A3] text-[16px] font-[700]" href={"/"}>
          RecruitPro
        </Link>
        <nav className="flex gap-3">
          <Link
            className={`${pathname === "/" ? "text-[#3730A3] text-[16px] font-[700] border-b-[#3730A3] border-b-2" : "text-gray-600 hover:text-[#3730A3]"}`}
            href={"/"}
          >
            {t("home")}
          </Link>
          <Link
            className={`${pathname === "/jobs" ? "text-[#3730A3] text-[16px] font-[700] border-b-[#3730A3] border-b-2" : "text-gray-600 hover:text-[#3730A3]"}`}
            href={"/jobs"}
          >
            {t("jobs")}
          </Link>
        </nav>
        <div className="flex items-center gap-[20px]">
          <select
            value={locale}
            onChange={(e) => handleLocaleChange(e.target.value)}
            className="bg-transparent text-[#3730A3] font-semibold focus:outline-none cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="tj">TJ</option>
          </select>
          <div className="flex gap-[10px]">
            <button className="text-[#3730A3] text-[16px] font-[700]">
              Sign In
            </button>
            <button className="text-[#fff] p-[10px_15px] rounded-[10px] text-[16px] font-[700] bg-[#3730A3]">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
