# Fast Development Build Setup on Existing EC2

Since this is just for **temporary development** to speed up your website build, here's the quickest way to set it up on your existing instance.

## 🎯 Goal

Use your existing EC2 instance as a **fast development environment** to:
- Build and test the website quickly
- Use the instance's resources for faster builds
- Once finished, deploy to your web hoster

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Connect to Your Instance

```bash
ssh your-instance
```

### Step 2: Check Available Resources

```bash
# Quick check
free -h          # RAM
df -h            # Disk space
nproc            # CPU cores
```

**Minimum needed:**
- 2GB free RAM
- 10GB free disk space
- 1+ CPU core available

### Step 3: Install Node.js & pnpm (if not already installed)

```bash
# Check if Node.js is installed
node --version

# If not installed, install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm
```

### Step 4: Deploy Your Project

**Option A: Using Git (Fastest)**

```bash
cd ~
mkdir -p projects
cd projects

# Clone your repo
git clone YOUR_REPO_URL workflow-logic-review
cd workflow-logic-review

# Install dependencies
pnpm install
```

**Option B: Using SCP from Local Machine**

From your **local Windows machine**:

```powershell
# Navigate to project
cd "C:\Users\Charl\OneDrive - Key Retails\Qortex\workflow-logic-review"

# Create zip (excluding node_modules)
Compress-Archive -Path app,components,hooks,lib,public,styles,*.json,*.mjs,*.ts,*.js,*.md -DestinationPath project.zip -Force

# Transfer to EC2
scp -i YOUR_KEY.pem project.zip ubuntu@YOUR_IP:~/
```

Then on EC2:

```bash
cd ~/projects
unzip ~/project.zip -d workflow-logic-review
cd workflow-logic-review
pnpm install
```

### Step 5: Start Development Server

```bash
cd ~/projects/workflow-logic-review

# Start dev server (use a different port if your other app uses 3000)
pnpm dev -- -p 3001
```

### Step 6: Access from Your Local Machine

**Option A: SSH Port Forwarding (Recommended)**

From your **local machine** (new terminal):

```powershell
ssh -L 3001:localhost:3001 -i YOUR_KEY.pem ubuntu@YOUR_IP
```

Then open: `http://localhost:3001` in your browser

**Option B: Direct Access (if security group allows)**

Open: `http://YOUR_EC2_IP:3001` in your browser

---

## 🚀 Using VS Code Remote SSH (Best for Development)

This lets you develop directly on the EC2 instance as if it's local:

### Setup:

1. **Install VS Code Remote SSH Extension**
   - Open VS Code
   - Install "Remote - SSH" extension

2. **Connect to Instance**
   - Press `F1` → "Remote-SSH: Connect to Host"
   - Enter: `ubuntu@YOUR_IP` (or use SSH config)
   - Enter password/key when prompted

3. **Open Project**
   - Click "Open Folder"
   - Navigate to `/home/ubuntu/projects/workflow-logic-review`
   - Install recommended extensions

4. **Develop Normally**
   - Edit files directly on EC2
   - Use integrated terminal: `pnpm dev`
   - Port forwarding is automatic
   - Access at `http://localhost:3001`

**Benefits:**
- ✅ Fast file editing (no transfer delays)
- ✅ Use EC2's CPU for builds
- ✅ Automatic port forwarding
- ✅ Works like local development

---

## ⚡ Speed Up Builds

### Use EC2 for Faster Builds

If your local machine is slow, build on EC2:

```bash
# On EC2
cd ~/projects/workflow-logic-review

# Build for production (uses EC2's CPU)
pnpm build

# The .next folder will be created on EC2
# You can then transfer just the build output to your local machine
```

### Transfer Build Output to Local

```bash
# On EC2, create build archive
cd ~/projects/workflow-logic-review
tar -czf build-output.tar.gz .next out

# From local machine, download
scp -i YOUR_KEY.pem ubuntu@YOUR_IP:~/projects/workflow-logic-review/build-output.tar.gz ./
```

---

## 🔧 Development Workflow

### Daily Development

1. **Connect via VS Code Remote SSH** (recommended)
   - Open project on EC2
   - Edit files directly
   - Run `pnpm dev` in terminal
   - Access at `http://localhost:3001`

2. **Or use SSH + Port Forwarding**
   ```bash
   # Terminal 1: Port forward
   ssh -L 3001:localhost:3001 YOUR_INSTANCE
   
   # Terminal 2: Connect and work
   ssh YOUR_INSTANCE
   cd ~/projects/workflow-logic-review
   pnpm dev -- -p 3001
   ```

### When You're Done

Once the website is finished:

1. **Build final version:**
   ```bash
   cd ~/projects/workflow-logic-review
   pnpm build
   ```

2. **Transfer to your web hoster:**
   - Upload `.next` folder and other files
   - Or push to Git and deploy from there

3. **Clean up EC2 (optional):**
   ```bash
   # Remove project if no longer needed
   rm -rf ~/projects/workflow-logic-review
   ```

---

## 📋 Quick Reference

### Essential Commands

```bash
# Connect to instance
ssh YOUR_INSTANCE

# Navigate to project
cd ~/projects/workflow-logic-review

# Install dependencies
pnpm install

# Start dev server
pnpm dev -- -p 3001

# Build for production
pnpm build

# Check what's running
ps aux | grep node
```

### Port Forwarding (Local Machine)

```powershell
# Forward port 3001
ssh -L 3001:localhost:3001 -i YOUR_KEY.pem ubuntu@YOUR_IP

# Then access: http://localhost:3001
```

### VS Code Remote SSH

1. Install "Remote - SSH" extension
2. Connect to `ubuntu@YOUR_IP`
3. Open `/home/ubuntu/projects/workflow-logic-review`
4. Develop normally!

---

## ⚠️ Important Notes

### Port Conflicts

- If your existing app uses port 3000, use 3001 for Next.js
- Check ports: `sudo netstat -tulpn | grep LISTEN`
- Update security group if needed

### Resource Sharing

- Both apps share CPU/RAM
- If builds are slow, your existing app might be using resources
- Consider stopping the other app temporarily during heavy builds

### Temporary Setup

- This is just for development speed
- No need for production optimizations
- Can delete project folder when done
- No need for PM2 or process management

---

## 🎯 Recommended Setup

**For fastest development:**

1. ✅ **Use VS Code Remote SSH**
   - Edit files directly on EC2
   - No file transfer delays
   - Automatic port forwarding

2. ✅ **Use Different Port**
   - Next.js on 3001 (if other app uses 3000)
   - No conflicts

3. ✅ **Build on EC2**
   - Use EC2's CPU for faster builds
   - Transfer build output when needed

4. ✅ **Keep It Simple**
   - No need for PM2 (just `pnpm dev`)
   - No need for Nginx
   - Just temporary development

---

## 🚀 Quick Start Checklist

- [ ] Connect to existing EC2 instance
- [ ] Install Node.js & pnpm (if needed)
- [ ] Deploy project to `~/projects/workflow-logic-review`
- [ ] Install dependencies: `pnpm install`
- [ ] Start dev server: `pnpm dev -- -p 3001`
- [ ] Set up VS Code Remote SSH (optional but recommended)
- [ ] Access at `http://localhost:3001` (with port forwarding)
- [ ] Develop and build!
- [ ] When done, transfer to web hoster

---

## 💡 Pro Tips

1. **VS Code Remote SSH is your friend** - Makes development seamless
2. **Use different ports** - Avoid conflicts with existing app
3. **Build on EC2** - Faster than local if EC2 has better CPU
4. **Keep it simple** - No need for production setup
5. **Clean up when done** - Remove project folder if not needed

---

That's it! You're ready to develop fast on your existing EC2 instance. Once the website is finished, just build it and deploy to your web hoster. 🎉











