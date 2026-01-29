import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../../Store/auth.store";
import { logout as logoutApi } from "../../Api/auth.api";
import LiveActivity from "../LiveActivity/LiveActivity";
import "./Header.scss";
import NotificationBell from "../NotificationsBell/NotificationsBell.jsx";


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
const menuRef = useRef(null);

  const { isAuth, logout, user } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      logout();
      navigate("/auth");
    }
  };

useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);



  return (
    <header className="site-header">
      <div className="site-header__inner">
        {/* ================= TOP ROW ================= */}
        <div className="header-top">
          {/* BRAND */}
          <div className="brand">
            <div className="brand__mark" />
            <div className="brand__text">
              <span className="brand__name">Auct.</span>
              <span className="brand__tag">first wins · second pays</span>
            </div>
          </div>

          <nav className="nav">
  <NavLink to="/" className="nav__link">Главная</NavLink>
  <NavLink to="/auctions" className="nav__link">Аукционы</NavLink>
  <NavLink to="/upgrades" className="nav__link">Апгрейд</NavLink>
  <NavLink to="/giveaways" className="nav__link">Розыгрыши</NavLink>
  <NavLink to="/tournaments" className="nav__link">Турниры</NavLink>

  {isAuth && (
    <NavLink to="/wallet" className="nav__link">
      Кошелёк
    </NavLink>
  )}

  <NavLink to="/fairness" className="nav__link">Честность</NavLink>
</nav>
        
<div className="actions">
  {isAuth && <NotificationBell />}


  {isAuth && (
    <button className="chip" type="button">
      <span className="chip__label">Баланс</span>
      <span className="chip__value">{user?.balance ?? 0} ₽</span>
    </button>
  )}


  {isAuth ? (
  <div className="user-mini" ref={menuRef}>
    <div
      className="user-mini__main"
      onClick={() => setOpen((v) => !v)}
    >
      <div className="user-mini__avatar">
        {user?.username?.[0]?.toUpperCase() || "?"}
      </div>
      <span className="user-mini__name">{user?.username}</span>
    </div>

    {open && (
      <div className="user-mini__dropdown">
        <NavLink to="/profile" onClick={() => setOpen(false)}>Профиль</NavLink>
        <NavLink to="/wallet" onClick={() => setOpen(false)}>Кошелёк</NavLink>
        <NavLink to="/Mybids" onClick={() => setOpen(false)}>Мои ставки</NavLink>
        <NavLink to="/notifications" onClick={() => setOpen(false)}>Уведомления</NavLink>
            <NavLink to="/inventory" onClick={() => setOpen(false)}>Инвентарь</NavLink>
        <button onClick={handleLogout}>Выйти</button>
      </div>
    )}
  </div>
) : (
  <NavLink
    to="/auth"
    className="auth-btn"
    state={{ from: location.pathname }}
  >
    Войти
  </NavLink>
)}
</div>
        </div>

      
        <div className="header-live">
          <LiveActivity />
        </div>
      </div>
    </header>
  );
};

export default Header;
