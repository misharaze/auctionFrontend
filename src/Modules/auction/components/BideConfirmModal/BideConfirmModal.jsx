import "./BideConfirmModal.scss";

const BidConfirmModal = ({ amount, onClose, onConfirm }) => {
  return (
    <div className="bid-modal">
      <div className="bid-modal__card">
        <div className="bid-modal__title">Подтверждение ставки</div>

        <div className="bid-modal__amount">
          Ваша ставка: <b>{amount} ₽</b>
        </div>

        <div className="bid-modal__rules">
          <div className="row">
            <span className="k">Если вы 1 место</span>
            <span className="v ok">вы забираете лот</span>
          </div>
          <div className="row">
            <span className="k">Если вы 2 место</span>
            <span className="v bad">вы оплачиваете ставку</span>
          </div>
          <div className="tip">
            Ставку нельзя отменить. Делайте её осознанно.
          </div>
        </div>

        <div className="bid-modal__actions">
          <button className="btn ghost" onClick={onClose}>Отмена</button>
          <button className="btn primary" onClick={onConfirm}>Подтвердить</button>
        </div>
      </div>
    </div>
  );
};

export default BidConfirmModal;
