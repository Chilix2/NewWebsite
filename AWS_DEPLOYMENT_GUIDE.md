# Complete Guide: Deploying to AWS and Developing via SSH

This guide will walk you through setting up your Next.js project on an AWS EC2 instance and configuring SSH access for remote development.

## Prerequisites

- AWS account with appropriate permissions
- AWS CLI installed (optional, but recommended)
- SSH client (built into Windows 10/11)
- Basic knowledge of terminal/command line

---

## Part 1: Setting Up AWS EC2 Instance

### Step 1: Launch an EC2 Instance

1. **Log into AWS Console**
   - Go to https://console.aws.amazon.com
   - Navigate to **EC2** service

2. **Launch Instance**
   - Click **"Launch Instance"** button
   - Configure the instance:
     - **Name**: `workflow-logic-review-dev` (or your preferred name)
     - **AMI (Amazon Machine Image)**: Choose **Ubuntu Server 22.04 LTS** (free tier eligible)
     - **Instance Type**: 
       - **Recommended**: `t3.medium` (2 vCPU, 4GB RAM) - Best balance of performance and cost
       - Budget option: `t3.small` (2 vCPU, 2GB RAM) - Free tier eligible, slower builds
       - Performance option: `t3.large` (2 vCPU, 8GB RAM) - Fastest builds, more expensive
       - See [AWS_INSTANCE_RECOMMENDATIONS.md](./AWS_INSTANCE_RECOMMENDATIONS.md) for detailed comparison
     - **Key Pair**: 
       - If you don't have one, click **"Create new key pair"**
       - Name: `workflow-dev-key`
       - Key pair type: **RSA**
       - Private key file format: **.pem** (for OpenSSH)
       - **IMPORTANT**: Download the `.pem` file and save it securely (you'll need it for SSH)

3. **Network Settings**
   - **Security Group**: Create a new security group or use existing
   - **SSH (22)**: Allow from **My IP** (for security)
   - **HTTP (80)**: Allow from **Anywhere-IPv4** (if you want to access the app)
   - **HTTPS (443)**: Allow from **Anywhere-IPv4** (if you want HTTPS)
   - **Custom TCP (3000)**: Allow from **My IP** (for Next.js dev server)

4. **Storage**
   - **Recommended**: 20GB gp3 (enough for node_modules, builds, and future growth)
   - Minimum: 8GB (may fill up quickly with node_modules)
   - For multiple projects: 30-40GB

5. **Launch Instance**
   - Click **"Launch Instance"**
   - Wait for instance to be in **"Running"** state

### Step 2: Get Your Instance Details

1. **Find Public IP/DNS**
   - In EC2 Dashboard, select your instance
   - Note the **Public IPv4 address** (e.g., `54.123.45.67`)
   - Or use **Public IPv4 DNS** (e.g., `ec2-54-123-45-67.compute-1.amazonaws.com`)

2. **Note Your Key Pair Location**
   - Remember where you saved your `.pem` file (e.g., `C:\Users\Charl\Downloads\workflow-dev-key.pem`)

---

## Part 2: Setting Up SSH Access

### Step 1: Secure Your Private Key (Windows)

1. **Move the .pem file to a secure location**
   ```powershell
   # Create a .ssh directory in your user folder
   mkdir C:\Users\Charl\.ssh
   
   # Move your key file there
   move C:\Users\Charl\Downloads\workflow-dev-key.pem C:\Users\Charl\.ssh\workflow-dev-key.pem
   ```

2. **Set proper permissions** (Windows)
   ```powershell
   # Remove inheritance and set permissions
   icacls C:\Users\Charl\.ssh\workflow-dev-key.pem /inheritance:r
   icacls C:\Users\Charl\.ssh\workflow-dev-key.pem /grant:r "%USERNAME%:R"
   ```

### Step 2: Connect via SSH

1. **First Connection**
   ```powershell
   # Replace with your actual values
   ssh -i C:\Users\Charl\.ssh\workflow-dev-key.pem ubuntu@YOUR_PUBLIC_IP
   
   # Example:
   # ssh -i C:\Users\Charl\.ssh\workflow-dev-key.pem ubuntu@54.123.45.67
   ```

2. **Accept the host key** when prompted (type `yes`)

3. **If connection fails**, check:
   - Security group allows SSH from your IP
   - Instance is in "Running" state
   - You're using the correct username (`ubuntu` for Ubuntu AMI)

### Step 3: Configure SSH for Easier Access (Optional)

Create an SSH config file for easier connections:

1. **Create/Edit SSH config** (if it doesn't exist)
   ```powershell
   notepad C:\Users\Charl\.ssh\config
   ```

2. **Add this configuration**:
   ```
   Host workflow-dev
       HostName YOUR_PUBLIC_IP
       User ubuntu
       IdentityFile C:\Users\Charl\.ssh\workflow-dev-key.pem
       ServerAliveInterval 60
   ```

3. **Now you can connect simply with**:
   ```powershell
   ssh workflow-dev
   ```

---

## Part 3: Setting Up the Development Environment on EC2

### Step 1: Update System Packages

Once connected via SSH, run:

```bash
sudo apt update
sudo apt upgrade -y
```

### Step 2: Install Node.js and pnpm

```bash
# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install pnpm globally
npm install -g pnpm

# Verify pnpm
pnpm --version
```

### Step 3: Install Git (if not already installed)

```bash
sudo apt install -y git
git --version
```

### Step 4: Install Additional Development Tools (Optional)

```bash
# Install useful tools
sudo apt install -y build-essential curl wget vim nano

# Install PM2 for process management (optional, for production)
npm install -g pm2
```

---

## Part 4: Transferring Your Project to EC2

### Option 1: Using SCP (Recommended for First Transfer)

From your **local Windows machine** (PowerShell), run:

```powershell
# Navigate to your project directory
cd "C:\Users\Charl\OneDrive - Key Retails\Qortex\workflow-logic-review"

# Create a compressed archive (excluding node_modules)
# Using PowerShell compression
Compress-Archive -Path app,components,hooks,lib,public,styles,*.json,*.mjs,*.ts,*.js,*.md -DestinationPath project.zip -Force

# Transfer the archive
scp -i C:\Users\Charl\.ssh\workflow-dev-key.pem project.zip ubuntu@YOUR_PUBLIC_IP:~/

# Or if using SSH config:
scp -i C:\Users\Charl\.ssh\workflow-dev-key.pem project.zip workflow-dev:~/
```

Then on the EC2 instance (via SSH):

```bash
# Create project directory
mkdir -p ~/projects
cd ~/projects

# Extract the archive
unzip ~/project.zip -d workflow-logic-review
cd workflow-logic-review

# Install dependencies
pnpm install
```

### Option 2: Using Git (Recommended for Ongoing Development)

1. **Create a Git Repository** (if not already done)
   - Push your project to GitHub, GitLab, or Bitbucket
   - Make sure to add `.gitignore` to exclude `node_modules`

2. **On EC2 Instance**, clone the repository:

```bash
# Create projects directory
mkdir -p ~/projects
cd ~/projects

# Clone your repository
git clone YOUR_REPOSITORY_URL workflow-logic-review
cd workflow-logic-review

# Install dependencies
pnpm install
```

### Option 3: Using rsync (Best for Incremental Updates)

From your **local Windows machine** (requires WSL or Git Bash):

```bash
# Install rsync on Windows (via WSL or Git Bash)
# Then sync files
rsync -avz --exclude 'node_modules' --exclude '.next' \
  -e "ssh -i C:\Users\Charl\.ssh\workflow-dev-key.pem" \
  "C:\Users\Charl\OneDrive - Key Retails\Qortex\workflow-logic-review\" \
  ubuntu@YOUR_PUBLIC_IP:~/projects/workflow-logic-review/
```

---

## Part 5: Running Your Development Server

### Option 1: Direct Development Server

On EC2 instance:

```bash
cd ~/projects/workflow-logic-review
pnpm dev
```

**Important**: The dev server will be accessible at `http://YOUR_PUBLIC_IP:3000` but only if:
- Your security group allows port 3000 from your IP
- You use the public IP or configure port forwarding

### Option 2: Using SSH Port Forwarding (Recommended)

This allows you to access the dev server as if it's running locally:

1. **From your local machine**, create an SSH tunnel:

```powershell
ssh -i C:\Users\Charl\.ssh\workflow-dev-key.pem -L 3000:localhost:3000 ubuntu@YOUR_PUBLIC_IP
```

Or with SSH config:
```powershell
ssh -L 3000:localhost:3000 workflow-dev
```

2. **In a separate terminal**, connect to EC2 and start the dev server:

```powershell
ssh workflow-dev
cd ~/projects/workflow-logic-review
pnpm dev
```

3. **Access the app** at `http://localhost:3000` in your local browser

### Option 3: Using VS Code Remote SSH (Best for Development)

1. **Install VS Code Remote SSH Extension**
   - Open VS Code
   - Install "Remote - SSH" extension

2. **Connect to Remote Server**
   - Press `F1` or `Ctrl+Shift+P`
   - Type "Remote-SSH: Connect to Host"
   - Select `workflow-dev` (or enter `ubuntu@YOUR_PUBLIC_IP`)
   - Enter password if prompted (or use key)

3. **Open Project Folder**
   - Once connected, click "Open Folder"
   - Navigate to `/home/ubuntu/projects/workflow-logic-review`
   - Install recommended extensions when prompted

4. **Develop as if local**
   - Terminal opens directly on EC2
   - File editing happens on remote server
   - Port forwarding is automatic

---

## Part 6: Setting Up for Production (Optional)

### Using PM2 for Process Management

```bash
# Install PM2 globally (if not already installed)
npm install -g pm2

# Build your Next.js app
cd ~/projects/workflow-logic-review
pnpm build

# Start with PM2
pm2 start npm --name "workflow-app" -- start

# Save PM2 configuration
pm2 save
pm2 startup  # Follow the instructions to enable auto-start on reboot
```

### Using Nginx as Reverse Proxy (Optional)

```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/workflow-app
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name YOUR_PUBLIC_IP_OR_DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/workflow-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Part 7: Daily Development Workflow

### Recommended Workflow

1. **Connect via SSH**:
   ```powershell
   ssh workflow-dev
   ```

2. **Navigate to project**:
   ```bash
   cd ~/projects/workflow-logic-review
   ```

3. **Pull latest changes** (if using Git):
   ```bash
   git pull
   pnpm install  # If dependencies changed
   ```

4. **Start development server**:
   ```bash
   pnpm dev
   ```

5. **Access via port forwarding** (in separate terminal):
   ```powershell
   ssh -L 3000:localhost:3000 workflow-dev
   ```
   Then open `http://localhost:3000` in browser

### Or Use VS Code Remote SSH

1. Open VS Code
2. Connect to `workflow-dev`
3. Open project folder
4. Use integrated terminal: `pnpm dev`
5. Access at `http://localhost:3000` (automatic port forwarding)

---

## Part 8: Troubleshooting

### SSH Connection Issues

**Problem**: "Permission denied (publickey)"
- **Solution**: Check key file permissions and path
- Ensure you're using the correct username (`ubuntu` for Ubuntu)

**Problem**: "Connection timed out"
- **Solution**: 
  - Check security group allows SSH from your IP
  - Verify instance is running
  - Check if your IP changed (update security group)

### Port Access Issues

**Problem**: Can't access port 3000
- **Solution**: 
  - Use SSH port forwarding: `ssh -L 3000:localhost:3000 workflow-dev`
  - Or update security group to allow port 3000

### Node.js/pnpm Issues

**Problem**: Command not found
- **Solution**: 
  ```bash
  # Reinstall Node.js
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs
  
  # Reinstall pnpm
  npm install -g pnpm
  ```

### Build Errors

**Problem**: Build fails on EC2
- **Solution**: 
  ```bash
  # Install build essentials
  sudo apt install -y build-essential
  
  # Clear cache and reinstall
  rm -rf node_modules .next
  pnpm install
  ```

---

## Part 9: Security Best Practices

1. **Keep Your Private Key Secure**
   - Never commit `.pem` files to Git
   - Use strong file permissions
   - Consider using AWS Systems Manager Session Manager as alternative

2. **Update Security Groups**
   - Only allow SSH from your IP
   - Use specific ports, not "Anywhere" for SSH

3. **Keep System Updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

4. **Use Firewall** (UFW)
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 3000/tcp
   sudo ufw enable
   ```

5. **Regular Backups**
   - Use Git for code versioning
   - Consider EBS snapshots for instance backups

---

## Part 10: Cost Optimization

1. **Stop Instance When Not in Use**
   - EC2 Dashboard → Select instance → Instance State → Stop
   - Note: Public IP will change unless using Elastic IP

2. **Use Elastic IP** (if you need static IP)
   - Allocate Elastic IP in EC2 Dashboard
   - Associate with your instance
   - Free as long as instance is running

3. **Monitor Usage**
   - Set up billing alerts in AWS Billing Dashboard
   - Use AWS Cost Explorer to track spending

---

## Quick Reference Commands

### Local Machine (PowerShell)

```powershell
# Connect to EC2
ssh workflow-dev

# Connect with port forwarding
ssh -L 3000:localhost:3000 workflow-dev

# Transfer files
scp -i C:\Users\Charl\.ssh\workflow-dev-key.pem file.txt workflow-dev:~/
```

### EC2 Instance (Bash)

```bash
# Navigate to project
cd ~/projects/workflow-logic-review

# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Check running processes
pm2 list

# View logs
pm2 logs workflow-app
```

---

## Next Steps

1. ✅ Set up EC2 instance
2. ✅ Configure SSH access
3. ✅ Transfer project files
4. ✅ Install dependencies
5. ✅ Start development server
6. ✅ Set up VS Code Remote SSH (recommended)
7. ✅ Begin developing!

---

## Additional Resources

- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [VS Code Remote SSH](https://code.visualstudio.com/docs/remote/ssh)
- [SSH Port Forwarding Guide](https://www.ssh.com/academy/ssh/tunneling/example)

---

**Need Help?** If you encounter any issues, check the troubleshooting section or refer to AWS and Next.js documentation.

