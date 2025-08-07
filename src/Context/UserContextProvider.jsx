import axios from "axios";
import {

  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

 export const userContext = createContext();
 
 export  const UserContextProvider = ({ children  }) => {
  const [users, setUsers] = useState([]);
  const[currentPage,setCurrentPage]=useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize=10;

  const apikey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwdnNpYWFib3luY3BjeWZhaGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNTYzOTgsImV4cCI6MjA2OTgzMjM5OH0.96oz-V_0CVvYaNq9TgPVV3rfmkrvNSB_6WQ2KyUAnWA";

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://cpvsiaaboyncpcyfahkm.supabase.co/rest/v1/users",
        {
          headers: {
            "Content-Type": "application/json",
             "apikey": apikey,
            "Authorization": `Bearer ${apikey}`,
          },
        }
      );
      setUsers(res.data);
    
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const startIndex =(currentPage-1) * pageSize;
  const endIndex= startIndex + pageSize ;
  const currentUsers = users.slice(startIndex,endIndex);
  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));


  return (
    <userContext.Provider value={{ isLoading , currentPage,setCurrentPage ,currentUsers,totalPages }}>
      {children }
    </userContext.Provider>
  );
};


