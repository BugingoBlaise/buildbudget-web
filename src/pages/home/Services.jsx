import React from "react";

export const Services = () => {
  return (
    <section id="services" className="scroll-smooth">
      <div class="py-12 bg-white">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800">
            Some of our best features
          </h2>
          <p class="text-gray-500 mt-4">
            A modular, scalable system to help manage your construction project.
            <br />
            Here are some of our best features
          </p>
          <div class="mt-2">
            <span class="inline-block w-24 h-1 bg-blue-500 rounded"></span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          {/* <!-- Card 1: Material Procurement Assistance --> */}
          <div class="bg-white shadow-lg rounded-lg p-6 text-center">
            <img
              src="https://img.icons8.com/ios-filled/100/000000/delivery.png"
              alt="Material Procurement Assistance"
              class="mx-auto mb-4"
            />
            <h3 class="text-xl font-medium text-gray-700">
              Material Procurement Assistance
            </h3>
            <p class="text-gray-500 mt-2">
              Get recommendations on where to source materials and compare
              supplier prices.
            </p>
          </div>

          {/* <!-- Card 2: Loan and Financing Options --> */}
          <div class="bg-white shadow-lg rounded-lg p-6 text-center">
            <img
              src="https://img.icons8.com/ios-filled/100/000000/money.png"
              alt="Loan and Financing Options"
              class="mx-auto mb-4"
            />
            <h3 class="text-xl font-medium text-gray-700">
              Loan and Financing Options
            </h3>
            <p class="text-gray-500 mt-2">
              Explore loan options and use tools to calculate repayments for
              your project.
            </p>
          </div>

          {/* <!-- Card 3: Contractor Recommendations --> */}
          <div class="bg-white shadow-lg rounded-lg p-6 text-center">
            <img
              src="https://img.icons8.com/ios-filled/100/000000/worker-male.png"
              alt="Contractor Recommendation"
              class="mx-auto mb-4"
            />
            <h3 class="text-xl font-medium text-gray-700">
              Contractor Recommendations
            </h3>
            <p class="text-gray-500 mt-2">
              Find and review trusted local contractors for your construction
              projects.
            </p>
          </div>

          {/* <!-- Card 4: Building Regulations Education --> */}
          <div class="bg-white shadow-lg rounded-lg p-6 text-center">
            <img
              src="https://img.icons8.com/ios-filled/100/000000/document.png"
              alt="Building Regulations Education"
              class="mx-auto mb-4"
            />
            <h3 class="text-xl font-medium text-gray-700">
              Building Regulations Education
            </h3>
            <p class="text-gray-500 mt-2">
              Learn about local building codes and regulations for your
              construction projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
