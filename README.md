# rentFlow 🏡

**A robust backend system for streamlined property and rental management.**

## ✨ Key Features

  * **Property Management:** Register and manage property details with ease.
  * **Client Database:** Maintain a comprehensive record of all your clients.
  * **Contract Generation:** Create and track rental contracts digitally.
  * **Payment Tracking:** Log and monitor payment records for each contract.
  * **Secure Authentication:** Built-in authentication, session handling, and logging.

## 🛠️ Tech Stack

  * **Backend:** [NestJS](https://docs.nestjs.com/)
  * **Database:** [Mongoose](https://mongoosejs.com/) (for MongoDB)
  * **Logging:** [Winston](https://github.com/winstonjs/winston)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

  * Node.js (v18 or later)
  * npm
  * A running MongoDB instance

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ahmedzaghloul25/rentFlow-server.git
    cd rentFlow-server
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## ⚙️ Usage

### Running the Application

  * **Development Mode** (with hot-reloading):

    ```bash
    npm run start:dev
    ```

  * **Production Mode:**

    ```bash
    # First, build the project
    npm run build

    # Then, start the production server
    npm run start:prod
    ```

### Other Scripts

  * **Run Tests:**

    ```bash
    npm run test
    ```

  * **Lint Code:**

    ```bash
    npm run lint
    ```

## 🗺️ Roadmap

  - [ ] Enable saving contract scans to cloud storage (e.g., AWS S3, Cloudinary).

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please feel free to fork the repo and create a pull request.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.