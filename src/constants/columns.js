const COLUMNS = {
  users: [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "First Name",
      accessor: "first_name",
    },
    {
      Header: "Last Name",
      accessor: "last_name",
    },
    {
      Header: "Date of Birth",
      accessor: "date_of_birth",
    },
    {
      Header: "Country",
      accessor: "country",
    },
    {
      Header: "Phone Number",
      accessor: "phone",
    },
  ],
  contractors: [
    // {
    //   Header: "Id",
    //   accessor: "id",
    // },
    {
      Header: "Company Name",
      accessor: "companyName",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "License Number",
      accessor: "licenseNumber",
    },
    {
      Header: "Average Rating",
      accessor: "averageRating",
    },
  ],
};

export default COLUMNS;
