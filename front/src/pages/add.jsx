import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom"


const Add = () => {
    const container = {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0",
        padding: "48px 0",
        minHeight: "100vh",
        background: "whitesmoke"
    }
    const form = {
        width: "max-content",
        minWidth: "280px",
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "400px",
        border: "none",
        boxShadow: "0 0 1px grey",
        padding: "6px"

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

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (user) {
                await axios.post("http://server-lime-ten.vercel.app/add", user).then((res) => {
                    res.status === 201 && history("/")
                })
            }
        }
        catch (err) {
            // console.log(err.response.data.message.errors.phone.message)
        }
    }
    return (
        <div className="container-fluid" style={container}>
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
                </fieldset>
                <button onClick={submit} style={{ width: "100%", textAlign: "center", background: "green", color: "white", padding: "2px", maxWidth: "400px", border: "none", padding: "4px" }} type="submit">Submit</button>
            </form>
            {/* { image &&
                <img style={{width:"100px"}} src={image} alt="" />
            } */}
        </div>
    )
}

export default Add