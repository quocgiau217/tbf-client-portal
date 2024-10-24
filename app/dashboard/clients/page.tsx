'use client'; // Next.js yêu cầu 'use client' cho các component có trạng thái (state) và hiệu ứng (effect)

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '../../../components/Sidebar';
import TopBar from '../../../components/TopBar';

// Định nghĩa kiểu dữ liệu cho các mục trong dự án
type ProjectItem = {
  values: {
    "c-zt1MQpa88S": string;
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

    if (!data) {
      throw new Error("API response does not contain data");
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const ClientsPage = () => {
  const [clients, setClients] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getClients = async () => {
      setLoading(true);
      const projects = await fetchProjects();
      setLoading(false);

      if (!projects || projects.length === 0) {
        console.warn("No projects data available");
        return;
      }

      const uniqueClients: string[] = Array.from(new Set(projects.map(item => item.values["c-zt1MQpa88S"])));

      setClients(uniqueClients);
    };
    getClients();
  }, []);

  return (
    <div className="flex-dash">
      <Sidebar />
      <div className="mainContent">
        <TopBar />
        <h2 className="dashboardHeader">Clients</h2>
        {loading ? (
          <p>Loading...</p>
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
