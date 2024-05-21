"use client";

import { useRouter } from "next/navigation";

const Pagination = ({
  currentPage,
  totalPages,
  route,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  route: string;
  onPageChange: (page: number) => void;
}) => {
  const router = useRouter();
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex gap-2">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`w-8 h-8 rounded ${
            currentPage === number ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            router.push(`${route}?page=${number}`, { scroll: false });
            onPageChange(number);
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
