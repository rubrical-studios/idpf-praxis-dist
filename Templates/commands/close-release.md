---
version: "v0.22.0"
description: Close release with GitHub Release and cleanup
argument-hint: [--skip-release-page]
---

<!-- EXTENSIBLE: v0.17.0 -->
# /close-release
**Source:** Templates/commands/close-release.md

Closes a release by creating GitHub Release page and cleaning up.
**Note:** This command makes NO commits to main. CHANGELOG was updated by `/prepare-release` and merged via PR.

## Available Extension Points
| Point | Location | Purpose |
|-------|----------|---------|
| `post-notes` | After Step 4 | Customize release notes format |
| `pre-close` | Before Step 5 | Final verification before GitHub Release |
| `post-github-release` | After Step 5 | Update release notes, cross-posting |
| `post-cleanup` | After Step 7 | Notifications |
| `checklist-before-close` | Summary Checklist | Pre-close verification items |
| `checklist-after-close` | Summary Checklist | Post-close verification items |

## Prerequisites
- Active release context
- Tag exists on main
- All issues Done
- On main branch

## Workflow

### Step 1: Verify Release Context
```bash
gh pmu release current
```

### Step 2: Verify Tag Exists
```bash
git tag -l "$VERSION"
```

### Step 3: Verify All Issues Done
```bash
gh pmu release current --json issues
```

### Step 4: Verify Release Assets Uploaded
```bash
gh release view $VERSION --json assets | jq '.assets[].name'
```
Expected assets: darwin-amd64, darwin-arm64, linux-amd64, linux-arm64, windows-amd64.exe, windows-arm64.exe, checksums.txt

<!-- USER-EXTENSION-START: post-notes -->
<!-- Customize release notes format before GitHub Release creation -->
<!-- USER-EXTENSION-END: post-notes -->

<!-- USER-EXTENSION-START: pre-close -->
### Verify All Platform Binaries
```bash
gh release view $VERSION --json assets | jq '.assets | length'
```
**If any assets are missing, report warning before proceeding.**
<!-- USER-EXTENSION-END: pre-close -->

### Step 5: Create GitHub Release Page
```bash
gh release create "$VERSION" \
  --title "Release $VERSION" \
  --generate-notes
```

<!-- USER-EXTENSION-START: post-github-release -->
### Update Release Notes
```bash
node .claude/scripts/framework/update-release-notes.js
```
<!-- USER-EXTENSION-END: post-github-release -->

### Step 6: Close Tracker Issue
```bash
gh pmu release close
```

### Step 7: Delete Release Branch
```bash
git push origin --delete "release/$VERSION"
git branch -d "release/$VERSION"
```

<!-- USER-EXTENSION-START: post-cleanup -->
<!-- USER-EXTENSION-END: post-cleanup -->

### Step 8: Report Completion
```
Release $VERSION closed.
GitHub Release: https://github.com/[owner]/[repo]/releases/tag/$VERSION
```

## Summary Checklist

**Core (Before closing):**
- [ ] Release context verified
- [ ] Tag exists on main
- [ ] All issues Done

<!-- USER-EXTENSION-START: checklist-before-close -->
- [ ] All platform binaries uploaded
<!-- USER-EXTENSION-END: checklist-before-close -->

**Core (After closing):**
- [ ] GitHub Release page created
- [ ] Tracker issue closed
- [ ] Release branch deleted

<!-- USER-EXTENSION-START: checklist-after-close -->
- [ ] Release notes updated
<!-- USER-EXTENSION-END: checklist-after-close -->

---

**End of Close Release**
