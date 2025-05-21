// Header.js
import React from 'react';

const Header = () => {  
    return (
        <div style={{ backgroundColor: 'white', padding: '10px 0' }}> {/* Added background color */}
            <h1 className="text-center">FilmStores</h1>
            <div className="w-100"
                style={{
                    display: "flex", 
                    justifyContent: "center",
                    color: "grey"
                }}>
                <p className="text-center w-40"> 
                    Your online film store!
                    <br />
                    Discover amazing movies and protect your collection with us.
                </p>
            </div>
            <div className="w-100 d-flex justify-content-center align-items-center">
                <form className="d-flex w-25" role="search">
                    <input className="form-control me-2" type="search" aria-label="Search" 
                    placeholder="&#xf002; search by keyword"
                    style={{ fontFamily: "FontAwesome, Arial", fontStyle: "normal" }}
                    />
                    <button 
                        className="btn btn-outline-success" 
                        type="submit"
                        style={{ 
                            backgroundColor: "black", 
                            color: "white",
                            borderColor: "black"  
                        }}
                    >Search</button>
                </form>
            </div>
        </div>
    );
}  
  
export default Header;
