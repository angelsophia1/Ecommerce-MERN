import React,{useState} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd'
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios'
const { Title } = Typography
const { TextArea } = Input
const Continents = [
    {key:1, value: "Africa"},
    {key:2, value: "Europe"},
    {key:3, value: "Asia"},
    {key:4, value: "North America"},
    {key:5, value: "South America"},
    {key:6, value: "Australia"},
    {key:7, value: "Antarctica"}  
]
function UploadProductPage(props) {
    const [TitleValue, setTitleValue] = useState("");
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState()
    const [ContinentValue, setContinentValue] = useState(1)
    const [Images, setImages] = useState([])
    const onTitleChange = (evt) => {
        setTitleValue(evt.currentTarget.value);
    }
    const onDescriptionChange = (evt) => {
        setDescriptionValue(evt.currentTarget.value);
    }
    const onPriceChange = (evt) => {
        setPriceValue(evt.currentTarget.value);
    }
    const onContinentSelectChange = (evt) => {
        setContinentValue(evt.currentTarget.value);
    }
    const updateImages = (newImages) => {
        console.log(newImages)
        setImages(newImages)
    }
    const onSubmit = (evt) => {
        evt.preventDefault();
        if(!TitleValue || !DescriptionValue || !PriceValue || !ContinentValue || !Images) {
            return alert('Fill all the fileds first!')
        }
        const variables = { 
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            continents: ContinentValue
        }
        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if(response.data.success) {
                    alert('Product successfully uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload product')
                }
            })
    }
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
            <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                <Title level={2}>Upload Travel Product</Title>
            </div>
            <Form onSubmit={onSubmit}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages}/>

                <br />
                <br />
                <label>Title</label>
                <Input 
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Price($)</label>  
                <Input 
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />          
                <select onChange={onContinentSelectChange}>
                    {Continents.map(item => (
                    <option key={item.key} value={item.key}>
                        {item.value}
                    </option>
                    ))}
                </select>  
                <br />
                <br />   
                <Button 
                    onClick={onSubmit}
                >
                    Submit
                </Button>                  
            </Form>    
        </div>
    )
}

export default UploadProductPage
