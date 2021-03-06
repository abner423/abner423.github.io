import React from "react";
import { Container, Row, Col } from 'reactstrap';
import './Home.css'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <>
                <div className="home">
                    <div className="content">
                        <div className="carousel-home">
                            <div className="carousel-text">
                                Frete Grátis <br />
                                *Para compras acima de R$ 250,00

                            </div>
                        </div>

                        <section className="products-container">
                            <h1>Lista de Produtos</h1>
                            <div className="products-list">
                                <h1 className="product-card">CARD</h1>
                                <h1 className="product-card">CARD</h1>
                                <h1 className="product-card">CARD</h1>
                                <h1 className="product-card">CARD</h1>
                                <h1 className="product-card">CARD</h1>
                                <h1 className="product-card">CARD</h1>
                                <h1 className="product-card">CARD</h1>
                                <h1 className="product-card">CARD</h1>
                                <h1 className="product-card">CARD</h1>
                            </div>
                        </section>

                        <div className="footer">
                            <h1>Footer aqui</h1>
                        </div>

                    </div>

                </div>
            </>
        );
    }
}
export default Home;
