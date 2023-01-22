import Card from './Card_info';
import {CSSTransition} from 'react-transition-group';
import {useState} from 'react';

function FlippableCard() {
    const [showFront, setShowFront] = useState(true);
    return(
        <div>
            <CSSTransition
                in={showFront}
                timeout={300}
                classNames='flip' 
            >
                <Card onClick={() => {
                    setShowFront((v) => !v);
                }}/>
            </CSSTransition>
        </div>
    );
}

export default FlippableCard;