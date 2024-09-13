import React from "react";

export const BuildingRegulationsDasboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-700">
            Building Regulations Education
          </h1>
          <p className="mt-4 text-gray-600">
            Stay informed about the latest building regulations and guidelines.
            This platform offers resources to help builders, contractors, and
            citizens comply with national building codes.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Regulatory Updates */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Latest Regulatory Updates
            </h2>
            <p className="text-gray-600">
              Get up-to-date information about changes in building policies,
              safety regulations, and government-approved standards.
            </p>
            <a
              href="#"
              className="inline-block mt-4 text-blue-500 hover:underline"
            >
              Learn More
            </a>
          </div>

          {/* Educational Resources */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Educational Resources
            </h2>
            <p className="text-gray-600">
              Access guides, tutorials, and FAQs to help you understand the key
              aspects of building regulations, covering structural integrity,
              environmental impact, and more.
            </p>
            <a
              href="#"
              className="inline-block mt-4 text-blue-500 hover:underline"
            >
              Access Resources
            </a>
          </div>

          {/* Compliance Tools */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Compliance Tools
            </h2>
            <p className="text-gray-600">
              Use our compliance tools to check your construction project's
              adherence to building codes, calculate costs, and get approval for
              modifications.
            </p>
            <a
              href="#"
              className="inline-block mt-4 text-blue-500 hover:underline"
            >
              Start Now
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white mt-12 p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Frequently Asked Questions
          </h2>
          <ul className="space-y-6">
            <li className="text-gray-600">
              <strong>
                1. What are the key building regulations I need to follow?
              </strong>
              <p className="mt-2">
                Building regulations ensure that construction projects meet
                safety, structural, and environmental standards. In Rwanda,
                these include guidelines for structural integrity, fire safety,
                energy efficiency, and accessibility for persons with
                disabilities. Make sure to check the specific requirements based
                on your region and project type.
              </p>
            </li>
            <li className="text-gray-600">
              <strong>2. How do I get approval for construction plans?</strong>
              <p className="mt-2">
                You will need to submit your construction plans to local
                authorities for approval. The approval process includes
                verifying compliance with building regulations, zoning laws, and
                environmental impact assessments. BudgetBuild helps guide you
                through the necessary steps and documentation required for
                approval.
              </p>
            </li>
            <li className="text-gray-600">
              <strong>
                3. What documents are required to submit for a building permit?
              </strong>
              <p className="mt-2">
                Typical documents include architectural plans, site plans,
                engineering reports, and environmental impact assessments. You
                may also need to submit a cost estimate and timeline for the
                project. Our platform provides templates and resources to help
                you gather and organize these documents.
              </p>
            </li>
            <li className="text-gray-600">
              <strong>
                4. What are the penalties for non-compliance with building
                regulations?
              </strong>
              <p className="mt-2">
                Non-compliance with building regulations can result in fines,
                suspension of construction work, or even demolition of
                non-compliant structures. It is important to ensure compliance
                from the beginning to avoid costly delays or penalties. The
                BudgetBuild platform offers tools to check compliance at every
                stage of your project.
              </p>
            </li>
            <li className="text-gray-600">
              <strong>
                5. How can I update my construction plans after receiving
                approval?
              </strong>
              <p className="mt-2">
                If you need to make changes to your approved plans, you must
                submit an amendment request to the local authority that granted
                your original permit. The amendment process will require a
                revised set of documents that reflect the changes. BudgetBuild
                will help you understand the amendment process and ensure a
                smooth resubmission.
              </p>
            </li>
            <li className="text-gray-600">
              <strong>
                6. Are there specific building codes for energy-efficient or
                sustainable construction?
              </strong>
              <p className="mt-2">
                Yes, Rwanda has adopted specific building codes to encourage
                energy efficiency and sustainability in construction. These
                codes focus on reducing energy consumption, using renewable
                resources, and ensuring buildings are environmentally
                sustainable. BudgetBuild provides resources and guidelines to
                help you meet these green building standards.
              </p>
            </li>
            <li className="text-gray-600">
              <strong>
                7. How do I ensure accessibility compliance in my building?
              </strong>
              <p className="mt-2">
                Accessibility standards in Rwanda require buildings to be
                designed with provisions for persons with disabilities. This
                includes ramps, wide doorways, accessible toilets, and elevators
                where necessary. Our platform provides detailed guidelines and
                resources to help you design buildings that meet accessibility
                standards.
              </p>
            </li>
            <li className="text-gray-600">
              <strong>
                8. Can I get assistance in finding licensed contractors?
              </strong>
              <p className="mt-2">
                Yes, BudgetBuild offers a Contractor Recommendation feature that
                helps you find licensed and reviewed contractors in your area.
                It also provides reviews and ratings from other users to ensure
                you work with trusted professionals.
              </p>
            </li>
            <li className="text-gray-600">
              <strong>
                9. How often are building regulations updated, and how do I stay
                informed?
              </strong>
              <p className="mt-2">
                Building regulations are periodically updated to reflect new
                safety, environmental, and technological standards. BudgetBuild
                provides a subscription feature that will notify you of any
                updates in real-time, ensuring that your project stays compliant
                with the latest regulations.
              </p>
            </li>
            <li className="text-gray-600">
              <strong>
                10. What should I do if I face challenges understanding building
                regulations?
              </strong>
              <p className="mt-2">
                If you face challenges, you can use the educational resources
                and tutorials available on BudgetBuild. You may also consult
                with a building inspector or hire a consultant to help clarify
                any regulations specific to your project. BudgetBuild also
                provides a support system where you can ask experts for advice.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
