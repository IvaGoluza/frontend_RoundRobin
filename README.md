# RoundRobin App (Frontend)

## Project Overview
This is a web application built using Vite, TypeScript, Tailwind CSS. It serves as a platform for monitoring competitions organized under the one-round competition system.

## Technology Stack and Deployment

### Technology Stack
- **TypeScript**: The entire frontend is developed using TypeScript, enhancing code maintainability.
- **Tailwind CSS**: The project uses Tailwind CSS as the primary CSS framework. [Tailwind CSS documentation](https://tailwindcss.com/docs)
### Deployment and Development Environment
- **Vite:** The frontend is developed using Vite, a fast build tool that. [Vite documentation](https://vitejs.dev/)
- **Vercel Deployment:** The frontend application is deployed on Vercel. The deployed application can be accessed at https://frontend-roundrobin.vercel.app/
  <br/>*Please Note*: The frontend application is linked to a backend hosted on Render. In case of any delay in the initial loading, allow a few minutes for the backend services to come online for full functionality.
### Code Quality and Development Tools
- **ESLint**: The project utilizes ESLint for code linting and enforcing coding standards.
- **Prettier**: Prettier is used for code formatting to maintain consistent code style across the project.
  
## Key Features
- **Competition Creation:** Users can define competitions by entering competition names, lists of competitors (separated by a semicolon or new line), and selecting a scoring system (e.g., 3/1/0 for wins/draws/losses).
- **Automated Schedule Generation:** Valid data input generates the complete schedule for the competition.
- **Result Entry:** Creators of competitions can enter results; if in the correct format, they can be saved by clicking the note icon displayed.
- **Supported Competitor Numbers:** The app includes pre-prepared schedules for 4-8 competitors.
- **Publicly Accessible Results Page:** Each competition has a unique link, visible only to the creator, which displays current standings and results.

## Authentication
User registration utilizes the OpenID Connect (OIDC) protocol and the **Auth0** service for seamless authentication.

### Testing Account
- Username: iva@mail.com
- Password: 1234ghjkGHJK

### Example Tournament
Here's an example of a created tournament: https://frontend-roundrobin.vercel.app/tournament/fb5e5d24-e881-466f-8f93-eb48232c5faf



## Setup Instructions
### Prerequisites
- Node.js installed
- Auth0 Account for OIDC authentication
### Installation
Clone the repository: `git clone <frontend_repository_url>`\
Install dependencies: `npm install`\
Set up environment variables for Auth0 configuration.\
Run the application: `npm run dev`
