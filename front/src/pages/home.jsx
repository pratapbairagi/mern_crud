import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom"
import { Spinner } from "../components/spinner";


export const List = () => {
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

    const [users, setUsers] = useState([]);

    async function fetchData() {
        // await axios.get("http://localhost:3546").then(res => {
        await axios.get("https://mern-crud-server-back.vercel.app").then(res => {

            setUsers(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    // del
    const del = async (id) =>{
        try {
            await axios.delete(`https://mern-crud-server-back.vercel.app/user/${id}`).then(res=>{
                res.status === 200 && fetchData()
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            
        }
    }

    // style
    const td = {
        padding:"2px 10px",
        color:"grey"
    }

    return (
        <>
        { users.length < 1 ? <Spinner/> :
        <div className="container-fluid" style={container}>
            <table>
                <thead style={{background:"black"}}>
                    <tr style={{color:"white"}}>
                        <td style={{padding:"2px 10px"}}>Index</td>
                        <td style={{padding:"2px 10px"}}>Name</td>
                        <td style={{padding:"2px 10px"}}>ID</td>
                        <td style={{padding:"2px 10px"}}>Email</td>
                        <td style={{padding:"2px 10px"}}>Phone</td>
                        <td style={{padding:"2px 10px"}}>Image</td>
                        <td style={{padding:"2px 10px"}}>Del</td>
                        <td style={{padding:"2px 10px"}}>Edit</td>
                        <td style={{padding:"2px 10px"}}>Add</td>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 && users.map((v, i) => {
                        return (
                            <tr key={i}>
                                <td style={td}>{i+1}</td>
                                <td style={td}>{v.name}</td>
                                <td style={td}>{v._id}</td>
                                <td style={td}>{v.email}</td>
                                <td style={td}>{v.phone}</td>
                                <td style={td}><img style={{width:"2rem", aspectRatio:"1/1"}} src={v.image} alt="" /></td>
                                <td style={td}><button onClick={()=> del(v._id)} style={{cursor:"pointer", padding:"4px 12px", background:"red", color:"white", border:"none", fontWeight:"600", borderRadius:"3px"}}>Delete</button></td>
                                <td style={td}><NavLink to={`/user/${v._id}`}><button style={{cursor:"pointer",padding:"4px 12px", background:"gold", color:"white", border:"none", fontWeight:"600" , borderRadius:"3px"}}>EDIT</button></NavLink></td>
                                <td style={td}> <NavLink to="/add"><button style={{cursor:"pointer",padding:"4px 12px", background:"green", color:"white", border:"none", fontWeight:"600" , borderRadius:"3px"}}>ADD</button></NavLink></td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </div> }
        </>
    )
}