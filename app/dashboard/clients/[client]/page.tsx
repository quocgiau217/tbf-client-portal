'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TopBar from '../../../../components/TopBar';
import GanttChart from '../../../../components/GanttChart';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cXGJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXdceHZWQ2FeUUByWEQ=');

// Định nghĩa kiểu dữ liệu cho các mục trong dự án
type ProjectItem = {
  values: {
    "c-zt1MQpa88S": string; // Client Name
    "c-uVBERGtt-s": string; // Project Name
    "c-NrAMVgDqCI": string; // Start Date
    "c-6N3-GEbEJz": string; // End Date
    "c-UN3Pb9mdO4": string; // Status (Progress)
    "c-8dyhQjZDNC": string; // USD
    [key: string]: any;
  };
};

const fetchProjects = async (client: string): Promise<ProjectItem[]> => {
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

    return data.filter((item: ProjectItem) => item.values["c-zt1MQpa88S"] === client);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const ClientDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const clientParam = params.client;
  const client = Array.isArray(clientParam) ? clientParam[0] : clientParam;

  if (typeof client !== 'string') {
    return <div>Error: Client parameter is missing or invalid</div>;
  }

  const decodedClient = decodeURIComponent(client);

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    if (decodedClient) {
      const getProjects = async () => {
        try {
          const projectData = await fetchProjects(decodedClient);
          setProjects(projectData);
        } catch (error) {
          setError("Failed to load project data");
        } finally {
          setLoading(false);
        }
      };
      getProjects();
    }
  }, [decodedClient]);

  const ganttData = useMemo(() => {
    return projects.map((project, index) => {
      const startDate = new Date(project.values["c-NrAMVgDqCI"]);
      const endDate = new Date(project.values["c-6N3-GEbEJz"]);
      const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const progress = project.values["c-UN3Pb9mdO4"]; // Lấy trực tiếp giá trị chuỗi từ API
      const usd = parseFloat(project.values["c-8dyhQjZDNC"].replace(/[^0-9.-]+/g, "")) || 0;

      return {
        TaskID: index + 1,
        TaskName: project.values["c-uVBERGtt-s"],
        StartDate: startDate,
        EndDate: endDate,
        Duration: duration,
        Progress: progress, // Để giữ nguyên giá trị chuỗi
        ParentID: null,
        USD: usd,
      };
    });
  }, [projects]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return ganttData.slice(startIndex, endIndex);
  }, [ganttData, page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex-dash-id">
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="flex items-center mb-4">
            <button
              onClick={() => router.back()}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
            >
              Back
            </button>
            <h2 className="text-2xl text-black font-semibold">Projects of {decodedClient}</h2>
          </div>
          <div className="ganttContainer">
            {paginatedData.length > 0 ? (
              <GanttChart data={paginatedData} />
            ) : (
              <p>No data available</p>
            )}
            <div className="pagination-controls">
              <button
                onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                disabled={page === 1}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-4"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((prevPage) => (ganttData.length > prevPage * pageSize ? prevPage + 1 : prevPage))}
                disabled={ganttData.length <= page * pageSize}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDetailPage;
