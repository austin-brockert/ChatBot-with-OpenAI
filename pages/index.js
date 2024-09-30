import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';


const Home = ({ initialChatContent }) => {
    
    const [description, setDescription] = useState('');
    const [chatContent, setChatContent] = useState(initialChatContent);

    const onSend = async () => {

        if(description === '') {
            alert("Please put the text you want!");
            return;
        }

        const response = await axios.post('api/openai', {text : description});
        setChatContent(response.data);
    }

    const onClear = () => {
        setDescription('');
        setChatContent('');
    }

    return (
        <div className="">
            <Head>
                <title>OpenAI Implement</title>
            </Head>
            <div className='h-fit flex justify-center pt-24'>
                <div className='w-1/2 flex justify-center h-[650px]'>
                    <textarea 
                        className='w-3/5 outline-none border-[1px] rounded-xl border-slate-950 p-6'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <div className='w-1/2 flex justify-center h-[650px]'>
                    <textarea 
                        className='w-3/5 outline-none border-[1px] rounded-xl border-slate-950 p-6 select-none'
                        disabled
                        value={chatContent}
                    />  
                </div>
            </div>
            <div className='flex items-center justify-center mt-16'>
                <button
                    type="button"
                    className="w-56 rounded-full bg-[#0249AC] text-white text-lg pl-20 pr-20 pt-2 pb-2 mr-2"
                    onClick={onSend}
                >
                    Send
                </button>
                <button
                    type="button"
                    className="w-56 rounded-full bg-[#ED4627] text-white text-lg pl-20 pr-20 pt-2 pb-2 ml-2"
                    onClick={onClear}                               
                >
                    Clear                         
                </button>
            </div>
        </div>
    )
}

export async function getServerSideProps() {

    const initialChatContent = '';

    return {
        props: {
            initialChatContent
        }
    }
}

export default Home;