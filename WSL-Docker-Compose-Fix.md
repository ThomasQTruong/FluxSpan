# WSL Docker Compose Fix

- Guide on how to fix Docker Compose if it gets corrupted on WSL due to improper closure.
  - i.e. `docker compose up` permanently frozen.
  - Alternative: use Docker Desktop with WSL Integration.
  - Proper closure:
    - `docker compose down`.
    - `sudo systemctl stop docker docker.socket containerd`
    - Can automate in `~/.bashrc`.
      - ```
        stopdocker() {
          cd ~/Coding/FluxSpan && docker compose down
          sudo systemctl stop docker docker.socket containerd
          echo "Docker stopped cleanly."
        }
        ```

1. Stop docker services by running: `sudo systemctl stop docker docker.socket containerd`.

- It should print: `Job for docker.service canceled.`.

2. `sudo apt-get purge -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`.

3. `sudo rm -rf /var/lib/docker /var/lib/containerd /var/run/docker.sock /etc/docker`.

- If a busy error message occurs, run: `sudo umount -R /var/lib/docker`.
  - Run the previous command again after.

4. `sudo apt-get update`.

5. `sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`.

6. `sudo systemctl start docker`.
