import { useContext } from "react";
import { StockContext } from "../context/StockContext";

export default function useStock() {
  return useContext(StockContext)
}