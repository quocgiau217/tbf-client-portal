'use client'; // Next.js yêu cầu 'use client' cho các component có trạng thái (state) và hiệu ứng (effect)

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '../../../components/Sidebar';
import TopBar from '../../../components/TopBar';
import { createClient } from "@/utils/supabase/client";

type ProjectItem = {
  values: {
    "c-zt1MQpa88S": string; // Client Name
    [key: string]: any;
  };
};

const fetchProjects = async (): Promise<ProjectItem[]> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${apiUrl}/api/fetch-data`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Data fetched from API:", data); // Kiểm tra dữ liệu nhận được từ API

    if (!data || !Array.isArray(data)) {
      throw new Error("API response is not in the expected format");
    }

    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

const ClientsPage = () => {
  const [clients, setClients] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);

        // Lấy vai trò người dùng từ bảng user_roles
        const { data: userRole, error } = await supabase
          .from('user_roles')
          .select('roles_name')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
          setRole('No role');
        } else {
          setRole(userRole ? userRole.roles_name : 'No role');
        }
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const getClients = async () => {
      setLoading(true);
      setError(null); // Reset lỗi trước khi gọi API

      try {
        const projects = await fetchProjects();

        if (!projects || projects.length === 0) {
          console.warn("No projects data available");
          setError("No projects data found");
          setClients([]); // Đặt lại danh sách khách hàng
          return;
        }

        // Lọc danh sách dự án dựa trên vai trò của người dùng
        let filteredProjects = projects;
        if (role && role !== 'admin') {
          filteredProjects = projects.filter(item => item.values["c-zt1MQpa88S"] === role);
        }

        const uniqueClients: string[] = Array.from(new Set(filteredProjects.map(item => item.values["c-zt1MQpa88S"])));
        setClients(uniqueClients);
      } catch (error) {
        setError("Failed to load clients. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (role) {
      getClients();
    }
  }, [role]);

  return (
    <div className="flex-dash">
      <Sidebar />
      <div className="mainContent">
        {/* Truyền user và role vào TopBar */}
        <TopBar user={user} role={role} />
        <h2 className="dashboardHeader">Clients</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div className="projectList">
            {clients.length === 0 ? (
              <p>No clients found</p>
            ) : (
              clients.map((client, index) => (
                <li key={index} className="projectCard">
                  <span>{client}</span>
                  <Link href={`/dashboard/clients/${encodeURIComponent(client)}`}>
                    <button className="detailButton">Xem chi tiết</button>
                  </Link>
                </li>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsPage;
