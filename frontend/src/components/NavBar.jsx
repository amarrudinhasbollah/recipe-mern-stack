import React from 'react'
import { BsHouseFill, BsPersonFill, BsPersonCircle, BsBoxArrowInRight, BsPencilSquare } from "react-icons/bs";

const NavBar = () => {
  return (
    <div class="container-fluid">
    <a class="navbar-brand" href="#">📜🖊Share-A-Recipe</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#"><BsHouseFill /> Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><BsBoxArrowInRight /> Log In</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <BsPersonFill /> Profile
            </a>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><a class="dropdown-item" href="#"><BsPersonCircle /> View Profile</a></li>
              <li><a class="dropdown-item" href="#"><BsPencilSquare /> Write a Recipe</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default NavBar