Features & Pages
01 — Clerk Authentication

Full auth flow with custom /sign-in and /sign-up pages
SSO support and password reset flow
Clerk middleware wrapping the entire app
Auth state managed via Clerk's auth() helper

02 — Sidebar & Layout

Persistent sidebar navigation across all authenticated pages
Built with lucide-react icons

03 — Projects Page

List, create, and delete projects
Toast notifications via react-hot-toast
API endpoints consumed:

GET /api/projects/ — list all projects
POST /api/projects/ — create a new project
DELETE /api/projects/{project_id} — delete a project



04 — Specific Project Page

Dynamic route handling per project
Loads project data, chats, settings, and files in parallel via Promise.all
Chat management: create and delete chats
API endpoints consumed:

GET /api/projects/{projectId} — project data
GET /api/projects/{projectId}/chats — project chats
GET /api/projects/{projectId}/files — project files
POST /api/chats/ — create chat
DELETE /api/chats/{chat_id} — delete chat



05 — Project Settings

Draft and publish project settings
API endpoints consumed:

GET /api/projects/{projectId}/settings — fetch settings
PUT /api/projects/{projectId}/settings — update settings



06 — Document Upload (AWS S3)

Drag-and-drop file upload via react-dropzone
Presigned URL flow: frontend uploads directly to S3
URL ingestion for web pages
API endpoints consumed:

POST /api/projects/{project_id}/files/upload-url — generate presigned URL
POST /api/projects/{project_id}/files/confirm — confirm upload
POST /{project_id}/urls — add website URL
DELETE /api/projects/{project_id}/files/{file_id} — delete document



07 — Ingestion Status

Short polling to track document ingestion progress in real time
API endpoints consumed:

GET /api/projects/{project_id}/files/{file_id}/chunks — get document chunks



08 & 09 — Chat Interface

Full chat UI backed by the LangGraph multi-agent supervisor
Responses are grounded in project documents with citation tracking
API endpoints consumed:

GET /api/chats/{chat_id} — load chat history
POST /api/projects/{project_id}/chats/{chat_id}/messages — send message
