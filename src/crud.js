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
    }else if(key=="address"){
        if(data.length < 10){
            toast.error("Address should be more than 10 characters")
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
    }
    return true
}


const submit = async (url, data,images,setLoading) => {
    const formData = new FormData();
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
        formData.append('images', fileobj.file);
        formData.append("imageDetails", JSON.stringify({ Initials: fileobj.Initials, Cost: fileobj.Cost }));
    })
    
    try {
        setLoading(true)
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        toast.success("Submitted successfully!");
        return response.data; // Return the response data to the caller
    } catch (error) {
        console.error('Error:', error);
        toast.error("Failed to submit. Try again!");
        return false; // Return false to indicate failure
    }
};

const adminLogin = async (url, data) => {
    console.log(data)
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
        }
        const pending = data.filter((item) => item.status === "pending");
        const completed = data.filter((item) => item.status === "completed");
        return status=="pending"?pending:completed
    }).catch((err) => {
        console.log(err)
    })
    set(data)
    return data
}

const Edit = async (url, info) => {
    const data = await axios.put(url, info).then((res) => {
        toast.success("Submitted successfully!");
        console.log(res.data)
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
        console.log(response)
        return response; // Return the response data to the caller
    } catch (error) {
        console.error('Error:', error);
        return false; // Return false to indicate failure
    }
};

const sortSlips = (slips,setSlips,from,sortType)=>{
    let slipsCopy = slips.slice();
    switch (from) {
      case 'lh':
        if(sortType=='name'){
          slipsCopy.sort((item1,item2)=>item1.name.localeCompare(item2.name))
          setSlips(slipsCopy)
        }
        else if(sortType=='date'){
          slipsCopy.sort((item1,item2)=>new Date(item1.date)-new Date(item2.date))
          setSlips(slipsCopy)
        }else if(sortType=='price'){
          slipsCopy.sort((item1,item2)=>item1.totalCost-item2.totalCost)
          setSlips(slipsCopy)
        }
        break;
      case 'hl':
        if(sortType=='name'){
          slipsCopy.sort((item1,item2)=>item2.name.localeCompare(item1.name))
          setSlips(slipsCopy)

        }
        else if(sortType=='date'){
          slipsCopy.sort((item1,item2)=>new Date(item2.date)-new Date(item1.date))
          setSlips(slipsCopy)

        }else if(sortType=='price'){
          slipsCopy.sort((item1,item2)=>item2.totalCost-item1.totalCost)
          setSlips(slipsCopy)

        }      
        break;

      default:
        break;
    }
  }



export {submit,adminLogin,fetchData,handleDelete,Edit,changeUser,sendEmail,sortSlips,handleCompleted}