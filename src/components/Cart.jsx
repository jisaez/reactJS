import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const {cart, cartTotal, clear, removeItem, sumTotal} = useContext(CartContext);

    if (cartTotal() === 0) {
        return (
            <div className="container">
                <div className="row my-5">
                    <div className="col-md-12 text-center">
                        <div className="alert alert-danger" role="alert">Primero agregá productos al carrito </div>
                        <Link to={"/"} className="btn btn-primary">Ok, llevame a comprar</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row my-5 d-flex justify-content-center">
                <div className="col-md-8 d-flex justify-content-center">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" colSpan={5} className="text-end"><Link onClick={clear} className="btn btn-secondary" title={"Vaciar Carrito"}>Vaciar Carrito<img src={"/images/fishbone-trash.svg"} alt={"Eliminar Producto"} width={28}  className= "m-1"></img></Link></th>
                            </tr>
                            <tr>
                                <th scope="col">&nbsp;</th>
                                <th scope="col">Producto</th>
                                <th scope="col" className="text-end">Cantidad</th>
                                <th scope="col" className="text-end">Precio</th>
                                <th scope="col">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item.id}>
                                    <td><img src={item.imagen} alt={item.nombre} width={80} /></td>
                                    <td className="align-middle">{item.nombre}</td>
                                    <td className="align-middle text-end">{item.quantity}</td>
                                    <td className="align-middle text-end">${item.quantity * item.precio}</td>
                                    <td className="align-middle text-end"><Link onClick={() => {removeItem(item.id)}} className="btn btn-secondary" title={"Eliminar Producto"}>Eliminar producto</Link></td>
                                </tr>
                                ))
                            }
                            <tr>
                                <td colSpan={2}>&nbsp;</td>
                                <td className="align-middle text-end"><b>Total a Pagar</b></td>
                                <td className="align-middle text-end"><b>${sumTotal()}</b></td>
                                <td className="align-middle text-end"><Link to={"/checkout"} className="btn btn-primary" title={"Finalizar compra"}>Continuar<img src={"/images/anzueloFDblanco.svg"} alt={"Comprar"} width={40}></img></Link></td>
                            </tr>
                        </tbody>
                    </table>    
                </div>
            </div>
        </div>
    )
}

export default Cart;