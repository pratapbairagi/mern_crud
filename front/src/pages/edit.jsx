import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";



const Edit = () => {
    const container = {
        width:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        gap:"0",
        padding:"48px 0",
        minHeight:"100vh",
        background:"whitesmoke"
    }
    const form = {
        width:"max-content",
        minWidth:"280px",
        display:"flex",
        flexWrap:"wrap",
        maxWidth:"400px",
        border:"none",
        boxShadow:"0 0 1px grey",
        padding:"6px",
        gap:"8px"

    }
    const fieldset = {
        display : "flex",
        justifyContent:"center",
        width:"100%",
        border:"none",
    }
    const label = {
        display:"block",
        hight:"36px",
        padding:"1px 8px 0 0",
        fontWeight:"600",
        color:"grey",
        borderBottom:"1px solid grey",
        width:"max-content"
    }
    const input = {
        display:"block",
        hight:"36px",
        outline:"none",
        border:"none",
        borderBottom:"1px solid grey",
        width:"100%",
        background:"transparent"
    }

    const {id} = useParams();
    const [errorMssg, setErrorMssg] = useState("")
    const [user,setUser] = useState({
        name:"",
        email:"",
        phone:"",
        image:""
    })
    useEffect(()=>{
     async function fetchFunction (){
        try {
           await axios.get(`https://mern-crud-server-back.vercel.app/user/${id}`).then(res=>{
            setUser(res.data)
          }).catch(err=>{
            // console.log(err.response)
            setErrorMssg(`${err.response.data.message} ! ${err.response.status}`)
            setTimeout(()=>{
                setErrorMssg("")
            },3000)

          })
        } catch (error) {
            console.log(error)
        }
        }
        fetchFunction()
    },[])

    const inputValue = (e) => {
        let {name, value} = e.target;
        if(name !== "image"){
            setUser({...user, [name] : value});
        }
        else{
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.addEventListener("load", ()=>{
                const blob = new Blob([reader.result]);
                const url = URL.createObjectURL(blob, {type:"image/jpeg"});
                setUser({...user, image: url});
            })
        }
    }

    const history = useNavigate()
    const submit = async (e) => {
        e.preventDefault();

        try {
             await axios.post("https://mern-crud-server-back.vercel.app/user", user).then(res=>{
                console.log(res.status)
                res.status === 200 && history("/")
             }).catch(err=>{
            console.log(err)
        })


        } catch (error) {
            
        }


    }
    return(
        <div className="container-fluid" style={container}>
            <form action="" style={form}>
            <span style={{ width: "100%", textAlign: "center", color: "black", padding: "2px", maxWidth: "400px" }}>Edit User</span>
                <fieldset style={fieldset}>
                    <label style={label} htmlFor="name">Name</label>
                    <input defaultValue={user.name} onInput={inputValue} style={input} type="text" name="name" id="name" />
                </fieldset>
                <fieldset style={fieldset}>
                    <label style={label} htmlFor="email">Email</label>
                    <input defaultValue={user.email} onInput={inputValue} style={input} type="email" name="email" id="email" />
                </fieldset>
                <fieldset style={fieldset}>
                    <label style={label} htmlFor="phone">Phone</label>
                    <input defaultValue={user.phone} onInput={inputValue} style={input} type="tel" name="phone" id="phone" />
                </fieldset>
                <fieldset style={fieldset}>
                    <label style={label} htmlFor="image">Image</label>
                    <input defaultValue={user.image} onInput={inputValue} style={input} type="file" name="image" id="image" />
                    <img src={user.image} style={{width:"1.5rem", aspectRatio:"1/1"}} alt="" />
                </fieldset>
                <button onClick={submit} style={{cursor:"pointer", width:"100%", textAlign:"center", background:"green", color:"white", padding:"2px", border:"none", padding:"4px", marginTop:"10px"}} >Submit</button>
            </form>
            {errorMssg && <div style={{width:"100%", height:"max-content", textAlign:"center", padding:"8px 0", fontSize:"22px", fontWeight:"600", background:"red", color:"white", position:"fixed", bottom:"0", left:"0"}}>{errorMssg}</div>}
        </div>
    )
}

export default Edit