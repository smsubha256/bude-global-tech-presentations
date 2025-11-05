# Bude Global Tech Presentations

Welcome to the Bude Global Tech Presentations repository! This platform is designed to host and showcase a variety of technical presentations created by the Bude Global community. It features a dynamic loader that allows users to easily discover, search, and view presentations.

## Features

-   **Dynamic Presentation Loading**: Automatically discovers and loads presentation content from JSON files.
-   **Search & Filter**: Easily find presentations by title, description, or keywords.
-   **Responsive Design**: Optimized for viewing on various devices.
-   **Modular Structure**: Presentation configurations are separated for easy management.

## How to View Presentations

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/BUDEGlobalEnterprise/bude-global-tech-presentations.git
    cd bude-global-tech-presentations
    ```
2.  **Open `index.html`**: Simply open the `index.html` file in your web browser. The presentation selector will appear, allowing you to choose a presentation.

## How to Add a New Presentation

To add a new presentation:

1.  **Create a JSON file**: Create a new JSON file for your presentation in the `presentations/` directory. Follow the structure of existing presentation JSON files (e.g., `presentations/intro-python.json`).
2.  **Update `presentations.js`**: Add an entry for your new presentation in the `PRESENTATIONS_CONFIG` array in `presentations.js`. Ensure you provide the correct `file` path, `title`, `description`, and `keywords`.

    Example:
    ```javascript
    {
      file: "presentations/your-new-presentation.json",
      title: "Your Presentation Title",
      description: "A brief description of your presentation.",
      keywords: ["topic1", "topic2", "keyword"],
    },
    ```
3.  **Commit and Push**: Commit your changes and push them to the repository.

## Contributing

We welcome contributions to this repository! If you have a technical presentation you'd like to share, please follow the "How to Add a New Presentation" guide and submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
