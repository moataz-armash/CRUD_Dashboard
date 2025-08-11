import axios from "axios";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 10;

  // get filter type from url in home page for customer & admin
  const [searchParams]= useSearchParams();
  const filterType = searchParams.get('filter')

  const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwdnNpYWFib3luY3BjeWZhaGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNTYzOTgsImV4cCI6MjA2OTgzMjM5OH0.96oz-V_0CVvYaNq9TgPVV3rfmkrvNSB_6WQ2KyUAnWA";

  const headers = {
    "Content-Type": "application/json",
    "apikey": apikey,
    "Authorization": `Bearer ${apikey}`,
    "Prefer": "return=representation"
  };

  // جلب المستخدمين مع دعم localStorage
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // التحقق من وجود بيانات في localStorage
      const cachedUsers = localStorage.getItem('cachedUsers');
      const lastFetchTime = localStorage.getItem('lastFetchTime');
      
      // إذا كانت البيانات موجودة ولم تنته صلاحيتها (مثال: 5 دقائق)
      if (cachedUsers && lastFetchTime && (Date.now() - parseInt(lastFetchTime)) < 300000) {
        setUsers(JSON.parse(cachedUsers));
        setIsLoading(false);
        return;
      }
      
      // جلب البيانات من الخادم
      const res = await axios.get(
        "https://cpvsiaaboyncpcyfahkm.supabase.co/rest/v1/users",
        { headers }
      );
      
      const formattedUsers = res.data.map(user => ({ ...user, id: user.user_id || user.id }));
      setUsers(formattedUsers);
      
      // حفظ البيانات في localStorage
      localStorage.setItem('cachedUsers', JSON.stringify(formattedUsers));
      localStorage.setItem('lastFetchTime', Date.now().toString());
      
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      setError("Failed to fetch users");
      
      // محاولة استخدام البيانات المخزنة محليًا في حالة فشل الاتصال
      const cachedUsers = localStorage.getItem('cachedUsers');
      if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers));
        setError("Using cached data - connection issue");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);


   
  // filtering users
  const filteredUsers = useMemo(() => {
    if (!filterType) return users;
    const ft = filterType.toLowerCase();
    if (ft === "customer") {
      return users.filter(u => u.role?.toLowerCase().includes("customer"));
    }
    if (ft === "admin") {
      return users.filter(u => u.role?.toLowerCase().includes("admin"));
    }
    return users;
  }, [filterType, users]);

  // 2) compute total pages according to filteredUsers
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  }, [filteredUsers.length, pageSize]);

  //  reset current page when filter or users change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, users.length]);

  // ensure currentPage never exceeds totalPages 
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  //  slice (pagination) على filteredUsers
  const startIndex = (currentPage - 1) * pageSize;
  const currentUsers = useMemo(() => {
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  }, [filteredUsers, startIndex, pageSize]);

// compute number of customers and admins
const customersCount = useMemo(() => {
  return users.filter((user) => user.role?.toLowerCase().includes("customer")).length;
}, [users]);

const adminsCount = useMemo(() => {
  return users.filter((user) => user.role?.toLowerCase().includes("admin")).length;
}, [users]);




  // إضافة مستخدم جديد مع تحديث localStorage
  const addUser = async (userData) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://cpvsiaaboyncpcyfahkm.supabase.co/rest/v1/users",
        userData,
        { headers }
      );
      
      const newUser = res.data[0];
      setUsers(prev => {
        const updatedUsers = [...prev, newUser];
        localStorage.setItem('cachedUsers', JSON.stringify(updatedUsers));
        localStorage.setItem('lastFetchTime', Date.now().toString());
        return updatedUsers;
      });
      
      return { success: true };
    } catch (err) {
      console.error("Error adding user:", err.response?.data || err.message);
      return { success: false, error: err.response?.data?.message || "Failed to add user" };
    } finally {
      setIsLoading(false);
    }
  };

  // تحديث مستخدم مع تحديث localStorage
  const updateUser = async (userData) => {
    try {
      setIsLoading(true);
      const userIdToUse = userData.id || userData.user_id;
      if (!userIdToUse) {
        throw new Error("User ID is missing for update operation.");
      }
      
      const dataToSend = { ...userData };
      if (userData.user_id) {
        dataToSend.user_id = userData.user_id;
        delete dataToSend.id;
      } else if (userData.id) {
        dataToSend.user_id = userData.id;
        delete dataToSend.id;
      }

      const res = await axios.patch(
        `https://cpvsiaaboyncpcyfahkm.supabase.co/rest/v1/users?user_id=eq.${userIdToUse}`,
        dataToSend,
        { headers }
      );
      
      setUsers(prev => {
        const updatedUsers = prev.map(user => 
          (user.id || user.user_id) === userIdToUse ? { ...user, ...userData, id: userIdToUse } : user
        );
        localStorage.setItem('cachedUsers', JSON.stringify(updatedUsers));
        localStorage.setItem('lastFetchTime', Date.now().toString());
        return updatedUsers;
      });
      
      return { success: true };
    } catch (err) {
      console.error("Error updating user:", err.response?.data || err.message);
      return { success: false, error: err.response?.data?.message || "Failed to update user" };
    } finally {
      setIsLoading(false);
    }
  };

  // حذف مستخدم مع تحديث localStorage
  const deleteUser = async (userId) => {
    try {
      setIsLoading(true);
      const userIdToUse = userId.id || userId.user_id || userId;
      if (!userIdToUse) {
        throw new Error("User ID is missing for delete operation.");
      }
      
      await axios.delete(
        `https://cpvsiaaboyncpcyfahkm.supabase.co/rest/v1/users?user_id=eq.${userIdToUse}`,
        { headers }
      );
      
      setUsers(prev => {
        const updatedUsers = prev.filter(user => (user.id || user.user_id) !== userIdToUse);
        localStorage.setItem('cachedUsers', JSON.stringify(updatedUsers));
        localStorage.setItem('lastFetchTime', Date.now().toString());
        return updatedUsers;
      });
        // تحديث القائمة من السيرفر مباشرة لتجنب أي بيانات قديمة
    await fetchUsers();
      
      return { success: true };
    } catch (err) {
      console.error("Error deleting user:", err.response?.data || err.message);
      return { success: false, error: err.response?.data?.message || "Failed to delete user" };
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <userContext.Provider 
      value={{ 
        isLoading,
        error,
        currentPage,
        setCurrentPage,
        currentUsers,
        totalPages,
        users,
        addUser,
        updateUser,
        deleteUser,
        fetchUsers,
        filteredUsers,
        customersCount,
        adminsCount
      }}
    >
      {children}
    </userContext.Provider>
  );
};