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
           Our mission
          </h2>
          <p className="w-full lg:w-[400px] text-lg lg:text-xl font-normal">
          To support students in their academic success by easily finding the right teachers for them.
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
      <h2 className="text-5xl font-medium mb-3">Our Values</h2>

      <div className="my-2">
        <h4 className="text-xl font-semibold">Transparency.</h4>
        <p>
          Openness and honesty. We share information regardless of whether it's
          good or bad. We constantly learn from our experiences.
        </p>
      </div>

      <div className="my-2">
        <h4 className="text-xl font-semibold">We are Innovators.</h4>
        <p>
          We actively pursue new and different ways to continue the mission of
          Doqquz. We challenge ourselves and pave our own path.
        </p>
      </div>

      <div className="my-2">
        <h4 className="text-xl font-semibold">We are a Team.</h4>
        <p>
          We work together with respect and care for each other. We have fun
          together. Our team works hard based on our roles and goals.
        </p>
      </div>

      <div className="my-2">
        <h4 className="text-xl font-semibold">We are Determined.</h4>
        <p>
          We are resilient and proactive. We see challenges as opportunities. We
          come together with enthusiasm and courage to get the job done.
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
