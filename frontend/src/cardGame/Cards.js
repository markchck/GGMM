import ReactFlipCard from 'reactjs-flip-card'
import React, { Component, useEffect, useState, useRef } from 'react';
import image from "./cardCover.jpg"

function Cards({card}) {
    const styles = {
        sectionExample: {
            background: "#f1f1f1",
            margin: 10,
            padding: 10,
            borderRadius: 20
        },
        textAlignCenter: {textAlign: "center"},
        fontStyleItalic: {fontStyle: "italic"},
        card: {background: 'red', color: 'white', borderRadius: 20,},
    }

    const [cardCheck, setCardCheck] = useState(true);

    return (
    <>
        {cardCheck ? (
        <ReactFlipCard
            frontStyle={styles.card}
            backStyle={styles.card}
            flipTrigger={"onClick"}
            frontComponent={<img width={100} src={image} height={100} alt={""} />}
            backComponent={card}
            onClick={()=>{setCardCheck(false)}}
        />
        ) : (
        <ReactFlipCard
            frontStyle={styles.card}
            backStyle={styles.card}
            flipTrigger={"disabled"}
            frontComponent={<img width={100} src={image} height={100} alt={""} />}
            backComponent={card}
        />
        )}
    </>
    );
    }

export default Cards;