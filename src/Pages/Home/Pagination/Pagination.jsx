import { useNavigate, useLocation } from 'react-router-dom';
import usePageNumber from '../../../store/usePageNumber';

const Pagination = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { numberOfPages } = usePageNumber();

  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page") || "1");

  const changePage = (page) => {
    searchParams.set("page", page.toString());
    navigate({ search: searchParams.toString() });
  };

  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  if (numberOfPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 space-x-2 font-primary">
      <button
        className="px-3 py-1 border rounded bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => changePage(page)}
          className={`px-3 py-1 border rounded ${
            currentPage === page ? 'bg-blue text-white' : 'bg-white text-gray-700'
          } hover:bg-blue-100`}
        >
          {page}
        </button>
      ))}

      <button
        className="px-3 py-1 border rounded bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === numberOfPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
