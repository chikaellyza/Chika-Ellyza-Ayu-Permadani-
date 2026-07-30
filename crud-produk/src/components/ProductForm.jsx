import { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../services/productApi";

function ProductForm({ selectedProduct, fetchProducts }) {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if (selectedProduct) {
            setTitle(selectedProduct.title);
            setPrice(selectedProduct.price);
        } else {
            setTitle("");
            setPrice("");
        }
    }, [selectedProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            title: title,
            price: price
        };

        if (selectedProduct) {

            updateProduct(selectedProduct.id, data)
                .then(() => {
                    alert("Produk berhasil diupdate");

                    setTitle("");
                    setPrice("");

                    fetchProducts();
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {

            addProduct(data)
                .then(() => {
                    alert("Produk berhasil ditambahkan");

                    setTitle("");
                    setPrice("");

                    fetchProducts();
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    };

    return (
        <div>

            <h2>{selectedProduct ? "Edit Produk" : "Tambah Produk"}</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Nama Produk"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br />

                <input
                    type="number"
                    placeholder="Harga"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <br />

                <button type="submit">
                    {selectedProduct ? "Update" : "Simpan"}
                </button>

            </form>

        </div>
    );
}

export default ProductForm;