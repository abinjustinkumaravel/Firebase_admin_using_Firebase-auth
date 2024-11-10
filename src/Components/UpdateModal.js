import React, { useState } from 'react';
import { db, storage } from '../Services/firebaseConfig';
import { ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

async function generateUniqueId() {
    let uniqueId = uuidv4();
    const docRef = doc(collection(db, 'products'), uniqueId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return await generateUniqueId();
    }

    return uniqueId;
}

function AddProducts({ isOpen, onClose }) {
    const [productTitle, setProductTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newProductId = await generateUniqueId();
            const renameFileName = `${productTitle}_${e.name}`;
            const newImagePath = `products/images/${renameFileName}`;
            
            const imageRef = ref(storage, newImagePath);
            await uploadBytes(imageRef, image);

            await addDoc(collection(db, "products"), {
                name: productTitle,
                id: newProductId,
                description: description,
                imagePath: newImagePath,
                price: price,
                rating: rating,
                createdAt: new Date(),
            });
            alert("Product added successfully!");
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
                    vaNaturelue={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                />
                <input
                    type="text"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Rating"
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddProducts;
