import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="f-brand">
          <div className="f-brand__mark" />
          <div className="f-brand__text">
            <div className="f-brand__name">Auct.</div>
            <div className="f-brand__tag">first wins · second pays</div>
          </div>
        </div>

        <div className="f-cols">
          <div className="f-col">
            <div className="f-col__t">Платформа</div>
            <a className="f-link" href="/auctions">Аукционы</a>
            <a className="f-link" href="/upgrades">Апгрейд</a>
            <a className="f-link" href="/fairness">Честность</a>
          </div>

          <div className="f-col">
            <div className="f-col__t">Аккаунт</div>
            <a className="f-link" href="/profile">Профиль</a>
            <a className="f-link" href="/wallet">Кошелёк</a>
            <a className="f-link" href="/notifications">Уведомления</a>
          </div>

          <div className="f-col">
            <div className="f-col__t">Правила</div>
            <div className="f-muted">2 место оплачивает риск.</div>
            <div className="f-muted">Никаких скрытых комиссий.</div>
            <div className="f-muted">Проверяемая механика.</div>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div>© {new Date().getFullYear()} Auct.</div>
        <div className="f-bottom__right">
          <span className="f-dot" />
          <span>Online</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
