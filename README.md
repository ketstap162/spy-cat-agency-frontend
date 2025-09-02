# Spy Cat Agency (SCA) - Frontend

This is the frontend dashboard for the Spy Cat Agency, built with Next.js. It's a simple, focused application designed to help agents manage their spy cats, including recruiting new ones, viewing their details, and updating their information. The app integrates with the backend API to handle all data management.

### Backend Repository
This frontend is designed to work with the **Spy Cat Agency backend**, which can be found here:
**https://github.com/ketstap162/spy-cat-agency**

---

### Features
* **Spy Cats Management**: A dedicated page to view a list of all spy cats.
* **Recruit New Cats**: A form to add new spy cats to the agency.
* **Cat Details**: View a single spy cat's details.
* **Update & Delete**: Options to update a cat's salary and delete a cat from the system.
* **Missions Dashboard**: A missions management page to view missions and their details.

---

### How to get started

Follow these steps to get the application up and running on your local machine.

1) **Clone the repository**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-folder>
    ```

2) **Install dependencies**  
    To install all the necessary packages and dependencies, run the following command in your terminal:
    ```bash
    npm install
    ```
    This command reads the `package.json` file and installs everything the project needs to run.

3) **Fill the env file**  
    Copy the contents of `.env.sample` file to new `.env` file 

4) **Run the application**  
    Once the dependencies are installed, you can start the development server with this command:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

---

### API Integration

This frontend application is designed to work with the Spy Cat Agency backend. Ensure that your backend server is running and accessible at the specified API endpoint.

**Note**: The backend must be running for the frontend to display data correctly.

---

### Contact

If you have any questions or encounter issues, please feel free to open an issue on the GitHub repository.