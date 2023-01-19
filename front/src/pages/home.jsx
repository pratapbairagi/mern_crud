import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom"
import { Spinner } from "../components/spinner";


export const List = () => {
    const [users, setUsers] = useState([]);

    async function fetchData() {
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
        <div className="container-fluid">
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
                                <td style={td}><img style={{width:"100%", height:"auto"}} src={v.image} alt="" /></td>
                                <td style={td}><button onClick={()=> del(v._id)} style={{padding:"4px 12px", background:"red", color:"white", border:"none", fontWeight:"600", borderRadius:"3px"}}>Delete</button></td>
                                <td style={td}><NavLink to={`/edit/${v._id}`}><button style={{padding:"4px 12px", background:"gold", color:"white", border:"none", fontWeight:"600" , borderRadius:"3px"}}>EDIT</button></NavLink></td>
                                <td style={td}> <NavLink to="/add"><button style={{padding:"4px 12px", background:"green", color:"white", border:"none", fontWeight:"600" , borderRadius:"3px"}}>ADD</button></NavLink></td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </div> }
        </>
    )
}