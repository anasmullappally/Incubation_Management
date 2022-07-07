import React from 'react'

const Progress_bar = ({ status, height = 15 }) => {
    let progress, bgcolor, text,textColor;
    if (status === "new") {
        bgcolor = 'red'
        progress = 0
        text = 'Submitted'
    }
    if (status === "pending") {
        bgcolor = 'orange'
        progress = 30
        text = 'Under Progress'
    }
    if (status === "approved") {
        bgcolor = '#99ff66'
        progress = 60
        text = 'Approved'
    }
    if (status === 'selected') {
        bgcolor = '#99ccff'
        progress = 100
        text = "Completed"

    }
    if (status === "declined") {
        bgcolor = 'red'
        progress = 0
        text = 'Declianed'
        textColor='red'

       
    }


    const Parentdiv = {
        height: height,
        width: '80%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: 50
    }

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius: 40,
        textAlign: 'right'
    }

    const progresstext = {
        padding: 10,
        color:textColor,
        fontWeight: 900
    
    }

    return (
        <div style={Parentdiv}>
            <div style={Childdiv}>
                <span className='mb-3' style={progresstext}>{`${text}`}</span>
            </div>
        </div>
    )
}

export default Progress_bar;
