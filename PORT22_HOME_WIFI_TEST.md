# Port 22 (SSH) Test for Home WiFi Connection

## ✅ Current Server Status

**EC2 Public IP:** `54.209.65.100`

### Local Configuration (All Good ✅)
- ✅ SSH service is **RUNNING**
- ✅ Port 22 is **LISTENING** on all interfaces (0.0.0.0:22)
- ✅ UFW firewall is **INACTIVE** (no local blocking)
- ✅ Recent SSH connections are working (last from: 91.46.34.146)

## ⚠️ What You Need to Check: AWS Security Group

The **ONLY** thing that could block SSH from your home wifi is the **AWS Security Group** configuration.

### How to Check Your Security Group

1. **Go to AWS Console:**
   - Navigate to: EC2 Dashboard → Instances
   - Select your instance (with IP: 54.209.65.100)
   - Click on the **Security** tab

2. **Check Inbound Rules:**
   - Look for port **22 (SSH)**
   - Check the **Source** column:
     - ✅ **Good:** `0.0.0.0/0` (allows from anywhere)
     - ✅ **Good:** `My IP` (your current IP)
     - ❌ **Problem:** Specific IP that's NOT your home wifi IP

### If Security Group Blocks Home WiFi

**Option 1: Update Security Group (Recommended)**
1. Click on your security group name
2. Click **Edit inbound rules**
3. Find the SSH (port 22) rule
4. Change **Source** to one of:
   - `My IP` (if you're on home wifi when editing)
   - `0.0.0.0/0` (less secure, but works from anywhere)
   - Add both your current IP and home wifi IP as separate rules

**Option 2: Add Home WiFi IP Rule**
1. Find your home wifi public IP (see below)
2. Add a new inbound rule:
   - Type: SSH
   - Port: 22
   - Source: Your home wifi IP/32 (e.g., `123.45.67.89/32`)

### Finding Your Home WiFi Public IP

**From your computer connected to home wifi:**
```bash
# Linux/Mac
curl ifconfig.me
# or
curl ipinfo.io/ip

# Windows PowerShell
(Invoke-WebRequest -Uri https://ifconfig.me).Content
```

Or visit: https://whatismyipaddress.com

## 🧪 Testing from Home WiFi

### Step 1: Test Port Connectivity
```bash
# Check if port 22 is reachable
nc -zv 54.209.65.100 22

# Or use telnet
telnet 54.209.65.100 22

# Expected output if working:
# Connection to 54.209.65.100 port 22 [tcp/ssh] succeeded!
```

### Step 2: Test SSH Connection
```bash
# Try SSH connection with verbose output
ssh -v -i /path/to/your-key.pem ubuntu@54.209.65.100

# If using SSH config:
ssh -v workflow-dev  # (or your config name)
```

### Step 3: Common Issues

**Issue: "Connection timed out"**
- ✅ Security group is blocking your IP
- Solution: Update security group to allow your home wifi IP

**Issue: "Connection refused"**
- ✅ Port 22 not listening (but we confirmed it is)
- ✅ Security group issue
- Solution: Check security group settings

**Issue: "Permission denied (publickey)"**
- ✅ SSH is reachable!
- ✅ Authentication issue with your key
- Solution: Verify you're using the correct key file

**Issue: "Host key verification failed"**
- ✅ SSH is reachable!
- ✅ Just need to accept the host key
- Solution: Remove old host key or accept new one

## 📋 Quick Checklist

Before connecting from home wifi:
- [ ] Find your home wifi public IP
- [ ] Check AWS security group allows SSH from that IP (or 0.0.0.0/0)
- [ ] Update security group if needed
- [ ] Test with `nc -zv 54.209.65.100 22`
- [ ] Try SSH connection: `ssh -i key.pem ubuntu@54.209.65.100`

## 🚀 Best Practices

1. **Use Elastic IP:** Prevents IP changes when instance stops/starts
2. **Limit SSH Access:** Use "My IP" instead of "0.0.0.0/0" for better security
3. **Multiple IP Rules:** Add both work and home IPs as separate rules
4. **VPN Alternative:** Use VPN to keep same IP across locations

## 🔧 Useful Commands

**On EC2 (checking status):**
```bash
# Run the test script
bash ~/projects/qortex/test-port22-home-wifi.sh

# Check SSH status
sudo systemctl status ssh

# Check listening ports
sudo ss -tulpn | grep :22

# Check firewall
sudo ufw status
```

**From home computer (testing):**
```bash
# Check your public IP
curl ifconfig.me

# Test port
nc -zv 54.209.65.100 22

# SSH with verbose output
ssh -v -i ~/.ssh/your-key.pem ubuntu@54.209.65.100
```

