import { getProjectById } from '@/api/ProjectAPI';
import { EditProjectForm } from '@/components/projects/EditProjectForm';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';

export const EditProjectView = () => {
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <p>Cargando ...</p>;
  if (isError) return <Navigate to="/404" />;

  if (data) return <EditProjectForm data={data} projectId={projectId} />;
};
