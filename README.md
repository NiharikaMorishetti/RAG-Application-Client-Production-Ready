# Six Figure RAG Web

Hi 👋 I'm Harish Neel!

This project is well explained in my course. Check it out here:

👉 [Six Figure RAG Course](https://harishneel.com/six-figure-rag)

## 00_Setup

- Ensure that you have install node
- Official docs : https://nextjs.org/docs/app/getting-started/installation

## 01_ClerkAuth

- Set up middleware and wrap app with Clerk Provider
  - Docs: https://clerk.com/docs/nextjs/getting-started/quickstart
- Build custom `/sign-in` and `/sign-up` pages
  - Docs: https://clerk.com/docs/nextjs/guides/development/custom-sign-in-or-up-page
  - Ensure all auth routes are covered:
    - `/sign-in` (main sign-in page)
    - `/sign-in/sso` (SSO authentication)
    - `/sign-in/password-reset` (password reset flow)
- Maintain auth flow using Clerk's `auth` helper

## 02_Sidebar

- Download the `components` from the course resources
- Create Layout and Add Sidebar to it.
- Install required dependencies - `lucide-react`

## 03_ProjectsPage

- Build Projects Page
- Install required dependencies - `react-hot-toast`
- `apiClient` to handle backend APIs  
  API endpoints:
  - GET `/api/projects/` ~ List all projects
  - POST `/api/projects/` ~ Create a new project
  - DELETE `/api/projects/{project_id}` ~ Delete a specific project

## 04_SpecificProjectPage

- Create dynamic route to handle all projects
- Create SpecificProjectPage
- Set up `apiClient` to handle backend APIs  
  Integrate API endpoints with Frontend:

  Project Routes

  - GET `/api/projects/{projectId}` ~ Get specific project data
  - GET `/api/projects/{projectId}/chats` ~ Get specific project chats
  - GET `/api/projects/{projectId}/settings` ~ Get specific project settings

  Project File Routes

  - GET `/api/projects/{projectId}/files`

  Chat Routes

  - POST `/api/chats/` ~ Create a new chat
  - DELETE `/api/chats/{chat_id}` ~ Delete a specific chat

- Create a function `loadUserData` to fetch all specific user data using Promise.all - project's data , chats, settings, files
- `handleCreateNewChat` `handleDeleteChat`
- Add variable types in `lib/types` to get rid of typescript errors

## 05_SpecificProjectSettings

- `handleDraftSettings` - will be able to play with it.
- `apiClient` add put method to update the settings.
- `handlePublishSettings` - will do the API call.
  - PUT `/api/projects/{projectId}/settings` ~ Update specific project settings

## 06_AWS-S3

- Integrate PreSigned URL with Frontend
- **API endpoints**
  - POST `/api/projects/{project_id}/files/upload-url` ~ Generate presigned URL for frontend file upload
  - POST `/api/projects/{project_id}/files/confirm` ~ Confirm file upload to S3
  - POST `/{project_id}/urls` ~ Add website URL to database
  - DELETE `/api/projects/{project_id}/files/{file_id}` ~ To delete the document
- `apiClient` - add uploadtos3 method
- `handleDocumentUpload` - will upload the document to s3 and confirm
- `handleUrlAdd` - add the url
- `handleDocumentDelete` - will delete the document from s3 and database

## 07_RAG-Ingestion

- will fetch the updates via Short Polling in the backend
- **API endpoints**
  - GET `/api/projects/{project_id}/files/{file_id}/chunks` ~ Get project document chunks

## 08_Chat

- Build Chat Page
- GET `/api/chats/{chat_id}` ~ Get a specific chat
- POST `/api/projects/{project_id}/chats/{chat_id}/messages` ~ Send a message to a chat

## 09_Retrieval

- Just Chat with LLM 🤟
- **No Additional changes on frontend**
