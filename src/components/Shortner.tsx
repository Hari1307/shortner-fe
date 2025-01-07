import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Shortner = () => {
    // const [shortUrlInfo, setShortUrlInfo] = useState<any>([]);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [loading, setLoading] = useState(true);
    const fullUrlRef = useRef<HTMLInputElement>(null);
    const customAliasRef = useRef<HTMLInputElement>(null);
    const topicRef = useRef<HTMLInputElement>(null);


const navigate = useNavigate();
  const [cookies,setCookie, removeCookie] = useCookies(['userSession']);
  const [shortUrls, setShortUrls] = useState([]);

  useEffect(() => {
    const fetchShortUrls = async () => {
      if (cookies.userSession) {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/shorten`, {
            headers: { 
              Authorization: `Bearer ${cookies.userSession.token}` 
            } 
          }); 
          setShortUrls(response.data);
        } catch (error:any) {
            if (error.response && error.response.status === 401) {
                
                removeCookie('userSession'); // Remove cookie if unauthorized
                console.log(setCookie)
            navigate('/login'); 
          } else {
            console.error('Error fetching short URLs:', error);
          }
        }
      } else {
        navigate('/'); 
      }
    };

    fetchShortUrls();
  }, [cookies, navigate]);
    
    // const getShortInfos = async () => {
    //     try {
    //         const response = await axios.get(`${BACKEND_URL}/api/shortUrls`, { withCredentials: true });
    //         setShortUrlInfo(response.data);
    //     } catch (error) {
    //         console.error("Error fetching short URLs:", error);
    //     }
    // };

    const createShortner = async () => {
        try {
            const fullUrl = fullUrlRef.current?.value;
            const customAlias = customAliasRef.current?.value;
            const topic = topicRef.current?.value;

            await axios.post(`${BACKEND_URL}/api/shorten`, {
                fullUrl,
                customAlias,
                topic
            }, { withCredentials: true });

            // getShortInfos();
        } catch (e) {
            console.error("Failed to create short URL:", e);
        }
    };

    return (
        <div className="flex w-screen h-screen justify-around items-center bg-slate-300">
            <div className="flex flex-col justify-center items-center p-10 bg-slate-400 rounded-lg">
                <Input ref={fullUrlRef} type="text" placeholder="FullUrl" />
                <Input ref={customAliasRef} type="text" placeholder="Custom Alias" />
                <Input ref={topicRef} type="text" placeholder="Topic" />

                <button className="p-7 m-3 rounded-md w-96 bg-slate-200" onClick={createShortner}>Create ShortURL</button>
            </div>
            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full bg-white border border-gray-200 shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="text-left px-6 py-3 text-gray-600 font-medium">Short URL</th>
                            <th className="text-left px-6 py-3 text-gray-600 font-medium">Created At</th>
                            <th className="text-left px-6 py-3 text-gray-600 font-medium">Clicks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shortUrls.map((info: any, index: number) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="px-6 py-3 text-blue-600 break-all">
                                    <a href={info.shortUrl} target="_blank" rel="noopener noreferrer">
                                        {info.shortUrl}
                                    </a>
                                </td>
                                <td className="px-6 py-3">{new Date(info.createdAt).toLocaleString()}</td>
                                <td className="px-6 py-3">{info.clicks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Shortner;
