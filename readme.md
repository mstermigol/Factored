# How to Run the Project



### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Git** installed on your machine.
- **Docker** installed on your machine.

### Clone the Repository

1. Clone the repository using Git:

    ```bash
    git clone https://github.com/mstermigol/Factored.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Factored
    ```

### Make the Script Executable

3. Make the docker compose script executable:

    ```bash
    chmod +x docker-compose-script.sh
    ```

### Run the Script

4. Run the build script with the API URL:

    ```bash
    ./docker-compose-script.sh
    ```

   > **Note:** The script indicates the backend endpoint URL that the application will use to communicate with the server. The default value of the `.env` variable is `VITE_API_URL=http://127.0.0.1:8000/api/`. If you want to change it, run the script with your desired URL:
   >
   > ```bash
   > ./docker-compose-script.sh http://[your-ip:8000]/api/
   > ```

5. **Check the Project**: If you used the default API URL, open your web browser and go to:

    ```
    http://127.0.0.1
    ```

   This should display the application running locally. If you specified a different API URL, adjust the port accordingly to access the application.