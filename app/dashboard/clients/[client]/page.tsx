"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TopBar from '../../../../components/TopBar';
import GanttChart from '../../../../components/GanttChart';
import { registerLicense } from '@syncfusion/ej2-base';

// Đăng ký license của Syncfusion
registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cXGJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXdceHZWQ2FeUUByWEQ=');

// Định nghĩa kiểu dữ liệu cho dự án
type ProjectItem = {
  values: {
    "c-zt1MQpa88S": string; // Client
    "c-uVBERGtt-s": string; // Project Name
    "c-NrAMVgDqCI": string; // Start Date
    "c-6N3-GEbEJz": string; // End Date
    "c-8dyhQjZDNC": string; // USD
    [key: string]: any;
  };
};

const fetchProjects = async (client: string): Promise<ProjectItem[]> => {
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

    // Lọc ra các dự án của client cụ thể
    return data.items.filter((item: ProjectItem) => item.values["c-zt1MQpa88S"] === client);
  } catch (error) {
    console.error(error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};

const ClientDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  let client = params.client;

  // Kiểm tra nếu client là mảng, lấy phần tử đầu tiên
  if (Array.isArray(client)) {
    client = client[0]; // Lấy phần tử đầu tiên nếu là mảng
  }

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [ganttData, setGanttData] = useState<any[]>([]); // Dữ liệu cho Gantt

  useEffect(() => {
    if (client) {
      const getProjects = async () => {
        // Kiểm tra lần nữa và chỉ gọi hàm khi client là một string
        if (typeof client === 'string') {
          const projectData = await fetchProjects(client);
          setProjects(projectData);
          setGanttData(prepareGanttData(projectData)); // Chuẩn bị dữ liệu cho Gantt
        } else {
          console.error("Client is not a string.");
        }
      };
      getProjects();
    }
  }, [client]);

  // Hàm chuẩn bị dữ liệu cho Gantt
  const prepareGanttData = (projects: ProjectItem[]) => {
    return projects.map((project, index) => ({
      TaskID: index + 1,
      TaskName: project.values["c-uVBERGtt-s"],
      StartDate: new Date(project.values["c-NrAMVgDqCI"]),
      EndDate: new Date(project.values["c-6N3-GEbEJz"]),
      Duration: Math.ceil(
        (new Date(project.values["c-6N3-GEbEJz"]).getTime() - new Date(project.values["c-NrAMVgDqCI"]).getTime()) /
        (1000 * 60 * 60 * 24)
      ), // Tính số ngày làm việc
      Progress: 50, // Giá trị giả định, bạn có thể thay đổi
      ParentID: null, // Nếu có cha mẹ, sử dụng ParentID
      USD: project.values["c-8dyhQjZDNC"] // Thêm giá trị USD vào đây
    }));
  };

  return (
    <div className="flex-dash-id">
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="flex items-center mb-4">
            <button
              onClick={() => router.back()} // Sử dụng router để quay lại trang trước đó
              className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
            >
              Back
            </button>
            <h2 className="text-2xl text-black font-semibold">Projects of {client}</h2>
          </div>
          <div className="ganttContainer">
            {ganttData.length > 0 ? (
              <GanttChart data={ganttData} /> // Sử dụng component GanttChart và truyền dữ liệu
            ) : (
              <p>No data available</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDetailPage;

