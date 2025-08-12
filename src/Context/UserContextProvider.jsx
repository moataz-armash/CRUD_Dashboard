// src/Context/UserContextProvider.jsx
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../lib/api";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 10;

  // filter from URL
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get("filter");

  // ===== READ (with simple cache) =====
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const cached = localStorage.getItem("cachedUsers");
      const last = localStorage.getItem("lastFetchTime");
      if (cached && last && Date.now() - +last < 300000) {
        setUsers(JSON.parse(cached));
        return;
      }

      const res = await api.get("/users");
      const formatted = res.data.map((u) => ({ ...u, id: u.user_id || u.id }));
      setUsers(formatted);
      localStorage.setItem("cachedUsers", JSON.stringify(formatted));
      localStorage.setItem("lastFetchTime", Date.now().toString());
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      setError("Failed to fetch users");
      const cached = localStorage.getItem("cachedUsers");
      if (cached) {
        setUsers(JSON.parse(cached));
        setError("Using cached data - connection issue");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ===== CREATE =====

  const addUser = async (userData) => {
    try {
      setIsLoading(true);

      // 🔍 DEBUG LOG 1 – Incoming data
      console.log("[ADD USER] Incoming userData:", userData);

      const { id, user_id, ...payload } = userData;

      // 🔍 DEBUG LOG 2 – Payload after stripping id/user_id
      console.log("[ADD USER] Payload being sent to Supabase:", payload);

      const res = await api.post("/users", payload);

      // 🔍 DEBUG LOG 3 – Response from Supabase
      console.log("[ADD USER] Response from Supabase:", res.status, res.data);

      const newUser = res.data[0];
      setUsers((prev) => {
        const updated = [
          ...prev,
          { ...newUser, id: newUser.user_id || newUser.id },
        ];
        localStorage.setItem("cachedUsers", JSON.stringify(updated));
        localStorage.setItem("lastFetchTime", Date.now().toString());
        return updated;
      });
      return { success: true };
    } catch (err) {
      // 🔍 DEBUG LOG 4 – Error details
      console.error(
        "[ADD USER] Error:",
        err.response?.status,
        err.response?.data || err.message
      );

      return {
        success: false,
        error: err.response?.data?.message || "Failed to add user",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // ===== UPDATE =====
  const updateUser = async (userData) => {
    try {
      setIsLoading(true);
      const userId = userData.id || userData.user_id;
      if (!userId) throw new Error("User ID is missing for update");

      const { id, ...payload } = userData;
      // filter by primary key user_id (uuid)
      const res = await api.patch(`/users?user_id=eq.${userId}`, {
        ...payload,
        user_id: userId,
      });
      const updatedRow = res.data[0];

      setUsers((prev) => {
        const updated = prev.map((u) =>
          (u.id || u.user_id) === userId
            ? { ...u, ...updatedRow, id: userId }
            : u
        );
        localStorage.setItem("cachedUsers", JSON.stringify(updated));
        localStorage.setItem("lastFetchTime", Date.now().toString());
        return updated;
      });
      return { success: true };
    } catch (err) {
      console.error("Error updating user:", err.response?.data || err.message);
      return {
        success: false,
        error: err.response?.data?.message || "Failed to update user",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // ===== DELETE =====
  const deleteUser = async (userIdLike) => {
    try {
      setIsLoading(true);
      const userId = userIdLike?.id || userIdLike?.user_id || userIdLike;
      if (!userId) throw new Error("User ID is missing for delete");

      await api.delete(`/users?user_id=eq.${userId}`);
      setUsers((prev) => {
        const updated = prev.filter((u) => (u.id || u.user_id) !== userId);
        localStorage.setItem("cachedUsers", JSON.stringify(updated));
        localStorage.setItem("lastFetchTime", Date.now().toString());
        return updated;
      });
      return { success: true };
    } catch (err) {
      console.error("Error deleting user:", err.response?.data || err.message);
      return {
        success: false,
        error: err.response?.data?.message || "Failed to delete user",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // ===== filtering + pagination + counts =====
  const filteredUsers = useMemo(() => {
    if (!filterType) return users;
    const ft = filterType.toLowerCase();
    if (ft === "customer")
      return users.filter((u) => u.role?.toLowerCase().includes("customer"));
    if (ft === "admin")
      return users.filter((u) => u.role?.toLowerCase().includes("admin"));
    return users;
  }, [filterType, users]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredUsers.length / pageSize)),
    [filteredUsers.length, pageSize]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, users.length]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * pageSize;
  const currentUsers = useMemo(
    () => filteredUsers.slice(startIndex, startIndex + pageSize),
    [filteredUsers, startIndex, pageSize]
  );

  const customersCount = useMemo(
    () =>
      users.filter((u) => u.role?.toLowerCase().includes("customer")).length,
    [users]
  );
  const adminsCount = useMemo(
    () => users.filter((u) => u.role?.toLowerCase().includes("admin")).length,
    [users]
  );

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
        adminsCount,
      }}>
      {children}
    </userContext.Provider>
  );
};
