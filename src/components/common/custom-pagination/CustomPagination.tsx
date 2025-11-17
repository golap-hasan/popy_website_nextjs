import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationIdentifier = number | "...";

type UsePaginationOptions = {
  totalPages: number;
  currentPage: number;
  siblingCount?: number;
};

const usePagination = ({
  totalPages,
  currentPage,
  siblingCount = 1,
}: UsePaginationOptions): PaginationIdentifier[] => {
  const paginationRange = React.useMemo<PaginationIdentifier[]>(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return [...Array(totalPages)].map((_, idx) => idx + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = [...Array(leftItemCount)].map((_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = [...Array(rightItemCount)].map(
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = [];
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        middleRange.push(i);
      }
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
    return [];
  }, [totalPages, currentPage, siblingCount]);

  return paginationRange || [];
};

type CustomPaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage?: (page: number) => void;
  syncWithUrl?: boolean;
  preserveParams?: string[];
  defaultLimit?: string;
  anchorId?: string;
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  syncWithUrl = false,
  preserveParams = ["limit"],
  defaultLimit = "1",
  anchorId,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlPage = Number(searchParams?.get("page")) || 1;
  const effectiveCurrentPage = syncWithUrl ? urlPage : currentPage;

  const updateUrlPage = (targetPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (targetPage > 1) {
      params.set("page", String(targetPage));
    } else {
      params.delete("page");
    }
    // preserve selected params
    for (const key of preserveParams) {
      const val = searchParams?.get(key);
      if (!val) {
        params.delete(key);
        continue;
      }
      if (key === "limit" && val === defaultLimit) {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    }
    const qs = params.toString();
    const hash = anchorId ? `#${anchorId}` : "";
    router.push(`${pathname}${qs ? `?${qs}` : ""}${hash}`, { scroll: false });
  };

  const goToPage = (target: number) => {
    if (syncWithUrl) {
      updateUrlPage(target);
    } else if (setCurrentPage) {
      setCurrentPage(target);
    }
  };

  const paginationRange = usePagination({ currentPage: effectiveCurrentPage, totalPages });

  if (effectiveCurrentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(Math.max(effectiveCurrentPage - 1, 1));
            }}
            className={
              effectiveCurrentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(pageNumber as number);
                }}
                isActive={effectiveCurrentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(Math.min(effectiveCurrentPage + 1, totalPages));
            }}
            className={
              effectiveCurrentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
