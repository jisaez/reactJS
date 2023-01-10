import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import { collection, getDocs, getFirestore, query, where, orderBy } from "firebase/firestore";
import Loading from "./Loading";
// import arrayProductos from "./json/productos.json";


const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    // useEffect(() => {
    //     const db = getFirestore();
    //     const itemsCollection = collection(db, "productos");
    //     arrayProductos.forEach((prod) => {
    //         addDoc(itemsCollection, prod);
    //     });
    // }, []);

    useEffect(() => {
        const db = getFirestore();
        const itemsCollection = collection(db, "productos");
        const q = id ? query(itemsCollection, where("categoria", "==", id)) : itemsCollection;
        
        getDocs(q).then((snapShot) => {
            setItems(snapShot.docs.map((doc) => ({id:doc.id, ...doc.data()})
            ));
            setLoading(false);
        });
    }, [id]);
    
    return (
        <div className="container">
            {loading ? <Loading /> : <ItemList items={items} />}
        </div>
    )
}

export default ItemListContainer;

