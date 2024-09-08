import React from "react";

export const AboutUs = () => {
  return (
    <section id="about" className="scroll-smooth">
      <div class="bg-gray-50 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-base text-blue-500 font-semibold tracking-wide uppercase">
              About Us
            </h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Building Smarter, Better, and Efficiently
            </p>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              BudgetBuild is a cutting-edge system designed to empower
              homeowners, contractors, and construction professionals with smart
              tools to make informed decisions. Our platform offers seamless
              access to essential resources, financing options, and expert
              guidance to simplify construction projects.
            </p>
          </div>

          <div class="mt-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* <!-- Our Vision --> */}
              <div class="bg-white shadow-lg rounded-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800">Our Vision</h3>
                <p class="mt-4 text-gray-600">
                  We envision a world where construction projects are simplified
                  through technology. Our goal is to make it easy for everyone,
                  from first-time builders to experienced professionals, to
                  create sustainable and cost-effective structures that meet
                  modern standards.
                </p>
              </div>

              {/* <!-- Our Mission --> */}
              <div class="bg-white shadow-lg rounded-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800">Our Mission</h3>
                <p class="mt-4 text-gray-600">
                  BudgetBuild aims to provide a one-stop solution for material
                  procurement, financing, and contractor recommendations. We
                  believe that by centralizing these resources, we can help make
                  construction projects more efficient, transparent, and
                  budget-friendly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
