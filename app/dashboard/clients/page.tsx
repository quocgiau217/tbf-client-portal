"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Thêm Link từ Next.js
import Sidebar from '../../../components/Sidebar';
import TopBar from '../../../components/TopBar';
// Định nghĩa kiểu dữ liệu cho các client
type Client = string; // Thay bằng kiểu dữ liệu phù hợp nếu cần

// Định nghĩa kiểu dữ liệu cho các mục trong dự án
type ProjectItem = {
  values: {
    "c-zt1MQpa88S": string;
    [key: string]: any; // Các thuộc tính khác nếu cần
  };
};

const fetchProjects = async (): Promise<ProjectItem[]> => {
  try {
    const response = await fetch('https://coda.io/apis/v1/docs/7sk4ZtS6kG/tables/table-rDuaevjmdx/rows', {
      headers: {
        Authorization: `Bearer e37f2e4c-4a92-448c-86f3-8cad58a80c0a`, // Thay bằng token của bạn
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items) {
      throw new Error("API response does not contain 'items'");
    }

    return data.items;
  } catch (error) {
    console.error(error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};

const ClientsPage = () => {
  // Khai báo kiểu cho state
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const getClients = async () => {
      const projects = await fetchProjects();

      // Kiểm tra nếu `projects` có dữ liệu
      if (!projects || projects.length === 0) {
        console.warn("No projects data available");
        return;
      }

      // Đảm bảo rằng `projects` có kiểu dữ liệu `ProjectItem[]`
      const uniqueClients: Client[] = Array.from(new Set(projects.map(item => item.values["c-zt1MQpa88S"])));

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
        <div className="projectList">
          {clients.map((client, index) => (
            <li key={index} className="projectCard">
              <span>{client}</span>
              {/* Nút Xem chi tiết */}
              <Link href={`/dashboard/clients/${encodeURIComponent(client)}`}>
                <button className="detailButton">Xem chi tiết</button>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
