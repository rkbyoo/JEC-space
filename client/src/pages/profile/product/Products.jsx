import { Button } from 'antd'
import React, { useState } from 'react'
import ProductForm from './ProductForm';

function Products() {
    const [showProductForm, setShowProductForm] = useState(false);
    return (
        <div className='text-black'>
            {/* on click the button will open a modal form where i can add my products */}
            <Button type='default' onClick={() => { setShowProductForm(true) }}>
                Add Product
            </Button>
                {
                    showProductForm &&
                    <ProductForm showProductForm={showProductForm} setShowProductForm={setShowProductForm} />
                }
        </div>
    )
}

export default Products
