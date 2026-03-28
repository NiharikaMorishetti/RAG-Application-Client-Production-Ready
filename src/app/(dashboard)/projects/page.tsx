"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

import toast from "react-hot-toast";
import { apiClient } from "@/lib/api";

interface Project {
  id: string;
  name: string;
  description: string;
  created_at: string;
  clerk_id: string;
}

function ProjectsPage() {
  // * Data States - What data we're tracking
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // * UI States - How the interface looks and behaves
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Clerk : https://clerk.com/docs/nextjs/reference/hooks/use-auth
  const { getToken, userId } = useAuth();
  const router = useRouter();

  /*
  ! Business Logic Functions - Core operations for this page:
  * - loadProjects: Get all projects from the server
  * - handleCreateProject: Make a new project with name and description
  * - handleDeleteProject: Delete a project by its ID
  */

  const loadProjects = async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const result = await apiClient.get("/api/projects", token);

      const { data } = result || {};

      setProjects(data);
    } catch (err) {
      console.error("Error Loading Projects", err);
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (name: string, description: string) => {
    try {
      setError(null);
      setIsCreating(true);

      const token = await getToken();

      const result = await apiClient.post(
        "/api/projects",
        {
          name,
          description,
        },
        token
      );

      const savedProject = result?.data || {};
      setProjects((prev) => [savedProject, ...prev]);

      setShowCreateModal(false);
      toast.success("Project created successfully!");
    } catch (err) {
      toast.error("Failed to create project");
      console.error("Failed to create project", err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      setError(null);
      const token = await getToken();

      await apiClient.delete(`/api/projects/${projectId}`, token);

      setProjects((prev) => prev.filter((project) => project.id !== projectId));

      toast.success("Project deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete project");
      console.error("Failed to delete project", err);
    }
  };

  /*
  ! User Interaction Functions:
  * - handleProjectClick: Go to a specific project page when clicked
  * - handleOpenModal/handleCloseModal: Show/hide the new project form
  */

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  const handleOpenModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  useEffect(() => {
    if (userId) {
      loadProjects();
    }
  }, [userId]);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner message="Loading projects..." />;
  }

  return (
    <div>
      <ProjectsGrid
        projects={filteredProjects}
        loading={loading}
        error={error}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onProjectClick={handleProjectClick}
        onCreateProject={handleOpenModal}
        onDeleteProject={handleDeleteProject}
      />

      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        onCreateProject={handleCreateProject}
        isLoading={isCreating}
      />
    </div>
  );
}

export default ProjectsPage;
