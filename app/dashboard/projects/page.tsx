import Sidebar from '../../../components/Sidebar';
import TopBar from '../../../components/TopBar';
import Link from 'next/link';
import { registerLicense } from '@syncfusion/ej2-base';

// Thay thế 'your-license-key' bằng key mà bạn đã nhận được từ Syncfusion
registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cXGJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXdceHZWQ2FeUUByWEQ=');

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
}

const projects: Project[] = [
  { id: 1, name: 'Project Alpha', description: 'This is the Alpha project description.', status: 'In Progress' },
  { id: 2, name: 'Project Beta', description: 'This is the Beta project description.', status: 'Completed' },
  { id: 3, name: 'Project Gamma', description: 'This is the Gamma project description.', status: 'Not Started' },
];

export default function Projects() {
  return (
    <div className="flex-dash">
  <Sidebar />
  <div className="mainContent">
    <TopBar />
    <h2 className="dashboardHeader">Your Projects</h2>
    <div className="projectList">
      {projects.map((project) => (
        <div key={project.id} className="projectCard">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <p className="status">Status: {project.status}</p>
          <Link href={`/dashboard/projects/${project.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
