import React,{useRef, useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';
import axios from 'axios';
import {useAuth} from '../contexts/AuthContext';

const Chats = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [loading,setLoading] = useState(true);
    const handleLogout= async () => {
        await auth.signOut();
        history.push('/');
    }
    const getFile = async (url)=> {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data],"userphoto.jpg",{type:'image/jpeg'})
    }
    useEffect(()=>{
        if(!user){
            history.push('/');

            return;
        }
        axios.get('https://api.chatengine.io/users/me/',{
            headers:{
                "project-id": "94bc2e39-14e1-4c39-9723-5de2c3e1c3ce",
                "user-name" : user.email,
                "user-secret": user.uid
            }
        })
        .then(()=> {
            setLoading(false);
        })
        .catch(() => {
            let formdata=new FormData();
            formdata.append('email',user.email);
            formdata.append('username',user.displayName);
            formdata.append('secret',user.uid);

            getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar',avatar,avatar.name);
                axios.post('https://api.chatengine.io/users/',
                 formdata,
                 {headers:{"private-key":'ee37e685-8708-4615-ad0e-4c68dd58b8bb'}}
                )
                .then(()=>setLoading(false))
                .catch((error)=>console.log(error))
            })

        })
    }, [user,history]);
    if(!user|| loading) return 'Loading...'
    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Ryver Chat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine 
            height="calc(100vh-66px)"
            projectID="
            94bc2e39-14e1-4c39-9723-5de2c3e1c3ce"
            userName={user.email}
            userSecret={user.uid}
            
            />
        </div>
    );
}
export default Chats;