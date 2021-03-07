import React from "react";
import './Home.css'
import data from '../../data/products.json'
import Fab from '@material-ui/core/Fab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import linkedinIcon from '../../assets/linkedinIcon.png'
import githubIcon from '../../assets/githubIcon.png'
import instagramIcon from '../../assets/instagramIcon.png'

import { Button, Card, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: data,
            modal: false
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <>
                <div className="home">
                    <div className="content">
                        <Modal show={this.state.modal} onHide={() =>this.setState({modal:false})}>
                            <Modal.Header closeButton>
                                <Modal.Title>Carrinho</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Woohoo, you're reading this text in a modal!
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() =>this.setState({modal:false})}>
                                    Fechar
                                </Button>
                                <Button variant="primary" onClick={() => console.log("teste")}>
                                    Finalizar compra
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Fab color="primary" aria-label="add" className="floating-button" onClick={() =>this.setState({modal:true})}>
                            <ShoppingCartIcon fontSize="large" />
                        </Fab>
                        <div className="carousel-home">
                            <div className="carousel-text">
                                Frete Grátis <br />
                                *Para compras acima de R$ 250,00

                            </div>
                        </div>

                        <section className="products-container">
                            <h1>Games</h1>
                            <div className="products-list">
                                {this.state.products.map((product) => (
                                    <Card className="product-card">
                                        <Card.Img variant="top" src={`./${product.image}`} />
                                        <Card.Body>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text>
                                                Preço: R$ {product.price}<br />
                                                Score: {product.score}
                                            </Card.Text>
                                            <Button variant="primary">Adicionar no carrinho</Button>
                                        </Card.Body>
                                    </Card>
                                ))}

                            </div>
                        </section>

                        <div className="footer">
                            <div className="social-medias">
                                <a className="media-buttons" href="https://www.linkedin.com/in/abner-filipe/" target="_blank"><img src={linkedinIcon} /></a>
                                <a className="media-buttons" href="https://www.instagram.com/abnerfilipe/" target="_blank"><img src={instagramIcon} /></a>
                                <a className="media-buttons" href="https://github.com/abner423" target="_blank"><img src={githubIcon} /></a>
                            </div>
                        </div>

                    </div>

                </div>
            </>
        );
    }
}
export default Home;
