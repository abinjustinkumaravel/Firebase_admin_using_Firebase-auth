import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, storage } from "../../Services/firebaseConfig";
import Rowdata from "../../Components/datarow";
import { ref, getDownloadURL } from 'firebase/storage';
import { collection, getDocs } from 'firebase/firestore';
import UpdateModal from '../../Components/UpdateModal';
import { db } from '../../Services/firebaseConfig'; // Make sure to import your firestore db

function Home() {
    const [user] = useAuthState(auth);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productData = await Promise.all(querySnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    const imageRef = ref(storage, data.imagePath); // Assuming imagePath is stored in the document
                    const url = await getDownloadURL(imageRef);
                    return {
                        img_url: url,
                        title: data.title,
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

    return (
        <div className='App'>
            {user ? (
                <div>
                    <nav>
                        <h2>Welcome to ButterBytes Admin</h2>
                        <button onClick={openModal}>Add Product</button>
                        <UpdateModal isOpen={isModalOpen} onClose={closeModal} />
                        <button onClick={handleLogout}>Logout</button>
                    </nav>
                    {products.map((product, index) => (
                        <div key={index}>
                            <Rowdata
                                img_url={product.img_url}
                                title={product.title}
                                description={product.description}
                                ratings={product.rating}
                                price={product.price}
                            />
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
