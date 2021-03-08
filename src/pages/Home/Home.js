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
import { addCart, alterQuantity, calculatePrice, calculateShipping, clearCart } from '../../reducers/Home'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { Button, Card, Modal, Table, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: data,
            modal: false,
            alert: false,
            order: false,
            filter: "none",
        }
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
                        <Alert className="sucess-buy" show={this.state.alert} onClose={() => this.setState({ alert: false })} variant="success" dismissible transition>
                            Compra realizada com sucesso!
                        </Alert>
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
                                                    <button className="quantity" onClick={() => {
                                                        this.props.alterQuantity(product, "subtract")
                                                        this.props.calculatePrice()
                                                        this.props.calculateShipping()
                                                    }}> - </button>
                                                    {product.quantity}
                                                    <button className="quantity" onClick={() => {
                                                        this.props.alterQuantity(product, "add")
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
                                <hr />
                                <h3>Total: R$ {(this.props.total + this.props.shipping - this.props.discount).toFixed(2)}</h3>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={() => {
                                    this.props.clearCart()
                                }}>
                                    Limpar Carrinho
                                </Button>
                                <Button variant="primary" onClick={() => {
                                    this.props.clearCart()
                                    if (this.props.cart.length > 0) {
                                        this.setState({ modal: false, alert: true })
                                        setTimeout(() => {
                                            this.setState({ alert: false });
                                        }, 2000);

                                    }
                                }}>
                                    Finalizar compra
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Fab color="primary" aria-label="add" className="floating-button" onClick={() => {
                            this.props.calculatePrice()
                            this.setState({ modal: true })
                        }}>
                            <StyledBadge badgeContent={this.props.cart.length} color="secondary">
                                <ShoppingCartIcon fontSize="large" />
                            </StyledBadge>
                        </Fab>
                        <div className="carousel-home">
                            <div className="carousel-text">
                                Frete Grátis <br />
                                *Para compras acima de R$ 250,00

                            </div>
                        </div>

                        <section className="products-container">
                            <div className="products-container-title">
                                <h2>Games</h2>
                                <div>

                                    <InputLabel id="demo-simple-select-label">Ordenar por</InputLabel>
                                    <Select
                                        defaultValue=' '
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        value={this.state.filter}
                                        onChange={(evento) => {
                                            this.setState({
                                                filter: evento.target.value,
                                                products: this.state.products.sort(function (a, b) {
                                                    if (evento.target.value == "name") {
                                                        if (a.name > b.name) {
                                                            return 1;
                                                        }
                                                        if (a.name < b.name) {
                                                            return -1;
                                                        }
                                                        // a must be equal to b
                                                        return 0;
                                                    } else if (evento.target.value == "price") {
                                                        if (a.price > b.price) {
                                                            return 1;
                                                        }
                                                        if (a.price < b.price) {
                                                            return -1;
                                                        }
                                                        // a must be equal to b
                                                        return 0;
                                                    } else if (evento.target.value == "score") {
                                                        if (a.score > b.score) {
                                                            return 1;
                                                        }
                                                        if (a.score < b.score) {
                                                            return -1;
                                                        }
                                                        // a must be equal to b
                                                        return 0;
                                                    }
                                                })
                                            })
                                        }}
                                    >
                                        <MenuItem value={"price"}>Preço</MenuItem>
                                        <MenuItem value={"score"}>Popularidade</MenuItem>
                                        <MenuItem value={"name"}>Ordem Alfabética</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <div className="products-list">
                                {this.state.products.map((product) => (
                                    <Card key={product.id} className="product-card">
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
        alterQuantity: (product, action) => dispatch(alterQuantity(product, action)),
        calculatePrice: () => dispatch(calculatePrice()),
        clearCart: () => dispatch(clearCart()),
        calculateShipping: () => dispatch(calculateShipping())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
