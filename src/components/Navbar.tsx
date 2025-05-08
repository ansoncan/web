import React from 'react';

const Navbar = () => {  
    return (
        <>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#" style={{ marginLeft: "80px" }}>FilmVault</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav marginLeft w-100">
        <li class="nav-item ms-5">
          <a class="nav-link" href="#">Product</a>
        </li>
        <li class="nav-item ms-5">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item ms-5">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item ms-5">
          <a class="nav-link" href="#">FAQ</a>
        </li>
        <li class="nav-item  ms-5">
          <a class="nav-link" href="#">Contact</a>
        </li>
      </ul>

      {/* <i 
        class="fa fa-search" 
        
        style={{ fontSize: "24px", color: "black", marginLeft: "auto", marginRight: "80px",cursor: "pointer" }}
        aria-hidden="true"
      ></i> */}

    </div>
  </div>
</nav>
        </>
      )
    
}  
  
export default Navbar;
