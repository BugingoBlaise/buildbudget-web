import { useState } from "react";

const API_URL = "http://localhost:8080/api/regulations";

const RegulationsList = ({ regulations, onRegulationSelect }) => {
  const [selectedRegulation, setSelectedRegulation] = useState(null);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength).trim()}...`
      : text;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return "";
    }
  };

  const handleReadMore = (regulation) => {
    setSelectedRegulation(regulation);
    onRegulationSelect?.(regulation);
  };

  if (!regulations?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No regulations available.</p>
      </div>
    );
  }

  return (
    <section className="py-3 sm:py-8 lg:py-22">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Recent Regulations
          </h2>
          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            Stay updated on the latest building regulations to ensure compliance
            and quality.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
          {regulations.map((regulation) => (
            <article
              key={regulation.id}
              className="flex flex-col items-center gap-4 md:flex-row lg:gap-6"
            >
              <div className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
                <img
                  src={`${API_URL}/image/${regulation.regulationImagePath}`}
                  alt={regulation.regulationTitle}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/400/400";
                    e.target.alt = "Placeholder image";
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">
                  {formatDate(regulation.date)}
                </span>

                <h2 className="text-xl font-bold text-gray-800">
                  {regulation.regulationTitle}
                </h2>

                <p className="text-sm text-gray-600 mt-2">
                  {truncateText(regulation.regulationDetails, 100)}
                </p>

                <button
                  onClick={() => handleReadMore(regulation)}
                  className="inline-block w-fit font-semibold text-rose-500 transition duration-100 hover:text-rose-600 active:text-rose-700"
                >
                  Read more
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegulationsList;
