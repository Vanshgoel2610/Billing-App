import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext"
import uploadIcon from '../../assets/upload.png';
import toast from "react-hot-toast";
import { addItem } from "../../Service/ItemService";

const ItemForm = () => {
    const{categories, setItemsData, itemsData, setCategories} = useContext(AppContext)
    const[image, setImage] = useState(false)
    const[loading, setLoading] = useState(false)
    const[data, setData] = useState({
        name: "",
        categoryId: "",
        price: "",
        description: "",
    })
    const onChangeHandler = (e) => {
        const value = e.target.value
        const name = e.target.name
        setData((data) => ({...data, [name]: value}))
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        console.log(data)
        formData.append("item", JSON.stringify(data))
        formData.append("file", image)
        try {
            if((!image)) {
                toast.error("Select image")
                return
            }
            console.log(formData)
            const response = await addItem(formData)
            if(response.status === 201) {
                console.log(response.data)
                setItemsData([...itemsData, response.data])
                setCategories((prevCategories) => prevCategories.map((category) => category.categoryId === data.categoryId? {...category, items: category.items+1}: categories))
                toast.success("Item added successfully")
                setData({
                    name: "",
                    description: "",
                    price: "",
                    categoryId: ""
                })
                setImage(false)
            } else {
                toast.data('Unable to add item')
            }
        } catch(error) {
            console.error(error)
            toast.error("Unable to add item")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="item-form-container" style={{height:'100vh', overflowY: 'auto', overflowX: 'hidden'}}>
            <div className="mx-2 mt-2">
                <div className="row">
                    <div className="card col-md-8 form-container">
                        <div className="card-body">
                            <form onSubmit={onSubmitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-lable">
                                        <img src={image ? URL.createObjectURL(image) : uploadIcon} alt="" width={48}/>
                                    </label>
                                    <input type="file" name="image" id="image" className="form-control" hidden onChange={(e) => setImage(e.target.files[0])}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="form-control"
                                        placeholder="Item Name"
                                        onChange={onChangeHandler}
                                        value={data.name}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="category">Category</label>
                                    <select name="categoryId" id="category" className="form-control" onChange={onChangeHandler} value={data.categoryId} required>
                                        <option value="">--Select Category--</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.categoryId}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" name="price" id="price" className="form-control" placeholder="&#8377;200.00" onChange={onChangeHandler} value={data.price} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        rows="5"
                                        name="description"
                                        id="description"
                                        className="form-control"
                                        placeholder="Write content here..."
                                        onChange={onChangeHandler}
                                        value={data.description}>
                                    </textarea>
                                </div>
                                <button type="submit" className="btn btn-warning w-100" disabled={loading}>{loading? "Loading...": "Save"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemForm