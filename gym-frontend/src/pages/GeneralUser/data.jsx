import axios from "axios"

export const monthlyJoined = async () => {
    try {
      const res = await axios.get("https://gym-management-m4b9.onrender.com/member/monthlyMember", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      return res.data.Member; // or return res.data.Member if you want to return just the array
    } catch (err) {
      console.error("API error in monthlyJoined:", err);
      // Optionally throw or return an empty array or error message
      throw err; // let the caller handle it
    }
  };

  export const threeDays = async () => {
    try {
      const res = await axios.get("https://gym-management-m4b9.onrender.com/member//expiringin3days", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      return res.data.Member; // or return res.data.Member if you want to return just the array
    } catch (err) {
      console.error("API error in monthlyJoined:", err);
      // Optionally throw or return an empty array or error message
      throw err; // let the caller handle it
    }
  };

  export const expiringSoon = async () => {
    try {
      const res = await axios.get("https://gym-management-m4b9.onrender.com/member/expiringin4-7days", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      return res.data.Member; // or return res.data.Member if you want to return just the array
    } catch (err) {
      console.error("API error in monthlyJoined:", err);
      // Optionally throw or return an empty array or error message
      throw err; // let the caller handle it
    }
  };

  export const expired = async () => {
    try {
      const res = await axios.get("https://gym-management-m4b9.onrender.com/member/expiredMember", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      return res.data.Member; // or return res.data.Member if you want to return just the array
    } catch (err) {
      console.error("API error in monthlyJoined:", err);
      // Optionally throw or return an empty array or error message
      throw err; // let the caller handle it
    }
  };

  export const inActive = async () => {
    try {
      const res = await axios.get("https://gym-management-m4b9.onrender.com/member/inactiveMember", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      return res.data.Member; // or return res.data.Member if you want to return just the array
    } catch (err) {
      console.error("API error in monthlyJoined:", err);
      // Optionally throw or return an empty array or error message
      throw err; // let the caller handle it
    }
  };