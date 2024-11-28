import React from "react";
import { assets } from "../assets/assets";

const AboutSection = () => {
  return (
    <div className="p-5">
      {/* Mission Section */}
      <div className="flex flex-col lg:flex-row gap-5 bg-white shadow-lg h-[300px] lg:h-[384px] mb-6">
        {/* Left Section */}
        <div className="p-5 flex flex-col items-center text-center gap-14">
          <h2
            className="bg-bottom bg-contain bg-no-repeat text-4xl lg:text-5xl font-medium min-h-[76px]"
            style={{ backgroundImage: `url(${assets.underline})` }}
          >
            Missiyamiz
          </h2>
          <p className="w-full lg:w-[400px] text-lg lg:text-xl font-normal">
            Şagirdlərin özlərinə uyğun müəllimləri asanlıqla taparaq, təhsil
            həyatlarında uğur qazanmalarına dəstək olmaqdır.
          </p>
        </div>

        {/* Right Section */}
        <div
          className="flex-1 bg-cover bg-no-repeat bg-center hidden lg:block"
          style={{ backgroundImage: `url(${assets.mission1})` }}
        ></div>
      </div>

      {/* Value Section */}
      <div className="flex flex-col lg:flex-row gap-5 bg-white shadow-lg min-h-[384px]">
        {/* Left Section */}
        <div className="p-5 flex flex-col items-center text-center w-full lg:w-1/2">
          <h2 className="text-5xl font-medium mb-3">Dəyərlərimiz</h2>

          <div className="my-2">
            <h4 className="text-xl font-semibold">Şəffafıq.</h4>
            <p>
              Açıq və dürüstük. Yaxşı və pis olmasından asılı olmayaraq
              məlumatları paylaşırıq. Davamlı olaraq təcrübələrimizdən
              öyrənirik.
            </p>
          </div>

          <div className="my-2">
            <h4 className="text-xl font-semibold">Yenilikçiyik.</h4>
            <p>
              Biz fəal şəkildə Doqquz-un missiyasını davam etdirmək üçün yeni və
              fərqli yollar izləyirik. Özümüzə meydan oxuyaraq öz yolumuzu
              cızırıq.
            </p>
          </div>
          <div className="my-2">
            <h4 className="text-xl font-semibold">Biz bir komandayıq.</h4>
            <p>
              Hörmət və bir-birimizə qayğı ilə birlikdə işləyirik. Birlikdə
              əylənirik. Komandamız vəzifə və hədəflərimizə əsaslanaraq çox
              çalışır.
            </p>
          </div>

          <div className="my-2">
            <h4 className="text-xl font-semibold">Biz əzmkarıq.</h4>
            <p>
              Dözümlü və təşəbbüskarıq. Çətinlikləri fürsət kimi görürük. Həvəs
              və cəsarətlə işi başa çatdırmaq üçün bir araya gəlirik.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="flex-1 bg-cover bg-no-repeat bg-center hidden lg:block"
          style={{ backgroundImage: `url(${assets.mission2})` }}
        ></div>
      </div>
    </div>
  );
};

export default AboutSection;
