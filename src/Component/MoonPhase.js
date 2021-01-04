import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "../Component/MoonPhase.css"

class MoonPhase extends React.Component {


  
    getMoonPhase = () => {
        let b = 0
        let jd = b
        let e = jd
        let c = e
        let month = this.props.month()
        let day = this.props.day()
        let year = this.props.year()
    
        if (month < 3) {
        year--;
        month += 12;
        }
        ++month;
        c = 365.25 * year;
        e = 30.6 * month;
        jd = c + e + day - 694039.09; //jd is total days elapsed
        jd /= 29.5305882; //divide by the moon cycle
        b = parseInt(jd); //int(jd) -> b, take integer part of jd
        jd -= b; //subtract integer part to leave fractional part of original jd
        b = Math.round(jd * 8); //scale fraction from 0-8 and round
        if (b >= 8 ) {
            b = 0; //0 and 8 are the same so turn 8 into 0
        }
    
        // 0 => New Moon
        // 1 => Waxing Crescent Moon
        // 2 => Quarter Moon
        // 3 => Waxing Gibbous Moon
        // 4 => Full Moon
        // 5 => Waning Gibbous Moon
        // 6 => Last Quarter Moon
        // 7 => Waning Crescent Moon
    
        return b;
    }

    renderMoonPhase = () => {
        if (this.getMoonPhase() === 0) {
            return (
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <h6 className="LeftCol">Todays Moon Phase:</h6>
                         </Col>
                        <Col xs={6} md={4}>
                            <h6 className="CenterCol">New Moon</h6>
                        </Col>
                        <Col xs={6} md={4}>
                        <img className="MoonImage" src="/NewMoon.png" alt="New Moon"/>    
                        </Col>
                    </Row>
                </Container>
            )
        } else if (this.getMoonPhase() === 1) {
            return (
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <h6 className="LeftCol">Todays Moon Phase:</h6>
                         </Col>
                        <Col xs={6} md={4}>
                            <h6 className="CenterCol">Waxing Crescent Moon</h6>
                        </Col>
                        <Col xs={6} md={4}>
                            <img className="MoonImage" src="/WaxingCrescent.png" alt="New Moon"/>    
                        </Col>
                    </Row>
                </Container>
                )
        } else if (this.getMoonPhase() === 2) {
            return (
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <h6 className="LeftCol">Todays Moon Phase:</h6>
                         </Col>
                        <Col xs={6} md={4}>
                            <h6 className="CenterCol">Quarter Moon</h6>
                        </Col>
                        <Col xs={6} md={4}>
                            <img className="MoonImage" src="/FirstQuarter.png" alt="New Moon"/>   
                        </Col>
                    </Row>
                </Container>
                )
        } else if (this.getMoonPhase() === 3) {
            return (
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <h6 className="LeftCol">Todays Moon Phase:</h6>
                         </Col>
                        <Col xs={6} md={4}>
                            <h6 className="CenterCol">Waxing Gibbous Moon</h6>
                        </Col>
                        <Col xs={6} md={4}>
                            <img className="MoonImage" src="/WaxingGibbous.png" alt="New Moon"/>   
                        </Col>
                    </Row>
                </Container>
                )
        } else if (this.getMoonPhase() === 4) {
            return (
                <Container>
                        <Row>
                        <Col xs={6} md={4}>
                            <h6 className="LeftCol">Todays Moon Phase:</h6>
                        </Col>
                        <Col xs={6} md={4}>
                            <h6 className="CenterCol">Full Moon</h6>
                        </Col>
                        <Col xs={6} md={4}>
                            <img className="MoonImage" src="/FullMoon.png" alt="New Moon"/> 
                        </Col>
                    </Row>
                </Container>
            )
        } else if (this.getMoonPhase() === 5) {
            return (
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <h6 className="LeftCol">Todays Moon Phase:</h6>
                         </Col>
                        <Col xs={6} md={4}>
                            <h6 className="CenterCol">Waning Gibbous</h6>
                        </Col>
                        <Col xs={6} md={4}>
                            <img className="MoonImage" src="/WaningGibbous.png" alt="Waning Gibbous"/> 
                        </Col>
                    </Row>
                </Container>
                )
        } else if (this.getMoonPhase() === 6) {
            return (
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <h6 className="LeftCol">Todays Moon Phase:</h6>
                         </Col>
                        <Col xs={6} md={4}>
                            <h6 className="CenterCol">Last Quarter Moon</h6>
                        </Col>
                        <Col xs={6} md={4}>
                            <img className="MoonImage" src="/LastQuarter.png" alt="New Moon"/>  
                        </Col>
                    </Row>
                </Container>
                )
        } else if (this.getMoonPhase() === 7) {
            return (
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <h6 className="LeftCol">Todays Moon Phase:</h6>
                         </Col>
                        <Col xs={6} md={4}>
                            <h6 className="CenterCol">Waning Crescent Moon</h6>
                        </Col>
                        <Col xs={6} md={4}>
                            <img className="MoonImage" src="/WaningCrescent.png" alt="New Moon"/>  
                        </Col>
                    </Row>
                </Container>
            )
        }
    }

    render() {
        console.log(this.props.month())
        console.log(this.props.day())
        console.log(this.props.year())
        console.log(this.getMoonPhase())

        return (
            <div>
                {this.renderMoonPhase()}
            </div>
        )
    }
 
}



export default MoonPhase