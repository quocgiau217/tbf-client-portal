"use client";

import { useParams, useRouter } from 'next/navigation';
import TopBar from '../../../../components/TopBar';
import SyncfusionGantt from '../../../../components/SyncfusionGantt';
import { registerLicense } from '@syncfusion/ej2-base';

// Thay thế 'your-license-key' bằng key mà bạn đã nhận được từ Syncfusion
registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cXGJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXdceHZWQ2FeUUByWEQ=');

export default function ProjectDetails() {
  const params = useParams();
  const id = params.id; 
  const router = useRouter();

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
            <h2 className="text-2xl text-black font-semibold">Project {id} Details</h2>
          </div>
          
          {/* Hiển thị Gantt Chart */}
          <SyncfusionGantt />
        </main>
      </div>
    </div>
  );
}
