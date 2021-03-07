import React from "react";
import './Home.css'
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import data from '../../data/products.json'
import Fab from '@material-ui/core/Fab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import linkedinIcon from '../../assets/linkedinIcon.png'
import githubIcon from '../../assets/githubIcon.png'
import instagramIcon from '../../assets/instagramIcon.png'
import { connect } from "react-redux";
import { addCart,alterQuantity, calculatePrice, calculateShipping, clearCart } from '../../reducers/Home'

import { Button, Card, Modal, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: data,
            modal: false
        }
        console.log("props aq", this.props)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const StyledBadge = withStyles((theme) => ({
            badge: {
              right: -3,
              top: 13,
              border: `2px solid ${theme.palette.background.paper}`,
              padding: '0 4px',
            },
          }))(Badge);
        return (
            <>
                <div className="home">
                    <div className="content">
                        <Modal show={this.state.modal} onHide={() => this.setState({ modal: false })} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title>Carrinho</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Produto</th>
                                            <th>Quantidade</th>
                                            <th>Preço</th>
                                        </tr>
                                    </thead>
                                    {this.props.cart.map((product) => (
                                        <tbody>
                                            <tr>
                                                <td>{product.name}</td>
                                                <td>
                                                    <button onClick={() => {
                                                        this.props.alterQuantity(product,"subtract")
                                                        this.props.calculatePrice()
                                                        this.props.calculateShipping()
                                                        }}> - </button> 
                                                    {product.quantity} 
                                                    <button onClick={() => {
                                                        this.props.alterQuantity(product,"add")
                                                        this.props.calculatePrice()
                                                        this.props.calculateShipping()
                                                        }}> + </button></td>
                                                <td>{product.price}</td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </Table>
                                <p>valor dos produtos: R$ {this.props.total.toFixed(2)}</p>
                                <p>frete: R$ {this.props.shipping.toFixed(2)}</p>
                                <p>desconto: R$ {this.props.discount.toFixed(2)}</p>
                                <hr/>
                                <h3>Total: R$ {(this.props.total + this.props.shipping - this.props.discount).toFixed(2)}</h3>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={() => {
                                    this.props.clearCart()
                                }}>
                                    Limpar Carrinho
                                </Button>
                                <Button variant="primary" onClick={() => console.log("compra finalizada")}>
                                    Finalizar compra
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Fab color="primary" aria-label="add" className="floating-button" onClick={() => {
                            this.props.calculatePrice()
                            this.setState({ modal: true })
                        }}>
                            <StyledBadge badgeContent={this.props.cart.length} color="secondary">
                                <ShoppingCartIcon fontSize="large"/>
                            </StyledBadge>
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
                                            <Button variant="primary" onClick={() => {
                                                this.props.addCart(product)
                                                this.props.calculateShipping()
                                                console.log("teste", this.props)
                                            }}>Adicionar no carrinho</Button>
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
} const mapStateToProps = state => ({
    ...state.Home
});

function mapDispatchToProps(dispatch) {
    return {
        addCart: value => dispatch(addCart(value)),
        alterQuantity: (product,action) => dispatch(alterQuantity(product,action)),
        calculatePrice: () => dispatch(calculatePrice()),
        clearCart: () => dispatch(clearCart()),
        calculateShipping: () => dispatch(calculateShipping())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
