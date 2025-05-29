// import React, { useState, useEffect } from 'react';
// import defaultImage from '../assets/poster_not_found.png'; // Default image path
// import { baseURL } from '../common/http-common';
// import { Link } from 'react-router-dom';
// import Pagination from 'react-bootstrap/Pagination'; // Import Pagination from react-bootstrap

// type Film = {
//   _id: string;
//   title: string;
//   year: string;
//   poster: string | null; // poster can be a string, null, or ''
// };

// const Card: React.FC = () => {
//   const [films, setFilms] = useState<Film[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalFilms, setTotalFilms] = useState<number>(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${baseURL}/films`); // Ensure baseURL is defined correctly
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data: Film[] = await response.json();
//         setTotalFilms(data.length);
//         setFilms(data);
//       } catch (error: any) {
//         setError(error.message);
//         console.error('Fetch error:', error.message); // Log the error for debugging
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // Calculate the films to display for the current page (8 per page)
//   const filmsPerPage = 8;
//   const startIndex = (currentPage - 1) * filmsPerPage;
//   const endIndex = startIndex + filmsPerPage;
//   const currentFilms = films.slice(startIndex, endIndex);

//   return (
//     <div>
//       <div className="container">
//         {/* Centered Pagination */}
//         <div
//           className="d-flex justify-content-center mb-4"
//           style={{ color: 'black' }} // Black text for pagination
//         >
//           <Pagination>
//             <Pagination.First onClick={() => handlePageChange(1)} />
//             <Pagination.Prev
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             />
//             {/* Render page numbers */}
//             {Array.from({ length: Math.ceil(totalFilms / filmsPerPage) }, (_, index) => index + 1).map(
//               (pageNumber) => (
//                 <Pagination.Item
//                   key={pageNumber}
//                   active={pageNumber === currentPage}
//                   onClick={() => handlePageChange(pageNumber)}
//                 >
//                   {pageNumber}
//                 </Pagination.Item>
//               )
//             )}
//             <Pagination.Next
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === Math.ceil(totalFilms / filmsPerPage)}
//             />
//             <Pagination.Last onClick={() => handlePageChange(Math.ceil(totalFilms / filmsPerPage))} />
//           </Pagination>
//         </div>

//         {/* Film Cards */}
//         <div className="row row-cols-1 row-cols-md-4 g-4" style={{ marginTop: '20px' }}>
//           {currentFilms.map((film) => (
//             <div className="col" key={film._id}>
//               <Link to={`/detail/${film._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                 <div className="card" style={{ height: '550px' }}>
//                   <img
//                     src={
//                       film.poster === null || film.poster === '' || film.poster === 'null'
//                         ? defaultImage
//                         : film.poster
//                     }
//                     className="card-img-top"
//                     alt={film.title}
//                     style={{ height: '450px', objectFit: 'cover' }}
//                     title={film.title}
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src = defaultImage;
//                     }}
//                   />
//                   <div className="card-body">
//                     <h6
//                       className="card-title"
//                       style={{ fontSize: '16px', fontWeight: 'bold' }}
//                       title={film.title}
//                     >
//                       {film.title.length > 80 ? `${film.title.substring(0, 80)}..` : film.title}
//                     </h6>
//                     <p className="card-text" style={{ color: 'grey' }}>
//                       {film.year}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React, { useState, useEffect } from 'react';
import defaultImage from '../assets/poster_not_found.png'; // Default image path
import { baseURL } from '../common/http-common';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination'; // Import Pagination from react-bootstrap

type Film = {
  _id: string;
  title: string;
  year: string;
  poster: string | null; // poster can be a string, null, or ''
};

const Card: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalFilms, setTotalFilms] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/films`); // Ensure baseURL is defined correctly
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Film[] = await response.json();
        setTotalFilms(data.length);
        setFilms(data);
      } catch (error: any) {
        setError(error.message);
        console.error('Fetch error:', error.message); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calculate the films to display for the current page (8 per page)
  const filmsPerPage = 8;
  const startIndex = (currentPage - 1) * filmsPerPage;
  const endIndex = startIndex + filmsPerPage;
  const currentFilms = films.slice(startIndex, endIndex);

  // Pagination logic with truncation
  const maxVisiblePages = 10; // Maximum number of visible page numbers
  const totalPages = Math.ceil(totalFilms / filmsPerPage);

  // Determine the range of visible pages
  const halfVisible = Math.floor(maxVisiblePages / 2);
  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, currentPage + halfVisible);

  // Adjust startPage and endPage to ensure maxVisiblePages
  if (endPage - startPage + 1 > maxVisiblePages) {
    if (currentPage - startPage < maxVisiblePages - (endPage - currentPage)) {
      endPage = startPage + maxVisiblePages - 1;
    } else {
      startPage = endPage - maxVisiblePages + 1;
    }
  }

  return (
    <div>
      <div className="container">
        {/* Centered Pagination */}
        <div
          className="d-flex justify-content-center mb-4"
          style={{ color: 'black' }} // Black text for pagination
        >
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {/* Render page numbers with truncation */}
            {startPage > 1 && (
              <>
                <Pagination.Item>{1}</Pagination.Item>
                {startPage > 2 && <Pagination.Ellipsis />}
              </>
            )}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(
              (pageNumber) => (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === currentPage}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              )
            )}
            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && <Pagination.Ellipsis />}
                <Pagination.Item>{totalPages}</Pagination.Item>
              </>
            )}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} />
          </Pagination>
        </div>

        {/* Film Cards */}
        <div className="row row-cols-1 row-cols-md-4 g-4" style={{ marginTop: '20px' }}>
          {currentFilms.map((film) => (
            <div className="col" key={film._id}>
              <Link to={`/detail/${film._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{ height: '550px' }}>
                  <img
                    src={
                      film.poster === null || film.poster === '' || film.poster === 'null'
                        ? defaultImage
                        : film.poster
                    }
                    className="card-img-top"
                    alt={film.title}
                    style={{ height: '450px', objectFit: 'cover' }}
                    title={film.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultImage;
                    }}
                  />
                  <div className="card-body">
                    <h6
                      className="card-title"
                      style={{ fontSize: '16px', fontWeight: 'bold' }}
                      title={film.title}
                    >
                      {film.title.length > 80 ? `${film.title.substring(0, 80)}..` : film.title}
                    </h6>
                    <p className="card-text" style={{ color: 'grey' }}>
                      {film.year}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;