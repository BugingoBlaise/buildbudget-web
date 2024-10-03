import { useMemo } from "react";
import MOCK_DATA from "../../assets/data/db.json";
import COLUMNS from "../../constants/columns";

import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Rating } from "./child/Rating";
const API_URL = "http://localhost:8080/api/contractors";

export const ReviewRates = () => {
  const fetchContractors = useCallback(() => {
    axios
      .get(API_URL)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    fetchContractors();
  }, [fetchContractors]);
  return (
    <div>
      <Rating />
    </div>
  );
};
