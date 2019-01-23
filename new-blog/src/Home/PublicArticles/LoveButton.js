import React from 'react';

const LoveButton = (props) => {
    let loveArt = [];
    let loveArticles = localStorage.getItem("loveArticles");
    if (loveArticles != 'undefined' && loveArticles != undefined) { 
        loveArt = loveArticles.split(",").filter(art => art === props.title);
    }
    
    if (loveArt[0]) {
        return (
            <div onClick={props.loveClicked} className="btn btn-primary btn-sm pull-xs-right">
                <i className="ion-heart"></i>
                &nbsp;
                {props.love}  
            </div>
        )
    } 
    else {
        return (
            <div onClick={props.loveClicked} className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart"></i>
                &nbsp;
                {props.love}  
            </div>
        )
    }
    
}

export default LoveButton;