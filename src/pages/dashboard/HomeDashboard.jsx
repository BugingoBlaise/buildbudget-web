import React from "react";

export const HomeDashboard = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-whiteTheme-primaryColor border-r-transparent align-[-0.125em]"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
