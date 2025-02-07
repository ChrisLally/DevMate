#!/usr/bin/env node

import { execSync } from 'child_process'

function getCurrentBranch() {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
}

function getLastCommitMessage() {
  return execSync('git log -1 --pretty=%B').toString().trim()
}

function getPullRequestUrl() {
  return execSync('gh pr view --json url -q .url').toString().trim()
}

async function createPullRequest() {
  try {
    const currentBranch = getCurrentBranch()
    if (currentBranch === 'main') {
      console.error('❌ Already on main branch')
      process.exit(1)
    }

    // Get the last commit message to use as PR title
    const lastCommitMessage = getLastCommitMessage()
    const prTitle = lastCommitMessage.split('\n')[0] // Use first line of commit message

    const prOptions = {
      baseBranch: 'main',
      title: prTitle,
      body: `## Changes\n${lastCommitMessage}\n\nCreated via DevMate PR automation`
    }

    // Create PR using GitHub CLI
    console.log('Creating pull request...')
    execSync(
      `gh pr create \
        --base ${prOptions.baseBranch} \
        --head ${currentBranch} \
        --title "${prOptions.title}" \
        --body "${prOptions.body}"`,
      { stdio: 'inherit' }
    )
    
    // Get and display the PR URL
    const prUrl = getPullRequestUrl()
    console.log('\n✅ Pull request created successfully!')
    console.log(`\n🔗 Review and merge at: ${prUrl}`)

  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

// Create PR from current branch to main
createPullRequest()
