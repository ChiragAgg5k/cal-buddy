# Use the official Node.js image as base
FROM mcr.microsoft.com/devcontainers/javascript-node:1-18-bullseye

# Install additional system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    nano \
    vim \
    bash-completion \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set up development tools
RUN npm install -g \
    npm@latest \
    @types/node \
    typescript \
    ts-node \
    nodemon \
    eslint \
    prettier \
    create-next-app

# Configure git
RUN git config --global core.editor "code --wait"

# Optional: Set up zsh with oh-my-zsh for enhanced shell experience
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" -- \
    -t robbyrussell \
    -p git \
    -p npm \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions

# Switch to node user
USER node