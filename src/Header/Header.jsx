/* eslint-disable react/no-unescaped-entities */
import bilGatesImage from "/billgates.jpg";

import "./HeaderStyles.css";

function Header() {
  return (
    <div className="header-body">
      <img src={bilGatesImage} alt="Bil gates photo" />
      <h3>Spend Bill Gate's Money</h3>
    </div>
  );
}

export default Header;
