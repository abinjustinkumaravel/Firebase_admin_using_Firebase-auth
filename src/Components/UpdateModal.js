import React, { useEffect, useState } from 'react';
import { db, storage } from '../Services/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

// Helper function to generate a unique ID
async function generateUniqueId() {
    let uniqueId = uuidv4();
    const docRef = doc(collection(db, 'products'), uniqueId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return await generateUniqueId();
    }

    return uniqueId;
}

function AddProducts({ isOpen, onClose, product }) {
    const [productTitle, setProductTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    // Populate form if editing an existing product
    useEffect(() => {
        if (product) {
            setProductTitle(product.name || '');
            setDescription(product.description || '');
            setRating(product.rating || '');
            setPrice(product.price || '');
        }
    }, [product]); // Only run this effect when `product` changes

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imagePath = product?.imagePath;
            let imageURL = product?.imageURL;

            // Upload a new image if selected
            if (image) {
                const renameFileName = `${productTitle}_${image.name}`;
                imagePath = `products/images/${renameFileName}`;
                const imageRef = ref(storage, imagePath);

                await uploadBytes(imageRef, image);

                // Get image URL after uploading
                imageURL = await getDownloadURL(imageRef);
            }

            const productData = {
                name: productTitle,
                description: description,
                price: price,
                rating: rating,
                imagePath: imagePath,
                imageURL: imageURL, // Optional: store URL for easy display
                updatedAt: new Date(),
            };

            if (product) {
                // Update existing product
                const productDocRef = doc(db, 'products', product.id);
                await updateDoc(productDocRef, productData);
                alert("Product updated successfully!");
            } else {
                // Add new product
                const newProductId = await generateUniqueId();
                await addDoc(collection(db, 'products'), {
                    ...productData,
                    id: newProductId,
                    createdAt: new Date(),
                });
                alert("Product added successfully!");
            }

            // Reset form fields after submission
            setProductTitle('');
            setDescription('');
            setRating('');
            setPrice('');
            setImage(null);
            onClose();
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleImageChange} />
                <input
                    type="text"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    placeholder="Product Title"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                />
                <input
                    type="text"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Rating"
                />

                <button type="submit">{product ? "Update Product" : "Add Product"}</button>
            </form>
        </div>
    );
}

export default AddProducts;
