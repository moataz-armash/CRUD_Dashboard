import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 10;

  const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwdnNpYWFib3luY3BjeWZhaGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNTYzOTgsImV4cCI6MjA2OTgzMjM5OH0.96oz-V_0CVvYaNq9TgPVV3rfmkrvNSB_6WQ2KyUAnWA";

  const headers = {
    "Content-Type": "application/json",
    "apikey": apikey,
    "Authorization": `Bearer ${apikey}`,
    "Prefer": "return=representation" // للحصول على البيانات المحدثة بعد العمليات
  };

  // جلب المستخدمين
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(
        "https://cpvsiaaboyncpcyfahkm.supabase.co/rest/v1/users",
        { headers }
      );
      setUsers(res.data.map(user => ({ ...user, id: user.user_id || user.id })));
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      setError("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // إضافة مستخدم جديد
  const addUser = async (userData) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://cpvsiaaboyncpcyfahkm.supabase.co/rest/v1/users",
        userData,
        { headers }
      );
      setUsers(prev => [...prev, res.data[0]]);
      return { success: true };
    } catch (err) {
      console.error("Error adding user:", err.response?.data || err.message);
      return { success: false, error: err.response?.data?.message || "Failed to add user" };
    } finally {
      setIsLoading(false);
    }
  };

  // تحديث مستخدم
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
      
      setUsers(prev => 
        prev.map(user => 
          (user.id || user.user_id) === userIdToUse ? { ...user, ...userData, id: userIdToUse } : user
        )
      );
      return { success: true };
    } catch (err) {
      console.error("Error updating user:", err.response?.data || err.message);
      return { success: false, error: err.response?.data?.message || "Failed to update user" };
    } finally {
      setIsLoading(false);
    }
  };

  // حذف مستخدم
  const deleteUser = async (userId) => {
    try {
      setIsLoading(true);
      const userIdToUse = userId.id || userId.user_id || userId; // يمكن أن يكون userId كائن أو مجرد id
      if (!userIdToUse) {
        throw new Error("User ID is missing for delete operation.");
      }
      await axios.delete(
        `https://cpvsiaaboyncpcyfahkm.supabase.co/rest/v1/users?user_id=eq.${userIdToUse}`,
        { headers }
      );
      setUsers(prev => prev.filter(user => (user.id || user.user_id) !== userIdToUse));
      return { success: true };
    } catch (err) {
      console.error("Error deleting user:", err.response?.data || err.message);
      return { success: false, error: err.response?.data?.message || "Failed to delete user" };
    } finally {
      setIsLoading(false);
    }
  };

  // حساب البيانات للعرض الصفحي
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentUsers = users.slice(startIndex, endIndex);
  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));

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
        fetchUsers // في حال أردنا إعادة جلب البيانات يدوياً
      }}
    >
      {children}
    </userContext.Provider>
  );
};
