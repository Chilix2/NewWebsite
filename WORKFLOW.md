# Development Workflow

## Current Setup

You're working **directly on AWS** - no need to push to AWS because you're already there! 🎉

## Git Workflow

### Auto-Push to GitHub

Your repository is configured to **automatically push to GitHub** after each commit. This ensures:
- ✅ All changes are backed up to GitHub
- ✅ You can access your code from anywhere
- ✅ Easy collaboration and version control

### How It Works

1. **Make changes** to your code
2. **Stage changes**: `git add .`
3. **Commit**: `git commit -m "your message"`
4. **Auto-push**: The post-commit hook automatically pushes to GitHub! 🚀

### Manual Push (if needed)

If auto-push fails for any reason, you can manually push:
```bash
git push origin main
```

### Pull from GitHub (if working from multiple locations)

If you make changes on GitHub or another machine:
```bash
git pull origin main
```

## Important Notes

- **You're already on AWS**: All your work happens directly on the AWS server
- **GitHub is for backup**: Auto-push keeps your code safe on GitHub
- **No deployment needed**: Since you're working directly on AWS, changes are live immediately (after restarting dev server if needed)

## Quick Commands

```bash
# Start development
npm run dev

# Commit and auto-push
git add .
git commit -m "your message"
# (auto-push happens automatically)

# Check status
git status

# View recent commits
git log --oneline -5
```

