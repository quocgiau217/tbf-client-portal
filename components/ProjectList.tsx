// /components/ProjectList.tsx
interface Project {
  id: string;
  name: string;
  description: string;
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <ul className="mt-4">
      {projects.map((project) => (
        <li key={project.id} className="mb-4 p-4 bg-white shadow-md">
          <h3 className="text-xl text-black font-bold">{project.name}</h3>
          <p className="text-gray-600">{project.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
