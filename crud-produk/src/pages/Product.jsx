import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/productApi";
import ProductForm from "../components/ProductForm";


function Product() {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const fetchProducts = () => {

        getProducts()
        .then((response) => {
            console.log(response.data);
            setProducts(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    };


    const handleEdit = (product) => {
        setSelectedProduct(product);
    };

    const handleDelete = (id) => {

        if (confirm("Yakin ingin menghapus produk?")) {

            deleteProduct(id)
                .then(() => {
                    alert("Produk berhasil dihapus");
                    fetchProducts();
                })
                .catch((error) => {
                    console.log(error);
                });

        }

    };


    useEffect(() => {

        fetchProducts();

    }, []);



    return (
        <div>

            <ProductForm 
                selectedProduct={selectedProduct}
                fetchProducts={fetchProducts}
            />


            <h1>Daftar Produk</h1>


            {
                products.slice(0,5).map((product) => (

                    <div key={product.id}>

                        <h3>{product.title}</h3>

                        <p>
                            Harga : Rp {product.price}
                        </p>


                        <button onClick={() => handleEdit(product)}>
                            Edit
                        </button>

                        <button onClick={() => handleDelete(product.id)}>
                            Hapus
                        </button>


                        <hr />

                    </div>

                ))
            }


        </div>
    );

}


export default Product;