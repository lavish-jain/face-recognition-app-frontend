import React from 'react';
import './FaceRecognition.css'

class FaceRecognition extends React.Component {
    renderBoxes() {
        const divs = [];
        const boxes = this.props.boxes;
        for(let box of boxes) {
            const style = {
                left: box.leftCol,
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
            }
            divs.push(<div className='bounding-box' style={style}></div>);
        }
        return divs;
    }
    render() {
        return (
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img id='image' src={this.props.imageUrl} alt='' />
                    {this.renderBoxes()}
                </div>
            </div>
        )
    }
}

export default FaceRecognition;