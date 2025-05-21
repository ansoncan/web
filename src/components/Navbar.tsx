import React from 'react';

const Navbar = () => {  
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedDateTime = currentTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) + ', ' + currentTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#" style={{ marginLeft: "80px" }}>FilmStores</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav w-100">
                            <li className="nav-item ms-5">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item ms-5">
                                <a className="nav-link" href="#">Films</a>
                            </li>
                            <li className="nav-item ms-5">
                                <a className="nav-link" href="#">Login</a>
                            </li>
                        </ul>
                        <div className="ms-auto nav-item me-4" style={{ whiteSpace: "nowrap" }}>
                            <span className="navbar-text">
                                {formattedDateTime}
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}  
  
export default Navbar;

