type Props = { 
    error: Error;
    onClose: () => void; // Add onClose prop to handle button click
}

const HintContainer: React.FC<Props> = ({ error, onClose }) => { 
    return (
        <div className="hintDiv">
            <p className="hintDivText">{error.message}</p>
            <button className="closeButton" onClick={onClose}>
                Close
            </button>
        </div>
    );
};

export default HintContainer;