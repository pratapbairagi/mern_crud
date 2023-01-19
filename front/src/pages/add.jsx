import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom"


const Add = () => {
    const container = {
        width: "max-content",
        minWidth:"100%",
        position:"relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0",
        padding: "48px 6px",
        minHeight: "100vh",
        background: "whitesmoke"
    }
    const form = {
        width: "max-content",
        minWidth: "240px",
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "400px",
        border: "none",
        boxShadow: "0 0 1px grey",
        padding: "6px",
        gap:"8px",

    }
    const fieldset = {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        border: "none",
    }
    const label = {
        display: "block",
        hight: "36px",
        padding: "1px 8px 0 0",
        fontWeight: "600",
        color: "grey",
        borderBottom: "1px solid grey",
        width: "max-content"
    }
    const input = {
        display: "block",
        hight: "36px",
        outline: "none",
        border: "none",
        borderBottom: "1px solid grey",
        width: "100%",
        background: "transparent"
    }

    let [user, setUser] = useState({
        name: "",
        phone: "",
        email: "",
        image: ""
    })


    // form onInput
    const formValues = (e) => {
        let { name, value } = e.target;
        if (name !== "image") {
            setUser({ ...user, [name]: value })

        }
        else {

            const file = e.target.files[0];
            const reader = new FileReader();

            reader.readAsArrayBuffer(file);

            reader.addEventListener("load", () => {
                const blob = new Blob([reader.result])
                const url = URL.createObjectURL(blob, { type: "image/jpeg" });
                setUser({...user, image:url})
            })
        }
    }

    const history = useNavigate();
    const [errorMssg, setErrorMssg] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (user) {
                await axios.post("https://mern-crud-server-back.vercel.app/add", user).then((res) => {
                    res.status === 201 && history("/")
                })
            }
        }
        catch (err) {
            setErrorMssg(`${err.response.data.message} ! ${err.response.status}`)
            setTimeout(()=>{
                setErrorMssg("")
            },3000)
        }
    }
    return (
        <div className="container-fluid " style={container}>
            <form action="" style={form}>
                <span style={{ width: "100%", textAlign: "center", color: "black", padding: "2px", maxWidth: "400px" }}>Add User</span>

                <fieldset style={fieldset} >
                    <label style={label} htmlFor="name">Name</label>
                    <input onInput={formValues} style={input} type="text" name="name" id="name" />
                </fieldset>
                <fieldset style={fieldset}>
                    <label style={label} htmlFor="name">Email</label>
                    <input onInput={formValues} style={input} type="email" name="email" id="name" />
                </fieldset>
                <fieldset style={fieldset}>
                    <label style={label} htmlFor="name">Phone</label>
                    <input onInput={formValues} style={input} type="tel" name="phone" id="name" />
                </fieldset>
                <fieldset style={fieldset}>
                    <label style={label} htmlFor="name">Image</label>
                    <input onInput={formValues} style={input} type="file" accept="*/image" name="image" id="name" />
                    <img src={user.image} style={{width:"1.5rem", aspectRatio:"1/1"}} alt="" />
                </fieldset>
                <button onClick={submit} style={{cursor:"pointer", width: "100%", textAlign: "center", background: "green", color: "white", padding: "2px", maxWidth: "400px", border: "none", padding: "4px", marginTop:"10px" }} type="submit">Submit</button>
            </form>
            {errorMssg && <div style={{width:"max-content", minWidth:"100%", maxWidth:"100%", height:"max-content", textAlign:"center", padding:"8px 0", fontSize:"22px", fontWeight:"600", background:"red", color:"white", position:"fixed", bottom:"0", left:"0"}}>{errorMssg}</div>}
        </div>
    )
}

export default Add