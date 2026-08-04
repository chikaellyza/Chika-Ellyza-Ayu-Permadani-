import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/productApi";
import ProductForm from "../components/ProductForm";


function Product() {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;


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

    const handleReset = () => {
        setSearch("");
        setFilter("all");
        setSort("");
        setCurrentPage(1);
    };


    useEffect(() => {

        fetchProducts();

    }, []);

    useEffect(() => {

        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);

    }, [search]);

    let filteredProducts = [...products];

    // SEARCH
    filteredProducts = filteredProducts.filter((product) =>
        product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );

    // FILTER
    if (filter === "cheap") {
        filteredProducts = filteredProducts.filter(
            (product) => Number(product.price) < 50000
        );
    }

    if (filter === "expensive") {
        filteredProducts = filteredProducts.filter(
            (product) => Number(product.price) >= 50000
        );
    }

    // SORT
    if (sort === "asc") {
        filteredProducts.sort(
            (a, b) => Number(a.price) - Number(b.price)
        );
    }

    if (sort === "desc") {
        filteredProducts.sort(
            (a, b) => Number(b.price) - Number(a.price)
        );
    }

    // PAGINATION
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div>

            <ProductForm 
                selectedProduct={selectedProduct}
                fetchProducts={fetchProducts}
            />


        <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
            }}
        />

        <br /><br />

        <select
            value={filter}
            onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
            }}
        >
            <option value="all">Semua</option>
            <option value="cheap">Harga kurang dari 50000</option>
            <option value="expensive">Harga lebih dari 50000</option>
        </select>

        <br /><br />

        <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
        >
            <option value="">Default</option>
            <option value="asc">Harga Termurah</option>
            <option value="desc">Harga Termahal</option>
        </select>

        <br /><br />

        <button onClick={handleReset}>
            Reset Filter
        </button>

        <br /><br />

            <h1>Daftar Produk</h1>


            {
                currentProducts.map((product) => (

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

            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Prev
            </button>

            <span style={{ margin: "0 10px" }}>
                {currentPage} / {totalPages || 1}
            </span>

            <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );

}


export default Product;