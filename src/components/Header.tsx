import React from 'react';

const Header = () => {  
    return (
        <>
        
        
        <h1 className="text-center">FilmVault</h1>
            
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
                <div class="w-100 d-flex justify-content-center align-items-center">
        <form class="d-flex w-25" role="search">
            <input class="form-control me-2" type="search" aria-label="Search" 
            placeholder="&#xf002;"
            style={{ fontFamily: "FontAwesome, Arial", fontStyle: "normal" }}
            
            />
             <button 
                class="btn btn-outline-success" 
                type="submit"
                style={{ 
                    backgroundColor: "black", 
                    color: "white",
                    borderColor: "black"  }}
                >Search</button>
      </form>

      </div>
        
        </>
      )
    
}  
  
export default Header;