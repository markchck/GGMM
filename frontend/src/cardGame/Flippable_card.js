// import './flippable-card.css';
import Card from './Card_info';
import {CSSTransition} from 'react-transition-group';
import {useState} from 'react';

function FlippableCard({id}) {
    const [showFront, setShowFront] = useState(true);
    return(
        <div className="flippable-card-container">
            <CSSTransition
                in={showFront}
                timeout={300}
                classNames='flip'
            >
                <Card id={id} onClick={() => {
                    setShowFront((v) => !v);
                }}/>
            </CSSTransition>
        </div>
    );
}

export default FlippableCard;