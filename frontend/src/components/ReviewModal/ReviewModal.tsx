import './review-modal.css';

interface ReviewModalProps {
  onModalClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ onModalClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Palikite atsiliepima</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Vardas ir Pavarde</label>
            <input type="text" id="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Atsiliepimas</label>
            <textarea id="description" rows={4} required />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Ivertinimas</label>
            <input
              type="number"
              id="rating"
              placeholder="nuo 1 iki 5"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onModalClose}>
              Atsaukti
            </button>
            <button type="submit">Pateikti</button>
          </div>
        </form>
      </div>
    </div>
  );
};
