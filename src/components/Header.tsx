import '../css/Header.css'; // Import the CSS file
import { Button } from 'react-bootstrap'

const Header = ({ pagination }) => {
  return (
    <div className="header">
      <div className="w-100 d-flex justify-content-center mt-4">
        <form className="d-flex w-25 search-bar" role="search">
          <input
            className="form-control me-2"
            type="search"
            aria-label="Search"
            placeholder="&#xf002;  Search by Keyword"
            style={{ fontFamily: 'FontAwesome, Arial', fontStyle: 'normal' }}
          />
          <Button variant="outline-dark" type="submit">
            Search
          </Button>
        </form>
      </div>

      <div className="d-flex justify-content-center mt-3 pagination">
        {pagination}
      </div>
    </div>
  );
};

export default Header;