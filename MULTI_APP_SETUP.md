# Running Multiple Apps on One EC2 Instance

Yes, you can absolutely use your existing EC2 instance for this Next.js project alongside your other application! Here's how to set it up properly.

## ✅ Is Your Instance Suitable?

### Check Your Current Setup

First, let's verify your instance can handle both apps:

```bash
# Connect to your instance
ssh your-instance

# Check available resources
free -h                    # Check RAM
df -h                      # Check disk space
nproc                      # Check CPU cores
top                        # Check current CPU/memory usage
```

### Minimum Requirements for Both Apps

- **RAM**: At least 4GB total (2GB per app minimum)
- **CPU**: 2+ vCPUs recommended
- **Storage**: 20GB+ free space
- **Ports**: Different ports for each app

---

## 🎯 Setup Strategy

### Option 1: Separate Directories (Recommended)

Organize projects in separate directories:

```
~/projects/
├── existing-app/          # Your current app
│   ├── ...
│   └── runs on port 3000 or 8000, etc.
│
└── workflow-logic-review/  # This Next.js project
    ├── ...
    └── runs on port 3001 (or different port)
```

### Option 2: Use Different Ports

Each app needs its own port:
- **Existing app**: Port 3000 (or whatever it uses)
- **Next.js project**: Port 3001 (or 3002, 4000, etc.)

---

## 📋 Step-by-Step Setup

### Step 1: Check What's Running on Your Instance

```bash
# See what ports are in use
sudo netstat -tulpn | grep LISTEN
# OR
sudo ss -tulpn | grep LISTEN

# See running processes
ps aux | grep node
ps aux | grep python
# etc.

# Check if PM2 is managing processes
pm2 list
```

### Step 2: Choose a Port for Your Next.js App

```bash
# Check if port 3001 is available (or choose another)
sudo lsof -i :3001
# If nothing shows, port is free
```

**Common port choices:**
- 3001 (if existing app uses 3000)
- 3002
- 4000
- 5000
- 8080

### Step 3: Deploy Your Next.js Project

```bash
# Create projects directory if it doesn't exist
mkdir -p ~/projects
cd ~/projects

# Option A: Clone from Git
git clone YOUR_REPO_URL workflow-logic-review
cd workflow-logic-review

# Option B: Transfer files (see deployment guide)
# Then extract to ~/projects/workflow-logic-review

# Install dependencies
pnpm install
```

### Step 4: Configure Next.js to Use Different Port

**Option A: Use Environment Variable (Recommended)**

Create a `.env.local` file:

```bash
cd ~/projects/workflow-logic-review
nano .env.local
```

Add:
```
PORT=3001
```

**Option B: Modify package.json Script**

```bash
# Edit package.json
nano package.json
```

Change the dev script:
```json
{
  "scripts": {
    "dev": "next dev -p 3001",
    "start": "next start -p 3001"
  }
}
```

**Option C: Use Command Line Flag**

```bash
# Run with port flag
pnpm dev -- -p 3001
```

### Step 5: Update Security Group

Make sure your AWS Security Group allows the new port:

1. **AWS Console** → **EC2** → **Security Groups**
2. Select your instance's security group
3. **Inbound Rules** → **Edit Inbound Rules**
4. **Add Rule**:
   - Type: Custom TCP
   - Port: 3001 (or your chosen port)
   - Source: My IP (or 0.0.0.0/0 for public access)
5. **Save Rules**

### Step 6: Test Both Apps

```bash
# Terminal 1: Start existing app (if not already running)
cd ~/existing-app
# Start your existing app (however you normally do it)

# Terminal 2: Start Next.js app
cd ~/projects/workflow-logic-review
pnpm dev -- -p 3001
```

**Access:**
- Existing app: `http://YOUR_IP:3000` (or its port)
- Next.js app: `http://YOUR_IP:3001`

---

## 🔧 Process Management

### Using PM2 (Recommended for Production)

PM2 lets you manage multiple Node.js apps easily:

```bash
# Install PM2 globally (if not already installed)
npm install -g pm2

# Start existing app with PM2
cd ~/existing-app
pm2 start your-app.js --name "existing-app" -- --port 3000

# Start Next.js app with PM2
cd ~/projects/workflow-logic-review
pm2 start npm --name "workflow-app" -- start -- -p 3001

# Or for dev mode
pm2 start npm --name "workflow-app-dev" -- dev -- -p 3001

# View all running apps
pm2 list

# View logs
pm2 logs workflow-app
pm2 logs existing-app

# Stop an app
pm2 stop workflow-app

# Restart an app
pm2 restart workflow-app

# Save PM2 configuration
pm2 save
pm2 startup  # Enable auto-start on reboot
```

### PM2 Ecosystem File (Advanced)

Create `ecosystem.config.js` in your home directory:

```bash
cd ~
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [
    {
      name: 'existing-app',
      script: 'your-app.js',
      cwd: '/home/ubuntu/existing-app',
      args: '--port 3000',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'workflow-app',
      script: 'npm',
      cwd: '/home/ubuntu/projects/workflow-logic-review',
      args: 'start -- -p 3001',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
    }
  ]
};
```

Then run:
```bash
pm2 start ecosystem.config.js
pm2 save
```

---

## 🌐 Using Nginx as Reverse Proxy (Optional)

If you want both apps on different paths or subdomains:

### Install Nginx

```bash
sudo apt update
sudo apt install -y nginx
```

### Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/multi-app
```

```nginx
# Existing app on port 80 (root)
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Next.js app on /workflow path
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    location /workflow {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        rewrite ^/workflow(.*)$ $1 break;
    }
}
```

Or use subdomains:
```nginx
# Existing app
server {
    listen 80;
    server_name app1.yourdomain.com;
    location / {
        proxy_pass http://localhost:3000;
        # ... proxy settings
    }
}

# Next.js app
server {
    listen 80;
    server_name app2.yourdomain.com;
    location / {
        proxy_pass http://localhost:3001;
        # ... proxy settings
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/multi-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## ⚠️ Resource Management

### Monitor Resource Usage

```bash
# Check memory usage
free -h

# Check CPU usage
htop  # Install with: sudo apt install htop

# Check disk space
df -h

# Check what's using resources
pm2 monit  # If using PM2
```

### Set Resource Limits

**With PM2:**
```bash
# Limit memory per app
pm2 start app.js --max-memory-restart 1G

# Limit CPU (if needed)
pm2 start app.js --max-cpu-restart 80
```

### When to Consider Separate Instances

You might need a separate instance if:
- ❌ Total RAM usage > 80% consistently
- ❌ CPU constantly at 100%
- ❌ Apps interfere with each other
- ❌ Need different security/access levels
- ❌ One app needs to scale independently

---

## 🔒 Security Considerations

### Firewall Rules

```bash
# Allow specific ports
sudo ufw allow 3000/tcp
sudo ufw allow 3001/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

### Process Isolation

- Run apps as different users (optional but recommended for production)
- Use separate environment variables
- Don't share sensitive files between apps

---

## 📝 Daily Workflow

### Starting Both Apps

```bash
# If using PM2
pm2 start all

# Or manually
cd ~/existing-app && npm start &
cd ~/projects/workflow-logic-review && pnpm dev -- -p 3001 &
```

### Stopping Apps

```bash
# PM2
pm2 stop workflow-app
pm2 stop existing-app

# Or find and kill processes
ps aux | grep node
kill <PID>
```

### Viewing Logs

```bash
# PM2
pm2 logs

# Or check individual app logs
tail -f ~/projects/workflow-logic-review/.next/trace
```

---

## 🚀 Quick Setup Checklist

- [ ] Check instance resources (RAM, CPU, disk)
- [ ] Identify existing app's port
- [ ] Choose port for Next.js app (e.g., 3001)
- [ ] Deploy Next.js project to `~/projects/workflow-logic-review`
- [ ] Configure Next.js to use chosen port
- [ ] Update AWS Security Group for new port
- [ ] Test both apps running simultaneously
- [ ] Set up PM2 for process management (optional)
- [ ] Configure Nginx reverse proxy (optional)

---

## 💡 Pro Tips

1. **Use PM2** - Makes managing multiple apps much easier
2. **Monitor Resources** - Keep an eye on RAM/CPU usage
3. **Use Different Ports** - Avoid conflicts
4. **Organize Directories** - Keep projects in `~/projects/`
5. **Set Up Logs** - Use PM2 logs or separate log files
6. **Use Environment Variables** - Keep config separate per app
7. **Backup Regularly** - Both apps share the same instance

---

## 🆘 Troubleshooting

### Port Already in Use

```bash
# Find what's using the port
sudo lsof -i :3001
# Kill the process if needed
kill -9 <PID>
```

### Out of Memory

```bash
# Check memory
free -h

# Restart apps to free memory
pm2 restart all

# Or increase swap space
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Apps Interfering

- Check if apps are using same database/ports
- Verify environment variables are separate
- Check file permissions

---

## 📚 Next Steps

1. ✅ Deploy your Next.js project to the existing instance
2. ✅ Configure it to use a different port
3. ✅ Test both apps running together
4. ✅ Set up PM2 for easy management
5. ✅ Monitor resource usage
6. ✅ Consider Nginx if you want custom domains/paths

**You're all set!** Your existing instance can easily handle both applications. Just make sure they use different ports and monitor resource usage.











