import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, storage } from "../../Services/firebaseConfig";
import Rowdata from "../../Components/datarow";
import { ref, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import UpdateModal from '../../Components/UpdateModal';
import { db } from '../../Services/firebaseConfig'; // Make sure to import your firestore db

function Home() {
    const [user] = useAuthState(auth);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectProduct, setSelectProduct] = useState(null);

    const openModal = (product) => {setIsModalOpen(true) 
        setSelectProduct(product);
    };
    const closeModal = () =>{setIsModalOpen(false)
        setSelectProduct(null);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productData = await Promise.all(querySnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    const imageRef = ref(storage, data.imagePath); // Assuming imagePath is stored in the document
                    const url = await getDownloadURL(imageRef);
                    return {
                        id:doc.id,
                        img_url: url,
                        title: data.name,
                        description: data.description,
                        rating: data.rating,
                        price: data.price,
                    };
                }));
                setProducts(productData);
                console.log("Products fetched:", productData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                console.log("User signed out");
            }).catch(error => {
                console.error("Error signing out", error);
            });
    };
const handleDelete = async (productId) => {
    try {
        const deleteRef = doc(db, 'products', productId); // Use the productId for the document reference
        console.log('Deleting product with ID:', productId);
        await deleteDoc(deleteRef);  // Delete the document
        setProducts(products.filter((item) => item.id !== productId));  // Update state to remove the deleted product
        alert('Product deleted successfully');
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};


    return (
        <div className='App'>
            {user ? (
                <div>
                    <nav>
                        <h2>Welcome to ButterBytes Admin</h2>
                        <button onClick={() => openModal(null)}>Add Product</button>
                        <UpdateModal isOpen={isModalOpen} onClose={closeModal} product={selectProduct} />
                        <button onClick={handleLogout}>Logout</button>
                    </nav>
                    {products.map((product) => (
                        <div key={product.id}>
                            <Rowdata
                                img_url={product.img_url}
                                title={product.title}
                                description={product.description}
                                ratings={product.rating}
                                price={product.price}
                            />
                            <button onClick={()=> openModal(product)}>Edit</button>
                            <button onClick={() => handleDelete(product.id)}>Delete</button>


                        </div>
                    ))}
                </div>
            ) : (
                <h2>You are not logged in.</h2>
            )}
        </div>
    );
}

export default Home;
