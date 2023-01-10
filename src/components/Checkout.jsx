import { addDoc, doc, collection, getFirestore, writeBatch, getDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { CartContext } from "./context/CartContext";

const Checkout = () => {
    const {cart, clear, sumTotal} = useContext(CartContext);
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [orderId, setOrderId] = useState("");

    const generarOrden = () => {
        const fecha = new Date();
        const order = {
            buyer: {name:nombre, phone:telefono, email:email},
            items: cart.map(prod => ({id:prod.id, title:prod.nombre, quantity:prod.quantity, price:prod.precio, priceTotal:prod.quantity * prod.precio})),
            total: sumTotal(),
            order_date: `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
        };

        const db = getFirestore();
        const ordersCollection = collection(db, "orders");
        addDoc(ordersCollection, order).then((snapShot) => {
            setOrderId(snapShot.id);
            const batch = writeBatch(db);

            cart.forEach(prod => {
                let producto = doc(db, "productos", prod.id);
                getDoc(producto).then((snapShot) => {
                    batch.update(producto, {stock:snapShot.data().stock - prod.quantity});
                });
            });
            
            batch.commit();
            clear();
        });
    }

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-6">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre:</label>
                            <input type="text" className="form-control" placeholder="Ingresá tu nombre" onInput={(e) => {setNombre(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label">Teléfono:</label>
                            <input type="number" className="form-control" id="telefono" placeholder="+54 1151234567" onInput={(e) => {setTelefono(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-control" id="email" placeholder="ejemplo@ejemplo.com" onInput={(e) => {setEmail(e.target.value)}} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={generarOrden}>Comprar</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <table className="table">                                
                        <tbody>
                            {cart.map(prod => (
                                <tr key={prod.id}>
                                    <td><img src={prod.imagen} alt={prod.nombre} width={80} /></td>
                                    <td className="align-middle">{prod.nombre}</td>
                                    <td className="align-middle text-end">{prod.quantity}</td>
                                    <td className="align-middle text-end">${prod.quantity * prod.precio}</td>
                                </tr>
                                ))
                            }
                            <tr>
                                <td colSpan={2}>&nbsp;</td>
                                <td className="text-end"><b>Total a Pagar</b></td>
                                <td className="text-end"><b>${sumTotal()}</b></td>
                            </tr>
                        </tbody>
                    </table>    
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    {orderId !== "" ? <Navigate to={"/thankyou/" + orderId} /> : ""}
                </div>
            </div>
        </div>
    )
}

export default Checkout;