import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons'; // Importe o ícone de hambúrguer aqui
import styled from 'styled-components';

const Header = styled.header`
  background: linear-gradient(45deg, #181842, #363BC4);
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 24px;

  img {
    margin-right: 10px;
  }
`;

const Navbar = styled.nav`
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    @media (max-width: 768px) {
    display: none;
  }
  }

  li {
    margin-right: 20px;

    a {
      text-decoration: none;
      color: #fff;
      font-weight: bold;
      font-size: 18px;

      &:hover {
        color: #007bff;
      }
    }
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 20px;

  .dropbtn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
  }

  .dropbtn:hover {
    color: #007bff;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #fff;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    color: #fff;
    background-color: #363BC4;
    font-weight: bold;
    font-size: 16px;
  }

  .dropdown-content a:hover {
    background-color: #007bff;
    color: #fff;
  }

  .show {
    display: block;
  }

  .dropbtn i {
    margin-left: 8px;
  }
`;

const NavbarToggle = styled.i`
  cursor: pointer;
  font-size: 24px;
  color: #fff;
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin-right: 10px;
  }
`;

const PrivacyPopup = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: none;
  }

  .privacy-popup-text-header {
    display: flex;
    align-items: center;

    h2 {
      margin-left: 10px;
      font-size: 18px;
      font-weight: bold;
    }

    a {
      margin-left: auto;
      text-decoration: none;
      color: #007bff;
      font-size: 16px;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .privacy-popup-text-body {
    font-size: 14px;
    margin-top: 10px;
  }

  .privacy-popup-buttons {
    margin-top: 10px;

    button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
      margin-right: 10px;
      font-size: 16px;
      font-weight: bold;

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

const MobileNav = styled.nav<{ open: boolean }>`
  background: linear-gradient(45deg, #181842, #363BC4);
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 999;
  text-align: center;
  padding: 10px 0;
  display: ${(props) => (props.open ? 'block' : 'none')};

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 15px;

      a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        font-size: 18px;

        &:hover {
          color: #007bff;
        }
      }
    }
  }
`;

const NavbarComponent = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <Header>
      <Container>
        <Logo href="/index.html">
          <img src="https://www.dielenergia.com/assets/img/diel/icon.svg" alt="Logo" />
        </Logo>
        <Navbar style={{ display: 'flex' }}>
          <ul>
            <li>
              <a href="/diel.html">
                <span>A Diel</span>
              </a>
            </li>
            <li>
              <a href="/solucao.html">Soluções</a>
            </li>
            <li>
              <a href="/beneficios.html">Benefícios</a>
            </li>
            <li>
              <a href="/contato.html">Contato</a>
            </li>
            <li>
              <a href="https://dap.dielenergia.com/login" className="login">
                Área do cliente
              </a>
            </li>
          </ul>
          <Dropdown>
            <button className="dropbtn" onClick={toggleDropdown}>
              BR
              <i className={`bi bi-list ${dropdownOpen ? 'show' : ''}`}>
                <FontAwesomeIcon icon={faChevronDown} />
              </i>
            </button>
            <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
              <a href="/en/index.html">
                US
              </a>
            </div>
          </Dropdown>
        </Navbar>
        <NavbarToggle className="bi bi-list mobile-nav-toggle" onClick={toggleMobileNav}>
          <FontAwesomeIcon icon={faBars} /> {/* Adicione o ícone de hambúrguer aqui */}
        </NavbarToggle>
        <MobileNav open={mobileNavOpen}>
          <ul>
            <li>
              <a href="/diel.html">
                <span>A Diel</span>
              </a>
            </li>
            <li>
              <a href="/solucao.html">Soluções</a>
            </li>
            <li>
              <a href="/beneficios.html">Benefícios</a>
            </li>
            <li>
              <a href="/contato.html">Contato</a>
            </li>
            <li>
              <a href="https://dap.dielenergia.com/login" className="login">
                Área do cliente
              </a>
            </li>
            <li>
              <a href="/en/index.html">
                US
              </a>
            </li>
          </ul>
        </MobileNav>
      </Container>
    </Header>
  );
};

export default NavbarComponent;
