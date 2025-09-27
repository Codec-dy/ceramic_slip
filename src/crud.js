import axios from "axios";
import { toast } from "react-toastify";


const dataValidation = (key,data) => {
    if(key=="name"){
        if(data.length <= 3){
            toast.error("Name should be more than 3 characters")
            return false
        }
    }else if(key=="email"){
        if(!data.includes('@')){
            toast.error("Email should be valid")
            return false
        }
    }else if(key=="phone"){
        if(data.length < 10){
            toast.error("Phone number should have 10 digits")
            return false
        }
    }
    else if(key=="shipping"){
        if(data.length < 1){
            toast.error("Shipping should be selected")
            return false
        }
    }else if(key=="images"){
        if(data.length < 1){
            toast.error("Please upload images")
            return false
        }
    }else if(key=="state"){
        if(data.length < 2){
            toast.error("State should be more than 2 characters")
            return false
        }
    }else if(key=="street"){
        if(data.length < 3){
            toast.error("Street should be more than 3 characters")
            return false
        }
    }else if(key=="city"){
        if(data.length < 2){
            toast.error("City should be more than 2 characters")
            return false
        }
    }else if(key=="zipCode"){
        if(data.length !== 5){
            toast.error("Zip code should be valid")
            return false
        }
    }
    return true
}


const submit = async (url,type, data,images,setLoading) => {
    
    const formData = new FormData();
    delete data.imageDetails
    for(var key in data){
        if(!dataValidation(key,data[key])){
            return false
        }
      formData.append(key, data[key]);
    }
    if(!dataValidation("images",images)){
        return false
    }
    
    images.forEach((fileobj) => {
        
        if(fileobj.file){
        formData.append('images', fileobj.file);
        formData.append("imageDetails", JSON.stringify({ Initials: fileobj.Initials, Cost: fileobj.Cost}));
        }else{
        formData.append("previous", JSON.stringify({ Initials: fileobj.Initials, Cost: fileobj.Cost, file_url: fileobj.file_url }));
        }
    })
    
    try {
        setLoading(true)
        let response;
        if(type=="put"){
        response = await axios.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        }else{
            response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        }
        toast.success("Submitted successfully!");
        return response.data; // Return the response data to the caller
    } catch (error) {
        console.error('Error:', error);
        toast.error("Failed to submit. Try again!");
        return false; // Return false to indicate failure
    }
};

const adminLogin = async (url, data) => {
    
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the response data to the caller
    } catch (error) {
        console.error('Error:', error);
        return false; // Return false to indicate failure
    }
};

const fetchData = async (url,set,status) => {
    const data = await axios.get(url).then((res) => {
        const data = res.data
        if(status=="single"){
            return data
        }else if(status=="all"){
            return data
        }
        
        const pending = data.filter((item) => item.status === "pending").reverse();
        const completed = data.filter((item) => item.status === "completed").reverse();
        const contacted = data.filter((item) => item.status === "contacted").reverse();
        if(status=="contacted") return contacted
        else if(status=="completed") return completed
        else return pending
    }).catch((err) => {
        console.log(err)
    })
    if(data!=undefined){
        set(data)
    }else{
        toast.error("Failed to find data. Try again with a valid reference number!");
    }
    return data
}

const Edit = async (url, info) => {
    const data = await axios.put(url, info).then((res) => {
        toast.success("Submitted successfully!");
        return res.data
    }).catch((err) => {
        console.log(err)
        toast.error("Failed to submit. Try again!");

    })
    return data
}

const changeUser=async(url,info)=>{
    const data = await axios.put(url, info).then((res) => {
        toast.success("Changed successfully!");
        return res.data
    }).catch((err) => {
        console.log(err)
        toast.error("Failed to submit. Try again!");

    })
    return data
}

const handleDelete = async (url) => {
    try {
        const response = await axios.delete(url);
        toast.success("Deleted successfully!");
        return response.data; // Return the response data to the caller
    } catch (error) {
        console.error('Error:', error);
        return false; // Return false to indicate failure
    }
}

const handleCompleted = async (url) => {
    try {
        const response = await axios.put(url);
        toast.success("Successfully completed!");
        return response.data; // Return the response data to the caller
    } catch (error) {
        console.error('Error:', error);
        return false; // Return false to indicate failure
    }
}
const handleContacted = async (url) => {
    try {
        const response = await axios.put(url);
        toast.success("Contacted successfully!");
        return response.data; // Return the response data to the caller
    } catch (error) {
        console.error('Error:', error);
        return false; // Return false to indicate failure
    }
}

const sendEmail = async (url, data,attachments) => {
    try {
        data.attachments = attachments
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            toast.success("Email sent successfully!");
            return res.data
        }).catch((err) => {
            console.log(err)
            toast.error("Failed to send email. Try again!");

        })
        return response; // Return the response data to the caller
    } catch (error) {
        console.error('Error:', error);
        return false; // Return false to indicate failure
    }
};

const sortSlips = (slips,setSlips,from,sortType)=>{
        // If neither from nor sortType provided, do nothing
        if((from === undefined || from === null || from === '') && (sortType === undefined || sortType === null || sortType === '')){
                return
        }

        // Provide sensible defaults when only one parameter is provided
        const order = (from && from !== '') ? from : 'lh' // default to low->high
        const field = (sortType && sortType !== '') ? sortType : 'date' // default to date

        let slipsCopy = slips.slice();
        switch (order) {
            case 'lh':
                if(field=='name'){
                    slipsCopy.sort((item1,item2)=>item1.name.localeCompare(item2.name))
                    setSlips(slipsCopy)
                }
                else if(field=='date'){
                    slipsCopy.sort((item1,item2)=>new Date(item1.date)-new Date(item2.date))
                    setSlips(slipsCopy)
                }else if(field=='price'){
                    slipsCopy.sort((item1,item2)=>item1.totalCost-item2.totalCost)
                    setSlips(slipsCopy)
                }
                break;
            case 'hl':
                if(field=='name'){
                    slipsCopy.sort((item1,item2)=>item2.name.localeCompare(item1.name))
                    setSlips(slipsCopy)

                }
                else if(field=='date'){
                    slipsCopy.sort((item1,item2)=>new Date(item2.date)-new Date(item1.date))
                    setSlips(slipsCopy)

                }else if(field=='price'){
                    slipsCopy.sort((item1,item2)=>item2.totalCost-item1.totalCost)
                    setSlips(slipsCopy)

                }      
                break;
            default:
                break;
        }
    }



export {submit,adminLogin,fetchData,handleDelete,Edit,changeUser,sendEmail,sortSlips,handleCompleted,handleContacted}